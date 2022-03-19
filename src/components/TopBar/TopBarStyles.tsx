import styled from "styled-components";

export const TopBarContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff;
    color: #435058;
    height: 5vh;
    width: 100%;
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 0 1rem 0 1rem;

    span {
        padding-right: 1rem;
    }
`;

export const SessionTime = styled.div`
    display: flex;
    align-items: center;

    span {
        padding-right: 0.1rem;
    }
`;
