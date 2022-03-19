import styled from "styled-components";

export const FormButton = styled.button`
    display: flex;
    justify-content: center;
    background-color: #ff9e0d;
    border: 0;
    border-radius: 3px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    font-weight: 600;

    min-width: 100px;
    margin-bottom: 10px;

    padding: 8px;

    transition: ease-in-out, background-color 0.1s;

    &:hover {
        background-color: #ff9e0dcf;
    }

    &:active {
        box-shadow: inset 0px 0px 8px 1px rgba(66, 68, 90, 0.3), 0px 4px 6px rgba(0, 0, 0, 0.25);
    }
`;
