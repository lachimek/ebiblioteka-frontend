import { Card, CardHeader, InfoCardsContainer } from "components/Card/Card";
import { ButtonContainer, Button, GraphContainer } from "pages/BooksPage/BooksPageStyles";
import React from "react";
import { useNavigate } from "react-router-dom";
import MembersGraph from "./MembersGraph";

export default function MembersPage() {
    let navigate = useNavigate();

    return (
        <div>
            <ButtonContainer>
                <Button onClick={() => navigate("add")}>Dodaj ucznia</Button>
                <Button onClick={() => navigate("list")}>Lista uczniów</Button>
            </ButtonContainer>
            <GraphContainer>
                <MembersGraph />
            </GraphContainer>
            <InfoCardsContainer>
                <Card>
                    <CardHeader>189</CardHeader>
                    <span>Zarejestrowani uczniowie</span>
                </Card>
                <Card>
                    <CardHeader>18</CardHeader>
                    <span>Ilość klas w systemie</span>
                </Card>
                <Card>
                    <CardHeader>3b</CardHeader>
                    <span>Najlepsza klasa</span>
                </Card>
            </InfoCardsContainer>
        </div>
    );
}
