import React from "react";
import BooksAddForm from "./BooksAddForm";
import { AddBookCard, AddBookCardHeader, AddBookCardFormContainer } from "./BooksAddFormStyles";

function BooksAddPage({ edit }: { edit?: Boolean }) {
    return (
        <AddBookCard>
            <AddBookCardHeader>
                {edit ? <span>Edycja istniejącej pozycji</span> : <span>Dodawanie nowej pozycji</span>}
            </AddBookCardHeader>
            <AddBookCardFormContainer>
                <BooksAddForm edit={edit} />
            </AddBookCardFormContainer>
        </AddBookCard>
    );
}

export default BooksAddPage;
