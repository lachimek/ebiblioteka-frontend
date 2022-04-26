import { api, API_ROUTES } from "api";
import { Card, CardHeader, InfoCardsContainer } from "components/Card/Card";
import { Button, ButtonContainer, GraphContainer } from "pages/BooksPage/BooksPageStyles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DailyIssuesGraph from "./DailyIssuesGraph";

export default function IssuesPage() {
    let navigate = useNavigate();

    const [stats, setStats] = useState({
        open: 0,
        near: 0,
        overdue: 0,
    });

    async function fetchAPI() {
        const { data } = await api.get(API_ROUTES.GET_ISSUES_PAGE_STATS);
        setStats(data.info);
    }

    useEffect(() => {
        fetchAPI();
    }, []);

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
                    <CardHeader>{stats.open}</CardHeader>
                    <span>Otwarte wypożyczenia</span>
                </Card>
                <Card>
                    <CardHeader>{stats.near}</CardHeader>
                    <span style={{ textAlign: "center" }}>
                        Wypożyczenia bliskie <br />
                        przedawnienia
                    </span>
                </Card>
                <Card>
                    <CardHeader>{stats.overdue}</CardHeader>
                    <span>Wypożyczenia przedawnione</span>
                </Card>
            </InfoCardsContainer>
        </div>
    );
}
