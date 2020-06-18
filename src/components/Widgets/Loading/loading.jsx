import React from 'react';
import { css } from "@emotion/core";
import { ScaleLoader } from "react-spinners";

/// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    padding: 20px;
    text-align: center;
`;

const Loading = () => {
    return (
        <>
            <ScaleLoader
                css={override}
                size={200}
                color={"#000"}
                loading={true}
            />
        </>
    )
}

export default Loading;