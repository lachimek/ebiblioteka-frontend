import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Field, Formik, useFormikContext } from "formik";
import { Form, Input } from "react-formik-ui";
import styled from "styled-components";
import { FormButton } from "components/FormButton/FormButton";
import LoaderSpin from "components/LoaderSpin/LoaderSpin";
import IIssuesFormData from "interfaces/IIssuesFormData";
import { fetchAllMembers, listMemberSelector } from "pages/MembersPage/MembersListPage/MemberListSlice";
import { fetchAllBooks, listBookSelector } from "pages/BooksPage/BooksListPage/BooksListSlice";
import { IAuthor } from "interfaces/IBook";

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const FormGroupRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .select-wrapper {
        display: flex;
        align-items: center;
        .label {
            font-weight: 300;
        }
    }

    .rfui-error {
        margin-top: -5px;
    }
`;

const FormInput = styled(Input)`
    background-color: #f9f9f9;
    border: 0;
    border-radius: 0 3px 3px 0;
    border-bottom: 1px solid #ff9e0d;
    transition: ease-in-out, background-color 0.1s;
    font-size: 18px;
    padding: 3px 0px 3px 0px;
    z-index: 1;

    margin-bottom: 0.5em;

    &:focus {
        background-color: #e5e5e5d3;
    }
`;

const FormInputSelect = styled(Field)`
    background-color: #f9f9f9;
    border: 0;
    border-radius: 0 3px 3px 0;
    border-bottom: 1px solid #ff9e0d;
    transition: ease-in-out, background-color 0.1s;
    font-size: 18px;
    padding: 3px 0px 3px;

    &:focus {
        background-color: #e5e5e5d3;
    }
