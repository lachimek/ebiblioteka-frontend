import { Card, CardHeader, InfoCardsContainer } from "components/Card/Card";
import { Button, ButtonContainer, GraphContainer } from "pages/BooksPage/BooksPageStyles";
import React from "react";
import { useNavigate } from "react-router-dom";
import DailyIssuesGraph from "./DailyIssuesGraph";

export default function IssuesPage() {
    let navigate = useNavigate();

    return (
        <div style={{ width: "80%" }}>
            <ButtonContainer>
                <Button onClick={() => navigate("add")}>Nowe wypożyczenie</Button>
                <Button onClick={() => navigate("list")}>Historia wypożyczeń</Button>
            </ButtonContainer>
            <GraphContainer>
                <DailyIssuesGraph />
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
