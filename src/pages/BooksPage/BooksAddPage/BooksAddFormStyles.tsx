import styled from "styled-components";
import { Form } from "formik";
import { Input, Autocomplete, Select, Textarea } from "react-formik-ui";

export const AddBookPageContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

export const AddBookCard = styled.div`
    width: 600px;
    background-color: #fff;
    border-radius: 3px;
    padding: 25px;

    box-shadow: 10px 10px #ff9e0d;
    filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.25));

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const AddBookCardHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 8rem;
        height: auto;
    }

    span {
        font-size: 24px;
        font-weight: 200;
    }
`;

export const AddBookCardFormContainer = styled.div`
    height: 95%;
    width: 90%;
    padding-top: 5%;
`;

export const AddBookCardForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80%;

    div:first-child {
        align-items: center;
    }
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

export const FormGroupRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
`;

export const FormRemindPassword = styled.span`
    font-weight: 200;
    font-size: 11px;
    color: #0057ff;
    width: fit-content;
    transform: translate(190%);
    cursor: pointer;
`;

export const FormInput = styled(Input)`
    background-color: #f9f9f9;
    border: 0;
    border-radius: 0 3px 3px 0;
    border-bottom: 1px solid #ff9e0d;
    transition: ease-in-out, background-color 0.1s;
    font-size: 18px;
    padding: 3px 0px 3px 0px;
    z-index: 1;

    &:focus {
        background-color: #e5e5e5d3;
    }
`;

export const FormInputAutocomplete = styled(Autocomplete)`
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

    input {
        padding-left: 8px;
    }
`;

export const FormInputSelect = styled(Select)`
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

export const FormTextareaInput = styled(Textarea)`
    background-color: #f9f9f9;
    border: 0;
    border-radius: 0 3px 3px 0;
    border-bottom: 1px solid #ff9e0d;
    transition: ease-in-out, background-color 0.1s;
    font-size: 18px;
    padding: 3px 0px 3px;
    width: 100%;
    min-height: 80px;
    resize: none;

    &:focus {
        background-color: #e5e5e5d3;
        outline: none;
    }
`;
