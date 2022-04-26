import IBooksTableData from "interfaces/IBooksTableData";
import { PaginationButton } from "pages/BooksPage/BooksListPage/BooksListPageStyles";
import React from "react";
import { useTable, Column, useSortBy, usePagination } from "react-table";
import { StyledTable, StyledButton, Legend, LegendItem } from "./BooksTableStyles";

function Table({
    columns,
    data,
    detailsFn,
    deleteFn,
    editFn,
}: {
    columns: any;
    data: any[];
    detailsFn: Function;
    deleteFn: Function;
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
                        const getColorByStatus = () => {
                            const rowData = row.original as IBooksTableData;

                            return rowData.available ? "#fff" : "#c705053d";
                        };
                        return (
                            <tr {...row.getRowProps()} style={{ height: "50px", backgroundColor: getColorByStatus() }}>
                                {row.cells.map((cell) => {
                                    if (cell.column.id === "id" && cell.value !== undefined)
                                        return (
                                            <td {...cell.getCellProps()} style={{ textAlign: "center" }}>
                                                <StyledButton
                                                    onClick={() => detailsFn(cell.value)}
                                                    style={{ marginRight: "8px" }}
                                                >
                                                    Szczegóły
                                                </StyledButton>
                                                <StyledButton
                                                    onClick={() => editFn(cell.value)}
                                                    style={{ marginRight: "8px" }}
                                                >
                                                    Edytuj
                                                </StyledButton>
                                                <StyledButton onClick={() => deleteFn(cell.value)}>Usuń</StyledButton>
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
                <LegendItem backgroundColor="#c705053d">Niedostępne</LegendItem>
                <LegendItem backgroundColor="#fff">Dostępne</LegendItem>
            </Legend>
        </>
    );
}

function BooksTable({
    tableData,
    detailsFn,
    deleteFn,
    editFn,
}: {
    tableData: IBooksTableData[];
    detailsFn: Function;
    deleteFn: Function;
    editFn: Function;
}) {
    const columns = React.useMemo(
        () => [
            {
                Header: "Lp.",
                accessor: "lp",
            },
            {
                Header: "ISBN",
                accessor: "isbn",
            },
            {
                Header: "Tytuł",
                accessor: "title",
            },
            {
                Header: "Autor",
                accessor: "author",
            },
            {
                Header: "Gatunek",
                accessor: "genre",
            },
            {
                Header: "Akcje",
                accessor: "id",
            },
        ],
        []
    );

    return <Table columns={columns} data={tableData} detailsFn={detailsFn} deleteFn={deleteFn} editFn={editFn} />;
}

export default BooksTable;