`;

function MembersAddForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const { members, loading: membersLoading } = useSelector(listMemberSelector);
    const { books, loading: booksLoading } = useSelector(listBookSelector);

    const [scannedIds, setScannedIds] = useState<{ memberId: string; bookId: string }>({ memberId: "", bookId: "" });

    const [membersForSelect, setMembersForSelect] = useState<{ value: string; label: string }[]>([]);
    const [booksForSelect, setBooksForSelect] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        dispatch(fetchAllMembers());
        dispatch(fetchAllBooks());

        return () => {
            setMembersForSelect([]);
            setBooksForSelect([]);
        };
    }, []);

    useEffect(() => {
        convertMembersToSelect();
    }, [membersLoading]);

    useEffect(() => {
        convertBooksToSelect();
    }, [booksLoading]);

    const filterMembersById = () => {
        const id = prompt("Prosze podać id ucznia (emulator skanera)");
        if (id) {
            setMembersForSelect(membersForSelect.filter((member) => member.value === id));
            setScannedIds((prev) => {
                return {
                    ...prev,
                    memberId: id,
                };
            });
        }
    };

    const filterBooksById = () => {
        const id = prompt("Prosze podać id książki (emulator skanera)");
        if (id) {
            setBooksForSelect(booksForSelect.filter((book) => book.value === id));
            setScannedIds((prev) => {
                return {
                    ...prev,
                    bookId: id,
                };
            });
        }
    };

    const convertMembersToSelect = () => {
        setMembersForSelect([]);
        members.forEach((member) => {
            setMembersForSelect((prev) => {
                return [
                    ...prev,
                    { value: member.id, label: `${member.firstName} ${member.lastName} ${member.groupName}` },
                ];
            });
        });
    };

    const convertBooksToSelect = () => {
        setBooksForSelect([]);
        books.forEach((book) => {
            setBooksForSelect((prev) => {
                return [
                    ...prev!,
                    { value: book.id!, label: `${book.isbn} ${book.title} ${(book.author as IAuthor).name}` },
                ];
            });
        });
    };

    const FillFieldsFromScan = () => {
        const formikContext = useFormikContext();
        useEffect(() => {
            if (scannedIds != null) {
                formikContext.setFieldValue("memberId", scannedIds.memberId);
                formikContext.setFieldValue("bookId", scannedIds.bookId);
            }
        }, []);

        return null;
    };

    // useEffect(() => {
    //     dispatch(fetchGroups());

    //     return () => {
    //         dispatch(resetState());
    //     };
    // }, []);

    // useEffect(() => {
    //     setSubmitting(loading);
    //     if (memberId !== null && memberId !== "") {
    //         //dispatch(setBookId(""));
    //         if (edit) {
    //             toast.success("Uczeń edytowany pomyślnie.");
    //             navigate("/members/list");
    //         } else {
    //             toast.success("Uczeń dodany pomyślnie.");
    //         }
    //     }
    // }, [loading]);

    const initialValues: IIssuesFormData = {
        memberId: "",
        bookId: "",
        issueStart: new Date().toISOString().split("T")[0],
        issueEnd: "",
    };

    const validationSchema = Yup.object().shape({
        memberId: Yup.string().required("Wybór ucznia jest wymagany.").notOneOf([""], "Wybór ucznia jest wymagany22."),
        bookId: Yup.string().required("Wybór książki jest wymagany.").notOneOf([""], "Wybór książki jest wymagany22."),
        issueStart: Yup.date().required("Data wypożyczenia jest wymagana."),
        issueEnd: Yup.date().required("Data zwrotu jest wymagana."),
    });

    if (!membersForSelect) return <LoaderSpin height={24} width={24} />;

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(props: IIssuesFormData) => {
                //dispatch(registerMember(props));
                console.log("formdata", props);
            }}
        >
            {(props) => (
                <Form styling="structure">
                    <FillFieldsFromScan />
                    <FormGroup>
                        <FormGroupRow>
                            <div style={{ width: "80%" }}>
                                <label>Wybór ucznia:</label>
                                <FormInputSelect
                                    as="select"
                                    name="memberId"
                                    style={{ width: "70%", marginLeft: "1em" }}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                        props.setFieldValue("memberId", e.currentTarget.value)
                                    }
                                >
                                    {membersForSelect.map((member) => {
                                        return (
                                            <option key={member.value} value={member.value}>
                                                {member.label}
                                            </option>
                                        );
                                    })}
                                </FormInputSelect>
                            </div>
                            <div style={{ display: "flex", width: "40%", justifyContent: "flex-end" }}>
                                <FormButton
                                    type="button"
                                    style={{ marginLeft: "1em", marginBottom: 0 }}
                                    onClick={filterMembersById}
                                >
                                    Skanuj kartę ucznia
                                </FormButton>
                                <FormButton
                                    type="button"
                                    style={{ marginLeft: "1em", marginBottom: 0 }}
                                    onClick={convertMembersToSelect}
                                >
                                    Wyczyść
                                </FormButton>
                            </div>
                        </FormGroupRow>
                        <FormGroupRow style={{ marginTop: "1em" }}>
                            <div style={{ width: "80%" }}>
                                <label>Wybór książki:</label>
                                <FormInputSelect
                                    as="select"
                                    name="bookId"
                                    style={{ width: "70%", marginLeft: "1em" }}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                        props.setFieldValue("bookId", e.currentTarget.value)
                                    }
                                >
                                    {booksForSelect.map((book) => {
                                        return (
                                            <option key={book.value} value={book.value}>
                                                {book.label}
                                            </option>
                                        );
                                    })}
                                </FormInputSelect>
                            </div>
                            <div style={{ display: "flex", width: "40%", justifyContent: "flex-end" }}>
                                <FormButton
                                    type="button"
                                    style={{ marginLeft: "1em", marginBottom: 0 }}
                                    onClick={filterBooksById}
                                >
                                    Skanuj kod ksiązki
                                </FormButton>
                                <FormButton
                                    type="button"
                                    style={{ marginLeft: "1em", marginBottom: 0 }}
                                    onClick={convertBooksToSelect}
                                >
                                    Wyczyść
                                </FormButton>
                            </div>
                        </FormGroupRow>
                        <FormGroupRow style={{ marginTop: "2em", marginBottom: "2em" }}>
                            <FormInput type="date" name="issueStart" hint="Data wypożyczenia"></FormInput>
                            <FormInput type="date" name="issueEnd" hint="Data zwrotu"></FormInput>
                        </FormGroupRow>
                    </FormGroup>
                    <FormGroup>
                        <FormGroupRow>
                            <FormButton type="button" onClick={() => navigate("/members")}>
                                Powrót
                            </FormButton>
                            <FormButton type="submit" disabled={submitting}>
                                {submitting ? <LoaderSpin height={11} width={11} /> : "Dodaj wypożyczenie"}
                            </FormButton>
                        </FormGroupRow>
                    </FormGroup>
                </Form>
            )}
        </Formik>
    );
}

export default MembersAddForm;