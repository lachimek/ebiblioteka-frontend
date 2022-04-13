import { api, API_ROUTES } from "api";
import { GraphContainer } from "pages/BooksPage/BooksPageStyles";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HorizontalGraph } from "./HorizontalGraph";

interface Book {
    id: string;
    title: string;
    isbn: string;
    available: boolean;
    delete: boolean;
}

interface Member {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    groupName: string;
}

interface IssuesInfo {
    id: string;
    issueDate: string;
    returnDate: string;
    overdue: boolean;
    book: Book;
    member: Member;
}

interface Reservations {
    id: string;
    reservationDate: string;
    book: Book & { returnDate: string | null };
    member: Member;
}

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
    flex-direction: column;
    margin-bottom: 1em;
    padding: 1em;
    box-shadow: 4px 4px 12px 0px rgba(66, 68, 90, 1);
`;

export default function HomePage() {
    const [issues, setIssues] = useState<IssuesInfo[]>([]);
    const [reservations, setReservations] = useState<Reservations[]>([]);

    useEffect(() => {
        async function fetchAPI() {
            const { data } = await api.get(API_ROUTES.GET_ISSUE_ALL);
            setIssues(data.issues);
        }

        fetchAPI();
        setReservations([
            {
                id: "asdasdasdaads",
                reservationDate: "2022-04-14",
                book: {
                    id: "asdsadasdasdasda",
                    title: "tytul ksiazki",
                    isbn: "5567195045171",
                    available: true, // false = returnDate is last issue history expected return date
                    returnDate: null,
                    delete: false,
                },
                member: {
                    id: "asdaw988ajw89ca87c82",
                    firstName: "imie",
                    lastName: "nazwisko",
                    phone: "123123123",
                    groupName: "1b",
                },
            },
            {
                id: "asdasdasda",
                reservationDate: "2022-04-14",
                book: {
                    id: "asdsadasdasdasda",
                    title: "tytul ksiazki 2",
                    isbn: "5567195045171",
                    available: false, // false = returnDate is last issue history expected return date
                    returnDate: "2022-04-24",
                    delete: false,
                },
                member: {
                    id: "asdaw988ajw89ca87c82",
                    firstName: "imie2",
                    lastName: "nazwisko2",
                    phone: "123123123",
                    groupName: "2b",
                },
            },
            {
                id: "asdaawdadsdasda",
                reservationDate: "2022-04-14",
                book: {
                    id: "asdsadasdasdasda",
                    title: "tytul ksiazki 3",
                    isbn: "5567195045171",
                    available: true, // false = returnDate is last issue history expected return date
                    returnDate: null,
                    delete: false,
                },
                member: {
                    id: "asdaw988ajw89ca87c82",
                    firstName: "imie3",
                    lastName: "nazwisko3",
                    phone: "123123123",
                    groupName: "3b",
                },
            },
        ]);
    }, []);

    return (
        <HomePageContainer>
            <div style={{ width: "45%" }}>
                <span style={{ fontSize: "24px", fontWeight: "bold", padding: "0.5em" }}>
                    Wypożyczenia bliskie przedawnienia
                </span>
                <CardsContainer>
                    {issues &&
                        issues.map((issue) => (
                            <Card key={issue.id} style={{ backgroundColor: issue.overdue ? "#ff00007b" : "#ffa60075" }}>
                                <span>
                                    Uczeń: {issue.member.firstName} {issue.member.lastName} {issue.member.groupName}
                                </span>
                                <span style={{ marginTop: "5px" }}>Telefon kontaktowy: {issue.member.phone}</span>
                                <span style={{ marginTop: "5px", marginBottom: "5px" }}>
                                    Tytuł: {issue.book.title} ISBN: {issue.book.isbn}
                                </span>
                                <span>
                                    Wypożyczenie: {issue.issueDate.split("T")[0]} do {issue.returnDate.split("T")[0]}
                                </span>
                            </Card>
                        ))}
                </CardsContainer>
            </div>
            <div style={{ width: "45%", marginLeft: "1em" }}>
                <span style={{ fontSize: "24px", fontWeight: "bold", padding: "0.5em" }}>Rezerwacje książek</span>
                <CardsContainer>
                    {reservations &&
                        reservations.map((resevation) => (
                            <Card key={resevation.id}>
                                <span>
                                    Uczeń: {resevation.member.firstName} {resevation.member.lastName}{" "}
                                    {resevation.member.groupName}
                                </span>
                                <span style={{ marginTop: "5px" }}>
                                    Tytuł: {resevation.book.title} ISBN: {resevation.book.isbn}
                                </span>
                                <span style={{ marginTop: "5px", marginBottom: "5px" }}>
                                    Data rezerwacji: {resevation.reservationDate}
                                </span>
                                {resevation.book.available ? (
                                    <span style={{ color: "#23b100" }}>Książka dostępna</span>
                                ) : (
                                    <span style={{ color: "#ff00007b" }}>
                                        Książka wypożyczona do {resevation.book.returnDate}
                                    </span>
                                )}
                            </Card>
                        ))}
                </CardsContainer>
            </div>
        </HomePageContainer>
    );
}
