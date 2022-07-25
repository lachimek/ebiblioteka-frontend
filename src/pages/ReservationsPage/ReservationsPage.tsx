import ReservationsTable from "components/ReservationsTable/ReservationsTable";
import { fetchIssuesAndReservations, homePageSelector, ReservationStatus } from "pages/HomePage/HomePageSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export interface ReservationsTableData {
    id: string;
    memberId: string;
    bookId: string;
    lp: number;
    firstName: string;
    lastName: string;
    isbn: string;
    available: boolean;
    reservationDate: string;
    status: ReservationStatus;
}

export default function RequestsPage() {
    const dispatch = useDispatch();
    const { reservations } = useSelector(homePageSelector);

    const [tableData, setTableData] = useState<ReservationsTableData[]>([]);

    function convertDataToTable() {
        let tableData: ReservationsTableData[] = reservations!.map((reservation, index) => {
            return {
                id: reservation.id,
                memberId: reservation.member.id,
                bookId: reservation.book.id,
                lp: index + 1,
                firstName: reservation.member.firstName,
                lastName: reservation.member.lastName,
                isbn: reservation.book.isbn,
                available: reservation.book.available,
                reservationDate: reservation.reservationDate.split("T")[0],
                status: reservation.status,
            };
        });

        setTableData(tableData);
    }

    useEffect(() => {
        dispatch(fetchIssuesAndReservations());
    }, [dispatch]);

    useEffect(() => {
        if (reservations) convertDataToTable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reservations]);

    const details = () => {};
    const edit = () => {};

    return (
        <div>
            <ReservationsTable tableData={tableData} editFn={edit} detailsFn={details} />
        </div>
    );
}
