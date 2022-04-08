import React from "react";
import styled from "styled-components";
import IssuesAddForm from "./IssuesAddForm";

export const AddBookPageContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

export const AddIssueCard = styled.div`
    width: 900px;
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

function MembersAddPage() {
    return (
        <AddIssueCard>
            <AddBookCardHeader>
                <span>Nowe wypożyczenie</span>
            </AddBookCardHeader>
            <AddBookCardFormContainer>
                <IssuesAddForm />
            </AddBookCardFormContainer>
        </AddIssueCard>
    );
}

export default MembersAddPage;
