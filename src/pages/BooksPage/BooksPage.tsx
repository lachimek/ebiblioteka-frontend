import { Card, CardHeader, InfoCardsContainer } from "components/Card/Card";
import { useNavigate } from "react-router-dom";
import BooksTable from "../../components/BooksTable/BooksTable";
import BooksGraph from "./BooksGraph";
import { BooksPageContainer, Button, ButtonContainer, GraphContainer } from "./BooksPageStyles";

export default function BooksPage() {
    let navigate = useNavigate();

    return (
        <BooksPageContainer>
            <ButtonContainer>
                <Button onClick={() => navigate("add")}>Dodaj książkę</Button>
                <Button onClick={() => navigate("list")}>Lista książek</Button>
            </ButtonContainer>
            <GraphContainer>
                <BooksGraph />
            </GraphContainer>
            <InfoCardsContainer>
                <Card>
                    <CardHeader>50</CardHeader>
                    <span>Wypożyczone książki</span>
                </Card>
                <Card>
                    <CardHeader>160</CardHeader>
                    <span>Zwrócone książki</span>
                </Card>
                <Card>
                    <CardHeader>5</CardHeader>
                    <span>Zgubione książki</span>
                </Card>
            </InfoCardsContainer>
        </BooksPageContainer>
    );
}
