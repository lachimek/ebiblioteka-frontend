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
                <Button onClick={() => navigate("list")}>Lista wypożyczeń</Button>
            </ButtonContainer>
            <GraphContainer>
                <DailyIssuesGraph />
            </GraphContainer>
            <InfoCardsContainer>
                <Card>
                    <CardHeader>30</CardHeader>
                    <span>Otwarte wypożyczenia</span>
                </Card>
                <Card>
                    <CardHeader>18</CardHeader>
                    <span style={{ textAlign: "center" }}>
                        Wypożyczenia bliskie <br />
                        przedawnienia
                    </span>
                </Card>
                <Card>
                    <CardHeader>3</CardHeader>
                    <span>Wypożyczenia przedawnione</span>
                </Card>
            </InfoCardsContainer>
        </div>
    );
}
