import { Field, FieldProps, useField } from "formik";
import React from "react";
import styled from "styled-components";

const FormInput = styled(Field)`
    background-color: #f9f9f9;
    border: 0;
    border-radius: 0 3px 3px 0;
    border-bottom: 1px solid #ff9e0d;
    transition: ease-in-out, background-color 0.1s;
    font-size: 18px;
    padding: 3px 0px 3px 8px;
    z-index: 1;

    &:focus {
        background-color: #e5e5e5d3;
    }
`;

const FormFieldErrorMsg = styled.span<{ error: Boolean }>`
    color: red;
    font-size: 12px;
    text-align: left;
    margin-bottom: 5px;
    visibility: ${(props) => (props.error ? "visible" : "hidden")}; //err === true => visible
`;

type InputProps = JSX.IntrinsicElements["input"];

interface IFormFieldProps extends InputProps {
    label: string;
    name: string;
    fullWidth?: boolean;
}

const FormFieldNoIcon: React.FC<IFormFieldProps> = ({ label, ...props }) => {
    const [, meta] = useField(props);
    const isError = meta.error !== "" && meta.touched;
    return (
        <>
            {/* <FormFieldLabel htmlFor={props.id}>{label}</FormFieldLabel> */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginBottom: "20px",
                    width: props.fullWidth ? "100%" : "",
                }}
            >
                <FormFieldErrorMsg error={isError}>{meta.error || "\u00A0"}</FormFieldErrorMsg>
                <FormInput {...props} style={{ width: props.fullWidth ? "100%" : "" }} />
            </div>
        </>
    );
};

export default FormFieldNoIcon;
