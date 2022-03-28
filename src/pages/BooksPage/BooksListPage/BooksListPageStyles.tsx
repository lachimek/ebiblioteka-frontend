import styled from "styled-components";

export const PaginationButton = styled.button`
    background-color: #ff9e0d;
    border: none;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    font-weight: bold;
    padding: 0.3em 2em;
    cursor: pointer;

    :disabled {
        background-color: lightgray;
        box-shadow: inset 0px 4px 6px rgba(0, 0, 0, 0.25);
        cursor: default;
    }
`;

export const SearchContainer = styled.div`
    display: flex;
    justify-content: flex-end;

    margin-bottom: 20px;
`;

export const SearchInput = styled.input`
    background-color: #fff;
    border: 0;
    border-radius: 0 3px 3px 0;
    border-bottom: 1px solid #ff9e0d;
    transition: ease-in-out, background-color 0.1s;
    font-size: 18px;
    padding: 3px 0px 3px 3px;
    z-index: 1;
    min-width: 220px;

    &:focus {
        background-color: #e5e5e5d3;
    }
`;

export const SearchSelect = styled.select`
    margin: 0 20px 0 20px;

    background-color: #fff;
    border: 0;
    border-radius: 0 3px 3px 0;
    border-bottom: 1px solid #ff9e0d;
    transition: ease-in-out, background-color 0.1s;
    font-size: 18px;
    padding: 3px 0px 3px 3px;
    z-index: 1;
    min-width: 220px;

    &:focus {
        background-color: #e5e5e5d3;
    }
`;
