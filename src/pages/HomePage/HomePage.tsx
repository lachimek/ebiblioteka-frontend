import { Card, CardHeader, InfoCardsContainer } from "components/Card/Card";
import { GraphContainer } from "pages/BooksPage/BooksPageStyles";
import React from "react";
import DailyIssuesGraph from "./DailyIssuesGraph";
import { HorizontalGraph } from "./HorizontalGraph";

export default function HomePage() {
    return (
        <div>
            <GraphContainer style={{ marginTop: 0 }}>
                <HorizontalGraph />
            </GraphContainer>
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
