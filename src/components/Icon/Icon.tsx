import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

enum NavLinkState {
    active = "#FF9E0D",
    inactive = "#435058",
}

interface IIconProps {
    active?: boolean;
    src?: string;
    height: any;
    width: any;
    clickable?: boolean;
    rotate?: boolean;
    deg?: number;
}

export const Icon = styled.div<IIconProps>`
    background-color: ${(props) => (props.active ? NavLinkState.active : NavLinkState.inactive)};
    mask: url(${(props) => props.src}) no-repeat center;
    height: ${(props) => props.height};
    width: ${(props) => props.width};
    cursor: ${(props) => (props.clickable ? "pointer" : "")};

    ${(props) => props.rotate && `transform: rotate(${props.deg}deg); transition: transform 0.5s ease-in;`};
`;
