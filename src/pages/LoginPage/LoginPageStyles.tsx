import styled from "styled-components";
import { Form } from "formik";

export const LoginPageContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

export const LoginCard = styled.div`
    width: 410px;
    height: 460px;
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

export const LoginCardHeader = styled.div`
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

export const LoginCardFormContainer = styled.div`
    height: 100%;
    width: 60%;
`;

export const LoginCardForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80%;
    padding-top: 20%;

    div:first-child {
        align-items: center;
    }
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

export const FormRemindPassword = styled.span`
    font-weight: 200;
    font-size: 11px;
    color: #0057ff;
    width: fit-content;
    transform: translate(190%);
    cursor: pointer;
`;

export const FormButton = styled.button`
    display: flex;
    justify-content: center;
    background-color: #ff9e0d;
    border: 0;
    border-radius: 3px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    font-weight: 600;

    margin-top: 10px;
    margin-bottom: 10px;

    padding: 10px;

    transition: ease-in-out, background-color 0.1s;

    &:hover {
        background-color: #ff9e0dcf;
    }

    &:active {
        box-shadow: inset 0px 0px 8px 1px rgba(66, 68, 90, 0.3),
            0px 4px 6px rgba(0, 0, 0, 0.25);
    }
`;
