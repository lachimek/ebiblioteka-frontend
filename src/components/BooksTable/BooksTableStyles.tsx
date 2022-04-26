import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledTable = styled.table`
    border-collapse: collapse;

    width: 1200px;

    td,
    th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    th {
        background-color: #ff9e0d;
        text-align: left;
        font-weight: bold;
        padding: 12px 8px 12px 8px;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    tr:hover {
        background-color: #ddd;
    }
`;

export const StyledButton = styled.button`
    text-decoration: none;
    border: none;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
    color: unset;
    font-size: 12px;
    background-color: #ff9e0d;
    border-radius: 5px;
    padding: 0.4em 0.6em;
    cursor: pointer;

    &:hover {
        background-color: #ff9e0dcf;
    }
`;

export const Legend = styled.div`
    display: flex;
    margin-top: 20px;
`;

export const LegendItem = styled.div<{ backgroundColor: string }>`
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
