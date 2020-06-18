import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaNewspaper, FaPlay, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Styles from './Sidenav.module.css';

const SidenavItems = () => {

  //Items JSON's here which is controlled with loop..  
    const items = [
        {
            itemStyle: Styles.navItems,
            text: 'Home',
            linkTo: '/',
            icon: <FaHome className={Styles.icons} />
        },
        {
            itemStyle: Styles.navItems,
            text: 'News',
            linkTo: '/news',
            icon: <FaNewspaper className={Styles.icons} />
        },
        {
            itemStyle: Styles.navItems,
            text: 'Videos',
            linkTo: '/videos',
            icon: <FaPlay className={Styles.icons} />
        },
        {
            itemStyle: Styles.navItems,
            text: 'Sign In',
            linkTo: '/sign-in',
            icon: <FaSignInAlt className={Styles.icons} />
        },
        {
            itemStyle: Styles.navItems,
            text: 'Sign Out',
            linkTo: '/sign-out',
            icon: <FaSignOutAlt className={Styles.icons} />
        }
    ]

 //Looping Function...   
    const showItems = () => (
         items.map((item, index) => (
                <div key={index} className={item.itemStyle}>
                    {item.icon}
                    <Link to={item.linkTo}>{item.text}</Link>
                </div>
            ))
    )

    //The Return Statement...   
    return (
        <>
            { showItems() }
        </>
    )

}

export default SidenavItems;