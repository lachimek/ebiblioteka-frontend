import { api, API_ROUTES } from "api";
import { Card, CardHeader, InfoCardsContainer } from "components/Card/Card";
import { ButtonContainer, Button, GraphContainer } from "pages/BooksPage/BooksPageStyles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupsGraph, { GroupsGraphData } from "./GroupsGraph";

interface Stats {
    membersCount: number;
    groupsCount: number;
    bestGroup: { value: number; group: string };
    graphData: GroupsGraphData[];
}

export default function MembersPage() {
    let navigate = useNavigate();

    const [stats, setStats] = useState<Stats>({
        membersCount: 0,
        groupsCount: 0,
        bestGroup: { value: 0, group: "..." },
        graphData: [{ group: "", value: 0 }],
    });

    useEffect(() => {
        async function fetchAPI() {
            const { data } = await api.get(API_ROUTES.GET_MEMBERS_PAGE_STATS);
            setStats(data.info);
            console.log(data.info);
        }

        fetchAPI();
    }, []);

    return (
        <div style={{ width: "80%" }}>
            <ButtonContainer>
                <Button onClick={() => navigate("add")}>Dodaj ucznia</Button>
                <Button onClick={() => navigate("list")}>Lista uczniów</Button>
            </ButtonContainer>
            <GraphContainer>
                <GroupsGraph graphData={stats.graphData} />
            </GraphContainer>
            <InfoCardsContainer>
                <Card>
                    <CardHeader>{stats.membersCount}</CardHeader>
                    <span>Zarejestrowani uczniowie</span>
                </Card>
                <Card>
                    <CardHeader>{stats.groupsCount}</CardHeader>
                    <span>Ilość klas w systemie</span>
                </Card>
                <Card>
                    <CardHeader>{stats.bestGroup.group}</CardHeader>
                    <span>Najaktywniejsza klasa</span>
                </Card>
            </InfoCardsContainer>
        </div>
    );
}
