import React from "react";
import styled from "styled-components";

interface ILoaderDimensions {
    height: number;
    width: number;
}

const Loader = styled.div<ILoaderDimensions>`
    border: 2px solid #f3f3f3; /* Light grey */
    border-top: 2px solid #666666; /* Blue */
    border-radius: 50%;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    animation: spin 2s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export default function LoaderSpin({ height, width }: ILoaderDimensions) {
    return <Loader height={height} width={width} />;
}
