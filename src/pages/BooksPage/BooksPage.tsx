import { api, API_ROUTES } from "api";
import { Card, CardHeader, InfoCardsContainer } from "components/Card/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BooksGraph from "./BooksGraph";
import { BooksPageContainer, Button, ButtonContainer, GraphContainer } from "./BooksPageStyles";

export default function BooksPage() {
    let navigate = useNavigate();
    const [stats, setStats] = useState({
        countIssued: 0,
        countReturned: 0,
        countLost: 0,
        graphData: [],
    });

    async function fetchAPI() {
        const { data } = await api.get(API_ROUTES.GET_BOOKS_PAGE_STATS);
        setStats(data.info);
    }

    useEffect(() => {
        fetchAPI();
    }, []);

    return (
        <BooksPageContainer>
            <ButtonContainer>
                <Button onClick={() => navigate("add")}>Dodaj książkę</Button>
                <Button onClick={() => navigate("list")}>Lista książek</Button>
            </ButtonContainer>
            <GraphContainer>
                <BooksGraph graphData={stats.graphData} />
            </GraphContainer>
            <InfoCardsContainer>
                <Card>
                    <CardHeader>{stats.countIssued}</CardHeader>
                    <span>Wypożyczone książki</span>
                </Card>
                <Card>
                    <CardHeader>{stats.countReturned}</CardHeader>
                    <span>Zwrócone książki</span>
                </Card>
                <Card>
                    <CardHeader>{stats.countLost}</CardHeader>
                    <span>Niezwrócone książki</span>
                </Card>
            </InfoCardsContainer>
        </BooksPageContainer>
    );
}
