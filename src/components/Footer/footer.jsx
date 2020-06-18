import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './footer.module.css';
import { CURRENT_YEAR } from '../../config';

const Footer = () => (
    <div className={Styles.footer}>
        <Link to='/' className={Styles.logo}>
            <img src='/images/nba_logo.png' alt='NBA' />
        </Link>

        <div className={Styles.right}>
            @AsadAnik ReactApp {CURRENT_YEAR} NBA
        </div>
    </div>
)

export default Footer;