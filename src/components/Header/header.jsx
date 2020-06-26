import React from 'react';
import Styles from './header.module.css';
import { Link } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import SideNav from './Sidenav/Sidenav';

///The HEader Section of this application...
const Header = (props) => {

    //To Showing the navIcon to click action with showing the navbar..
    const navBars = () => (
        <div>
            <MdMenu className={Styles.burgerMenuBar} onClick={props.onShowNav} />
        </div>
    )

    // //To showing the logo of this application..
    // const logo = () => (
    //     <Link to='/' className={Styles.logo}>
    //         <img src='/images/sportsWorld.png' alt='Sports World' />
    //     </Link>
    // )

    ///Showing the Application name..
    const name = () => (
            <Link to='/' className={Styles.appName}>
                <span>Wo<span className={Styles.l}>rl</span>d Sp<span className={Styles.l}>or</span>ts</span>
            </Link>
    )

    return (
        <header className={Styles.header}>
            <SideNav {...props} />
            <nav className={Styles.nav}>
                {navBars()}
                {/* {logo()} */}
                {name()}
            </nav>
        </header>
    )
}

export default Header;