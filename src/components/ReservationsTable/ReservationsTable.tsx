import { PaginationButton } from "pages/BooksPage/BooksListPage/BooksListPageStyles";
import { Reservation } from "pages/HomePage/HomePageSlice";
import { ReservationsTableData } from "pages/ReservationsPage/ReservationsPage";
import React from "react";
import { useTable, Column, useSortBy, usePagination } from "react-table";
import { StyledButton, StyledTable } from "./ReservationsTableStyles";

const convertStatus = (status: Reservation["status"]): { text: string; color: string } => {
    switch (status) {
        case "completed":
            return { text: "Zakończona", color: "#000" };
        case "cancelled":
            return { text: "Anulowana", color: "#b30808" };
        case "begin":
            return { text: "Przyjęta", color: "#000" };
        case "waiting":
            return { text: "Oczekuje na zwrot", color: "#dd9000" };
        case "ready":
            return { text: "Oczekuje na odbiór", color: "#35aa18" };
        default:
            return { text: "", color: "" };
    }
};

function Table({
    columns,
    data,
    detailsFn,
    editFn,
}: {
    columns: any;
    data: any[];
    detailsFn: Function;
    editFn: Function;
}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useSortBy,
        usePagination
    );
    // Render the UI for your table
    return (
        <>
            <StyledTable {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}{" "}
                                    <span>{column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : "  "}</span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} style={{ height: "50px" }}>
                                {row.cells.map((cell) => {
                                    if (cell.value === true)
                                        return (
                                            <td {...cell.getCellProps()} style={{ textAlign: "center" }}>
                                                <span style={{ color: "green" }}>Tak</span>
                                            </td>
                                        );
                                    else if (cell.value === false)
                                        return (
                                            <td {...cell.getCellProps()} style={{ textAlign: "center" }}>
                                                <span style={{ color: "red" }}>Nie</span>
                                            </td>
                                        );
                                    else if (cell.column.id === "status") {
                                        const { text, color } = convertStatus(cell.value);
                                        return (
                                            <td {...cell.getCellProps()} style={{ textAlign: "center" }}>
                                                <span style={{ color: color }}>{text}</span>
                                            </td>
                                        );
                                    } else if (cell.column.id === "id" && cell.value !== undefined)
                                        return (
                                            <td {...cell.getCellProps()} style={{ textAlign: "center" }}>
                                                <StyledButton
                                                    onClick={() => detailsFn(cell.value)}
                                                    style={{ marginRight: "8px" }}
                                                >
                                                    Szczegóły
                                                </StyledButton>
                                                <StyledButton onClick={() => editFn(cell.value)}>Wypożycz</StyledButton>
                                            </td>
                                        );
                                    else return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </StyledTable>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px" }}>
                <PaginationButton type="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    &lt;
                </PaginationButton>
                <span>
                    Strona {pageIndex + 1} z {pageOptions.length}
                </span>
                <PaginationButton type="button" onClick={() => nextPage()} disabled={!canNextPage}>
                    &gt;
                </PaginationButton>
            </div>
        </>
    );
}

function ReservationsTable({
    tableData,
    detailsFn,
    editFn,
}: {
    tableData: ReservationsTableData[];
    detailsFn: Function;
    editFn: Function;
}) {
    const columns = React.useMemo(
        () => [
            {
                Header: "Lp.",
                accessor: "lp",
            },
            {
                Header: "Imię",
                accessor: "firstName",
            },
            {
                Header: "Nazwisko",
                accessor: "lastName",
            },
            {
                Header: "ISBN",
                accessor: "isbn",
            },
            {
                Header: "Data rezerwacji",
                accessor: "reservationDate",
            },
            {
                Header: "Dostępna?",
                accessor: "available",
            },
            {
                Header: "Status",
                accessor: "status",
            },
            {
                Header: "Akcje",
                accessor: "id",
            },
        ],
        []
    );

    return <Table columns={columns} data={tableData} detailsFn={detailsFn} editFn={editFn} />;
}

export default ReservationsTable;
