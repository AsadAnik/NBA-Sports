import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './footer.module.css';
import { CURRENT_YEAR } from '../../config';

const Footer = () => (
    <div className={Styles.footer}>
        {/* <Link to='/' className={Styles.logo}>
            <img src='/images/sportsWorld.png' alt='Sports World' />
        </Link> */}

        <Link to='/' className={Styles.footerName}>
            <span>Wo<span className={Styles.l}>rl</span>d Sp<span className={Styles.l}>or</span>ts</span>
        </Link>

        <div className={Styles.right}>
            @AsadAnik ReactApp {CURRENT_YEAR} WORLD SPORTS
        </div>
    </div>
)

export default Footer;