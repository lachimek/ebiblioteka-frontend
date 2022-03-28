import IBooksTableData from "interfaces/IBooksTableData";
import IMember from "interfaces/IMember";
import IMembersTableData from "interfaces/IMembersTableData";
import { PaginationButton } from "pages/BooksPage/BooksListPage/BooksListPageStyles";
import React from "react";
import { useTable, Column, useSortBy, usePagination } from "react-table";
import { StyledTable, StyledButton } from "./MembersTableStyles";

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
                                    else if (cell.column.id === "id" && cell.value !== undefined)
                                        return (
                                            <td {...cell.getCellProps()} style={{ textAlign: "center" }}>
                                                <StyledButton
                                                    onClick={() => detailsFn(cell.value)}
                                                    style={{ marginRight: "8px" }}
                                                >
                                                    Szczegóły
                                                </StyledButton>
                                                <StyledButton onClick={() => editFn(cell.value)}>Edytuj</StyledButton>
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

function BooksTable({ tableData, detailsFn, editFn }: { tableData: IMember[]; detailsFn: Function; editFn: Function }) {
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
                Header: "Telefon",
                accessor: "phone",
            },
            {
                Header: "Klasa",
                accessor: "groupName",
            },
            {
                Header: "Ilość wypożyczonych książek",
                accessor: "issuanceCount",
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

export default BooksTable;
