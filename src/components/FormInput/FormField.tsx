import { Field, useField } from "formik";
import React from "react";
import styled from "styled-components";

const FormInput = styled(Field)`
    background-color: #f9f9f9;
    border: 0;
    border-radius: 0 3px 3px 0;
    transition: ease-in-out, background-color 0.1s;
    font-size: 18px;
    padding: 10px;
    box-shadow: 0px 2px 6px rgb(0 0 0 / 25%);
    z-index: 1;

    &:focus {
        background-color: #e5e5e5d3;
    }
`;

const FormFieldErrorMsg = styled.span<{ error: Boolean }>`
    color: red;
    font-size: 12px;
    text-align: right;
    margin-top: -15px;
    margin-bottom: 20px;
    visibility: ${(props) => (props.error ? "visible" : "hidden")}; //err === true => visible
`;

const IconConatiner = styled.div`
    display: flex;
    background: #ff9e0d;
    height: 100%;
    border-radius: 3px 0 0 3px;
    padding-left: 5px;
    padding-right: 5px;
    z-index: 2;
    box-shadow: -2px 2px 6px rgb(0 0 0 / 25%);
`;

type InputProps = JSX.IntrinsicElements["input"];

interface IFormFieldProps extends InputProps {
    label: string;
    name: string;
    icon: string;
}

const FormField: React.FC<IFormFieldProps> = ({ label, ...props }) => {
    const [, meta] = useField(props);
    const isError = meta.error !== "" && meta.touched;
    return (
        <>
            {/* <FormFieldLabel htmlFor={props.id}>{label}</FormFieldLabel> */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <IconConatiner>
                    <img src={props.icon} alt={props.name} height="24px" />
                </IconConatiner>
                <FormInput {...props} />
            </div>
            <FormFieldErrorMsg error={isError}>{meta.error || "\u00A0"}</FormFieldErrorMsg>
        </>
    );
};

export default FormField;
