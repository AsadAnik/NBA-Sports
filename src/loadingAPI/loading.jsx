import React from 'react';
import Styles from './loading.module.css';
import { css } from "@emotion/core";
import { BarLoader } from 'react-spinners';
import NbaLogo from './NBA.png';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loading = () => {
    return (
        <div className={Styles.loadingPosition}>
            <img src={NbaLogo} alt={'NBA'} />
            <BarLoader css={override} size={300} width={140} color={"black"} loading={true} />
        </div>
    )
}

export default Loading;