import IIssuesTableData from "interfaces/IIssuesTableData";
import IMember from "interfaces/IMember";
import { PaginationButton } from "pages/BooksPage/BooksListPage/BooksListPageStyles";
import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import styled from "styled-components";
import { StyledTable, StyledButton } from "./IssuesTableStyles";

const Legend = styled.div`
    display: flex;
    margin-top: 20px;
`;

const LegendItem = styled.div<{ backgroundColor: string }>`
    display: flex;
    &:before {
        content: "";
        display: inline-block;
        height: 12px;
        width: 12px;
        background-color: ${(props) => props.backgroundColor};
        border-radius: 2px;
        margin-right: 4px;
        border: 1px solid black;
        justify-content: baseline;
    }

    margin-right: 15px;
    font-size: 12px;
`;

function Table({ columns, data, returnFn }: { columns: any; data: any[]; returnFn: Function }) {
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
                        const getColorByStatus = () => {
                            const rowData = row.original as IIssuesTableData;

                            switch (rowData.status) {
                                case "returned":
                                    return "#00ff003d";
                                case "overdue":
                                    return "#c705053d";
                                case "near":
                                    return "#ffa60075";
                                default:
                                    return "";
                            }
                        };
                        return (
                            <tr {...row.getRowProps()} style={{ height: "50px", backgroundColor: getColorByStatus() }}>
                                {row.cells.map((cell) => {
                                    if (cell.column.id === "id" && cell.value !== undefined)
                                        return (
                                            <td {...cell.getCellProps()} style={{ textAlign: "center" }}>
                                                <StyledButton onClick={() => returnFn(cell.value)}>
                                                    Rozpocznij zwrot
                                                </StyledButton>
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
            <Legend>
                <LegendItem backgroundColor="#c705053d">Przedawnione</LegendItem>
                <LegendItem backgroundColor="#00ff003d">Oddane</LegendItem>
                <LegendItem backgroundColor="#ffa60075">2 dni do przedawnienia lub mniej</LegendItem>
                <LegendItem backgroundColor="#fff">Więcej niż 2 dni do przedawnienia</LegendItem>
            </Legend>
        </>
    );
}

function IssuesTable({ tableData, returnFn }: { tableData: IMember[]; returnFn: Function }) {
    const columns = React.useMemo(
        () => [
            {
                Header: "Lp.",
                accessor: "lp",
            },
            {
                Header: "Uczeń",
                accessor: "member",
            },
            {
                Header: "Telefon",
                accessor: "phone",
            },
            {
                Header: "Klasa",
                accessor: "groupName",
            },
            {
                Header: "Data wypożyczenia",
                accessor: "issueDate",
            },
            {
                Header: "Przewidywany zwrot",
                accessor: "expectedReturnDate",
            },
            {
                Header: "Data zwrotu",
                accessor: "returnDate",
            },
            {
                Header: "Tytuł książki",
                accessor: "bookTitle",
            },
            {
                Header: "ISBN",
                accessor: "isbn",
            },
            {
                Header: "Akcje",
                accessor: "id",
            },
        ],
        []
    );

    return <Table columns={columns} data={tableData} returnFn={returnFn} />;
}

export default IssuesTable;
