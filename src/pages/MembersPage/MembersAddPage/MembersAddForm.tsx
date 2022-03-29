import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import IMembersFormData from "interfaces/IMembersFormData";
import { Formik, useFormikContext } from "formik";
import { Form, Input, Select } from "react-formik-ui";
import styled from "styled-components";
import { FormButton } from "components/FormButton/FormButton";
import LoaderSpin from "components/LoaderSpin/LoaderSpin";
import { addMemberSelector, fetchGroups, fetchMemberById, registerMember, resetState } from "./MembersAddSlice";

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const FormGroupRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

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

const FormInputSelect = styled(Select)`
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

function MembersAddForm({ edit }: { edit?: Boolean }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { groups, member, memberId, error, loading } = useSelector(addMemberSelector);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        dispatch(fetchGroups());
        if (id) {
            dispatch(fetchMemberById(id));
        }

        return () => {
            dispatch(resetState());
        };
    }, []);

    useEffect(() => {
        setSubmitting(loading);
        if (memberId !== null && memberId !== "") {
            //dispatch(setBookId(""));
            if (edit) {
                toast.success("Uczeń edytowany pomyślnie.");
                navigate("/members/list");
            } else {
                toast.success("Uczeń dodany pomyślnie.");
            }
        }
    }, [loading]);

    const initialValues: IMembersFormData = {
        idField: "",
        email: "",
        firstName: "",
        lastName: "",
        groupId: "init",
        phone: "",
        city: "",
        postalCode: "",
        streetAddress: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("E-mail jest wymagany.").email("Niepoprawny E-mail."),
        firstName: Yup.string().required("Imię jest wymagane."),
        lastName: Yup.string().required("Nazwisko jest wymagane."),
        groupId: Yup.string().required("Proszę wybrać klasę.").notOneOf(["init"], "Proszę wybrać klasę."),
        phone: Yup.string().required("Telefon jest wymagany."),
        city: Yup.string().required("Miasto jest wymagane."),
        postalCode: Yup.string()
            .required("Kod pocztowy jest wymagany.")
            .matches(/\d{2}-\d{3}/, "Niepoprawny kod pocztowy")
            .max(6, "Niepoprawny kod pocztowy"),
        streetAddress: Yup.string().required("Adres jest wymagany."),
    });

    const FillFieldsForEdit = () => {
        const formikContext = useFormikContext();
        useEffect(() => {
            if (error === "Member not found") {
                toast.error("Nie znaleziono ucznia w bazie danych");
                formikContext.resetForm();
            }
            if (member != null) {
                formikContext.setFieldValue("email", member.email);
                formikContext.setFieldValue("firstName", member.firstName);
                formikContext.setFieldValue("lastName", member.lastName);
                formikContext.setFieldValue("groupId", member.groupId);
                formikContext.setFieldValue("phone", member.phone);
                formikContext.setFieldValue("city", member.city);
                formikContext.setFieldValue("postalCode", member.postalCode);
                formikContext.setFieldValue("streetAddress", member.streetAddress);
            }
        }, [error, member]);

        useEffect(() => {
            formikContext.setFieldValue("idField", id);
        }, []);
        return null;
    };

    const submitButtonText = edit ? "Edytuj ucznia" : "Dodaj ucznia";

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(props: IMembersFormData) => {
                dispatch(registerMember(props));
                console.log("formdata", props);
                // setSubmitting(true);
                // console.log({ ...props });
                // setTimeout(() => {
                //     setSubmitting(false);
                //     toast.success("Uczeń dodany pomyślnie.");
                // }, 1000);
            }}
        >
            {({ values }) => (
                <Form styling="structure">
                    <FormGroup>
                        <FormInput type="hidden" name="idField" />
                        <FillFieldsForEdit />
                        <FormGroupRow>
                            <FormInput type="text" name="firstName" placeholder="Imię"></FormInput>
                            <FormInput type="text" name="lastName" placeholder="Nazwisko"></FormInput>
                        </FormGroupRow>
                        <FormInput
                            type="email"
                            name="email"
                            placeholder="Adres E-mail"
                            style={{ width: "100%" }}
                        ></FormInput>
                        <FormGroupRow>
                            <FormInputSelect
                                name="groupId"
                                label="Wybór klasy:"
                                options={groups}
                                style={{ marginLeft: "1em" }}
                            />
                            <FormInput type="text" name="phone" placeholder="Telefon kontaktowy"></FormInput>
                        </FormGroupRow>
                        <FormGroupRow>
                            <FormInput type="text" name="city" placeholder="Miasto"></FormInput>
                            <FormInput
                                type="text"
                                name="postalCode"
                                placeholder="Kod pocztowy"
                                maxLength="6"
                            ></FormInput>
                        </FormGroupRow>
                        <FormInput
                            type="text"
                            name="streetAddress"
                            placeholder="Ulica i numer domu"
                            style={{ width: "100%" }}
                        ></FormInput>
                    </FormGroup>
                    <FormGroup>
                        <FormGroupRow>
                            <FormButton type="button" onClick={() => navigate("/members")}>
                                Powrót
                            </FormButton>
                            <FormButton type="submit" disabled={submitting}>
                                {submitting ? <LoaderSpin height={11} width={11} /> : submitButtonText}
                            </FormButton>
                        </FormGroupRow>
                    </FormGroup>
                </Form>
            )}
        </Formik>
    );
}

export default MembersAddForm;
