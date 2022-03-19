import styled from "styled-components";

export const BooksPageContainer = styled.div`
    width: 80%;
`;

export const GraphContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-top: 3em;
    padding: 1em;
`;

export const Button = styled.div`
    background-color: #ff9e0d;
    border-radius: 5px;
    padding: 1.5em 3em;
    cursor: pointer;

    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);

    &:hover {
        background-color: #ff9e0dcf;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;
