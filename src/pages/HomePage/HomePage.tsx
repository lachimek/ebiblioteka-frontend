import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchIssuesAndReservations, homePageSelector } from "./HomePageSlice";

const HomePageContainer = styled.div`
    height: 80%;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CardsContainer = styled.div`
    overflow: auto;
    height: 700px;
    padding: 1em;
    margin-top: 1em;
`;

const Card = styled.div`
    display: flex;
    margin-bottom: 1em;
    padding: 1em;
    box-shadow: 4px 4px 12px 0px rgba(66, 68, 90, 1);
`;

const CardLeft = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
`;

const CardRight = styled.div`
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    background-color: #ff9e0d;
    border: 0;
    border-radius: 3px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    font-weight: 600;

    margin-top: 10px;
    margin-bottom: 10px;

    padding: 10px;

    transition: ease-in-out, background-color 0.1s;

    &:hover {
        background-color: #ff9e0dcf;
    }

    &:active {
        box-shadow: inset 0px 0px 8px 1px rgba(66, 68, 90, 0.3), 0px 4px 6px rgba(0, 0, 0, 0.25);
    }
`;

export default function HomePage() {
    const dispatch = useDispatch();
    const { issues, reservations } = useSelector(homePageSelector);

    useEffect(() => {
        dispatch(fetchIssuesAndReservations());
    }, [dispatch]);

    const handleReservation = (reservationId: string) => {
        console.log(reservationId);
    };

    return (
        <HomePageContainer>
            <div style={{ width: "45%" }}>
                <span style={{ fontSize: "24px", fontWeight: "bold", padding: "0.5em" }}>
                    Wypożyczenia bliskie przedawnienia
                </span>
                <CardsContainer>
                    {issues &&
                        issues.map((issue) => (
                            <Card
                                key={issue.id}
                                style={{
                                    backgroundColor: issue.overdue ? "#ff00007b" : "#ffa60075",
                                    flexDirection: "column",
                                }}
                            >
                                <span>
                                    Uczeń: {issue.member.firstName} {issue.member.lastName} {issue.member.groupName}
                                </span>
                                <span style={{ marginTop: "5px" }}>Telefon kontaktowy: {issue.member.phone}</span>
                                <span style={{ marginTop: "5px", marginBottom: "5px" }}>
                                    Tytuł: {issue.book.title} ISBN: {issue.book.isbn}
                                </span>
                                <span>
                                    Wypożyczenie: {issue.issueDate ? issue.issueDate.split("T")[0] : "brak"} do{" "}
                                    {issue.expectedReturnDate ? issue.expectedReturnDate.split("T")[0] : "brak"}
                                </span>
                            </Card>
                        ))}
                </CardsContainer>
            </div>
            <div style={{ width: "45%", marginLeft: "1em" }}>
                <span style={{ fontSize: "24px", fontWeight: "bold", padding: "0.5em" }}>Rezerwacje książek</span>
                <CardsContainer>
                    {reservations &&
                        reservations.map((reservation) => (
                            <Card key={reservation.id}>
                                <CardLeft>
                                    <span>
                                        Uczeń: {reservation.member.firstName} {reservation.member.lastName}{" "}
                                        {reservation.member.groupName}
                                    </span>
                                    <span style={{ marginTop: "5px" }}>
                                        Telefon kontaktowy: {reservation.member.phone}
                                    </span>
                                    <span style={{ marginTop: "5px" }}>Tytuł: {reservation.book.title}</span>
                                    <span style={{ marginTop: "5px" }}>ISBN: {reservation.book.isbn}</span>
                                    <span style={{ marginTop: "5px", marginBottom: "5px" }}>
                                        Data rezerwacji: {reservation.reservationDate}
                                    </span>
                                    {reservation.book.available ? (
                                        <span style={{ color: "#23b100" }}>Książka dostępna</span>
                                    ) : (
                                        <span style={{ color: "#ff00007b" }}>
                                            Książka wypożyczona do {reservation.book.returnDate}
                                        </span>
                                    )}
                                </CardLeft>
                                <CardRight>
                                    <Button onClick={() => handleReservation(reservation.id)}>
                                        Potwierdź rezerwacje
                                    </Button>
                                </CardRight>
                            </Card>
                        ))}
                </CardsContainer>
            </div>
        </HomePageContainer>
    );
}
