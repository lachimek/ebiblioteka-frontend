import styled from "styled-components";

export const Card = styled.div`
    background-color: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 25%;
    padding-top: 2em;
    padding-bottom: 2em;

    span {
        font-weight: 300;
        font-size: 22px;
    }
`;

export const CardHeader = styled.div`
    font-size: 36px;
    font-weight: 700;
    padding-bottom: 0.5em;
`;

export const InfoCardsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 3em;
`;
