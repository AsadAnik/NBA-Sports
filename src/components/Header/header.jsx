import React from 'react';
import Styles from './header.module.css';
import { Link } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import SideNav from './Sidenav/Sidenav';

const Header = (props) => {

    const navBars = () => (
        <div>
            <MdMenu className={Styles.burgerMenuBar} onClick={props.onShowNav} />    
        </div>
    )

    const logo = () => (
        <Link to='/' className={Styles.logo}>
            <img src='/images/nba_logo.png' alt='NBA' />
        </Link>
    )

    return (
        <header className={Styles.header}>
            <SideNav {...props} />
            <nav className={Styles.nav}>
                { navBars() }
                { logo() }
            </nav>
        </header>
    )
}

export default Header;