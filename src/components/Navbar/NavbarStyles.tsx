import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavContainer = styled.nav`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    width: 15vw;
    height: 100vh;
    padding-left: 2rem;
`;

export const NavLogo = styled.img`
    width: 8rem;
    cursor: pointer;
`;

export const NavLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
`;

enum NavLinkState {
    active = "#FF9E0D",
    inactive = "#435058",
}

export const NavItem = styled.div`
    display: flex;
    align-items: center;
    padding-top: 2rem;
`;

export const NavLink = styled(Link)<{ active: Boolean }>`
    text-decoration: none;
    color: ${(props) => (props.active ? NavLinkState.active : NavLinkState.inactive)};
    text-transform: uppercase;
    font-size: 20px;
    width: fit-content;
    padding-left: 0.8rem;
`;
