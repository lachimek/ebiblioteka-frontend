import IBooksTableData from "interfaces/IBooksTableData";
import React from "react";
import { useTable, Column } from "react-table";
import { StyledTable, StyledButton } from "./BooksTableStyles";

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
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });
    // Render the UI for your table
    return (
        <StyledTable {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
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
                Header: "Dostępne?",
                accessor: "available",
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
