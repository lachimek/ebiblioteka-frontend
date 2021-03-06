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
import { addIssue, addIssueSelector, resetState } from "./IssuesAddSlice";

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

//member: 8bf54eb7-a0c5-46bd-8505-2be32a5f088b
//book: 17fa0347-cf0e-41ed-8164-6eda98908de5

function MembersAddForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const { members, loading: membersLoading } = useSelector(listMemberSelector);
    const { books, loading: booksLoading } = useSelector(listBookSelector);
    const { error, loading: issueLoading, issueId } = useSelector(addIssueSelector);

    const [scannedIds, setScannedIds] = useState<{ memberId: string; bookId: string }>({ memberId: "", bookId: "" });

    const [membersForSelect, setMembersForSelect] = useState<{ value: string; label: string }[]>([
        { value: "", label: "" },
    ]);
    const [booksForSelect, setBooksForSelect] = useState<{ value: string; label: string }[]>([
        { value: "", label: "" },
    ]);

    useEffect(() => {
        dispatch(fetchAllMembers());
        dispatch(fetchAllBooks());

        return () => {
            setMembersForSelect([]);
            setBooksForSelect([]);
            dispatch(resetState());
        };
    }, []);

    useEffect(() => {
        convertMembersToSelect();
    }, [membersLoading]);

    useEffect(() => {
        convertBooksToSelect();
    }, [booksLoading]);

    const filterMembersById = () => {
        const id = prompt("Prosze poda?? id ucznia (emulator skanera)");
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
        const id = prompt("Prosze poda?? id ksi????ki (emulator skanera)");
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
        setScannedIds({ memberId: "", bookId: "" });
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
        setScannedIds({ memberId: "", bookId: "" });
        books.forEach((book) => {
            if (book.available) {
                setBooksForSelect((prev) => {
                    return [
                        ...prev!,
                        { value: book.id!, label: `${book.isbn} ${book.title} ${(book.author as IAuthor).name}` },
                    ];
                });
            }
        });
    };

    const FillFieldsFromScan = () => {
        const formikContext = useFormikContext();
        useEffect(() => {
            if (scannedIds !== { memberId: "", bookId: "" }) {
                formikContext.setFieldValue("memberId", scannedIds.memberId);
                formikContext.setFieldValue("bookId", scannedIds.bookId);
            }
        }, []);

        return null;
    };

    useEffect(() => {
        setSubmitting(issueLoading);
        if (error) {
            toast.error("B????d dodawania wypo??yczenia.");
        } else if (issueId && issueId !== "") {
            navigate("/issues/list");
            toast.success("Wypo??yczenie dodane pomy??lnie.");
        }
    }, [issueLoading]);

    const initialValues: IIssuesFormData = {
        memberId: "init",
        bookId: "init",
        issueStart: new Date().toISOString().split("T")[0],
        issueEnd: "",
    };

    const validationSchema = Yup.object().shape({
        memberId: Yup.string()
            .required("Wyb??r ucznia jest wymagany.")
            .notOneOf(["init"], "Wyb??r ucznia jest wymagany."),
        bookId: Yup.string()
            .required("Wyb??r ksi????ki jest wymagany.")
            .notOneOf(["init"], "Wyb??r ksi????ki jest wymagany."),
        issueStart: Yup.date().required("Data wypo??yczenia jest wymagana."),
        issueEnd: Yup.date().required("Data zwrotu jest wymagana."),
    });

    if (!membersForSelect) return <LoaderSpin height={24} width={24} />;

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(props: IIssuesFormData) => {
                dispatch(addIssue(props)); //858c6d58-e479-474d-87cd-0e97fa2b28d8
            }}
        >
            {(props) => (
                <Form styling="structure">
                    <FillFieldsFromScan />
                    <FormGroup>
                        <FormGroupRow>
                            <div style={{ width: "80%" }}>
                                <label>Wyb??r ucznia:</label>
                                <FormInputSelect
                                    as="select"
                                    name="memberId"
                                    style={{ width: "70%", marginLeft: "1em" }}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                        props.setFieldValue("memberId", e.currentTarget.value)
                                    }
                                >
                                    {!scannedIds.memberId && <option value="init">-- Wybierz ucznia --</option>}
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
                                    Skanuj kart?? ucznia
                                </FormButton>
                                <FormButton
                                    type="button"
                                    style={{ marginLeft: "1em", marginBottom: 0 }}
                                    onClick={convertMembersToSelect}
                                >
                                    Wyczy????
                                </FormButton>
                            </div>
                        </FormGroupRow>
                        {props.touched.memberId && (
                            <span style={{ fontSize: "10px", color: "red" }}>{props.errors.memberId}</span>
                        )}
                        <FormGroupRow style={{ marginTop: "1em" }}>
                            <div style={{ width: "80%" }}>
                                <label>Wyb??r ksi????ki:</label>
                                <FormInputSelect
                                    as="select"
                                    name="bookId"
                                    style={{ width: "70%", marginLeft: "1em" }}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                        props.setFieldValue("bookId", e.currentTarget.value)
                                    }
                                >
                                    {!scannedIds.bookId && <option value="init">-- Wybierz ksi????k?? --</option>}
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
                                    Skanuj kod ksi??zki
                                </FormButton>
                                <FormButton
                                    type="button"
                                    style={{ marginLeft: "1em", marginBottom: 0 }}
                                    onClick={convertBooksToSelect}
                                >
                                    Wyczy????
                                </FormButton>
                            </div>
                        </FormGroupRow>
                        {props.touched.memberId && (
                            <span style={{ fontSize: "10px", color: "red" }}>{props.errors.bookId}</span>
                        )}
                        <FormGroupRow style={{ marginTop: "2em", marginBottom: "2em" }}>
                            <FormInput type="date" name="issueStart" hint="Data wypo??yczenia"></FormInput>
                            <FormInput type="date" name="issueEnd" hint="Data zwrotu"></FormInput>
                        </FormGroupRow>
                    </FormGroup>
                    <FormGroup>
                        <FormGroupRow>
                            <FormButton type="button" onClick={() => navigate("/members")}>
                                Powr??t
                            </FormButton>
                            <FormButton type="submit" disabled={submitting}>
                                {submitting ? <LoaderSpin height={11} width={11} /> : "Dodaj wypo??yczenie"}
                            </FormButton>
                        </FormGroupRow>
                    </FormGroup>
                </Form>
            )}
        </Formik>
    );
}

export default MembersAddForm;
