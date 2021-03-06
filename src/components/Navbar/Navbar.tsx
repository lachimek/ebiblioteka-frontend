import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../images/logo.svg";
import { NavContainer, NavLogo, NavLink, NavLinksContainer, NavItem } from "./NavbarStyles";
import { ReactComponent as HomeIcon } from "../../images/home-svgrepo-com.svg";
import { ReactComponent as BookIcon } from "../../images/book-closed.svg";
import { ReactComponent as MemberIcon } from "../../images/male-university-graduate.svg";
import { ReactComponent as IssuesIcon } from "../../images/book-reader.svg";
import { ReactComponent as RequestsIcon } from "../../images/store.svg";
import { ReactComponent as ChartIcon } from "../../images/chart.svg";

import React from "react";

const Navbar = React.memo(function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    function isActive(path: string): boolean {
        return location.pathname.includes(path);
    }

    function activeFill(path: string): string {
        return location.pathname.includes(path) ? "#FF9E0D" : "#435058";
    }

    const iconProps = (location: string) => {
        return {
            height: "1rem",
            width: "1rem",
            cursor: "pointer",
            onClick: () => navigate(`/${location}`),
        };
    };
    return (
        <NavContainer>
            <NavLogo src={Logo} alt="E-Biblioteka" onClick={() => navigate("/")} />
            <NavLinksContainer>
                <NavItem>
                    <HomeIcon {...iconProps("")} fill={location.pathname === "/" ? "#FF9E0D" : "#435058"} />
                    <NavLink to={"/"} active={location.pathname === "/"}>
                        Strona domowa
                    </NavLink>
                </NavItem>
                <NavItem>
                    <BookIcon {...iconProps("books")} fill={activeFill("books")} />
                    <NavLink to={"/books"} active={isActive("books")}>
                        Książki
                    </NavLink>
                </NavItem>
                <NavItem>
                    <MemberIcon {...iconProps("members")} fill={activeFill("members")} />
                    <NavLink to={"/members"} active={isActive("members")}>
                        Uczniowie
                    </NavLink>
                </NavItem>
                <NavItem>
                    <IssuesIcon {...iconProps("issues")} fill={activeFill("issues")} />
                    <NavLink to={"/issues"} active={isActive("issues")}>
                        Wypożyczenia
                    </NavLink>
                </NavItem>
                <NavItem>
                    <RequestsIcon {...iconProps("reservations")} fill={activeFill("reservations")} />
                    <NavLink to={"/reservations"} active={isActive("reservations")}>
                        Rezerwacje
                    </NavLink>
                </NavItem>
                <NavItem>
                    <ChartIcon {...iconProps("stats")} fill={activeFill("stats")} />
                    <NavLink to={"/stats"} active={isActive("stats")}>
                        Statystyki
                    </NavLink>
                </NavItem>
            </NavLinksContainer>
        </NavContainer>
    );
});

export default Navbar;
