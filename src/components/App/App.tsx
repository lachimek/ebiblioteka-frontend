import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSelector } from "../../pages/LoginPage/LoginSlice";
import Navbar from "../Navbar/Navbar";
import TopBar from "../TopBar/TopBar";
import { AppContainer, Content, TopBarAndContent } from "./AppStyles";

export default function App(props: any) {
    const location = useLocation();
    const navigate = useNavigate();
    const { loggedIn } = useSelector(loginSelector);

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
        }
    }, [navigate, loggedIn]);

    return (
        <AppContainer>
            {location.pathname === "/login" ? (
                props.children
            ) : (
                <>
                    <Navbar />
                    <TopBarAndContent>
                        <TopBar />
                        <Content>{props.children}</Content>
                    </TopBarAndContent>
                </>
            )}
        </AppContainer>
    );
}
