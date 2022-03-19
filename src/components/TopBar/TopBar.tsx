import { Icon } from "../Icon/Icon";
import { SessionTime, TopBarContainer, UserInfo } from "./TopBarStyles";
import { ReactComponent as LogoutIcon } from "../../images/power-off.svg";
import { ReactComponent as RefreshIcon } from "../../images/undo.svg";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector, logout, refreshToken } from "../../pages/LoginPage/LoginSlice";
import { useEffect, useState } from "react";
import React from "react";
import toast from "react-hot-toast";

const TopBar = React.memo(function TopBar() {
    const { user, expires } = useSelector(loginSelector);
    const dispatch = useDispatch();
    const [timeLeft, setTimeLeft] = useState<string>("09:59");
    const [deg, setDeg] = useState<number>(0);

    const handleLogout = (expired: boolean) => {
        if (expired) {
            toast.error("Sesja logowania wygasła. Zostałeś wylogowany");
        }
        dispatch(logout());
    };

    const handleRefreshToken = () => {
        setDeg(deg - 720);
        dispatch(refreshToken());
    };

    const expireDate = new Date(expires * 1000);

    const getTimeLeft = (expireDate: Date) => {
        const diff = new Date(expireDate.getTime() - new Date().getTime());
        return {
            minute: diff.getUTCMinutes(),
            second: diff.getUTCSeconds(),
            ms: diff.getTime(),
        };
    };

    useEffect(() => {
        const timer = setInterval(() => {
            const { minute, second, ms } = getTimeLeft(expireDate);
            if (ms <= 1000) handleLogout(true);
            let minuteF = "0" + minute;
            let secondF = "0" + second;

            setTimeLeft(`${minuteF.slice(-2)}:${secondF.slice(-2)}`);
        }, 1000);

        return () => clearInterval(timer);
    }, [expires]);

    return (
        <TopBarContainer>
            <SessionTime>
                <span>{timeLeft}</span>
                <RefreshIcon
                    fill="#435058"
                    height="0.8rem"
                    width="0.8rem"
                    cursor="pointer"
                    style={{ transform: `rotate(${deg}deg)`, transition: "transform 0.5s ease-in" }}
                    onClick={handleRefreshToken}
                />
            </SessionTime>
            <UserInfo>
                <span>
                    {user?.firstName} {user?.lastName}
                </span>
                <LogoutIcon
                    fill="#435058"
                    height="1rem"
                    width="1rem"
                    cursor="pointer"
                    onClick={() => handleLogout(false)}
                />
            </UserInfo>
        </TopBarContainer>
    );
});

export default TopBar;
