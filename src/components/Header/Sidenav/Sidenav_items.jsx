import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {firebase} from '../../../Firebase';
import { FaHome, FaNewspaper, FaPlay, FaCreativeCommonsBy, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Styles from './Sidenav.module.css';

const SidenavItems = (props) => {

    //Items JSON's here which is controlled with loop..  
    const items = [
        {
            itemStyle: Styles.navItems,
            text: 'Home',
            linkTo: '/',
            icon: <FaHome className={Styles.icons} />,
            login: ''
        },
        {
            itemStyle: Styles.navItems,
            text: 'News',
            linkTo: '/news',
            icon: <FaNewspaper className={Styles.icons} />,
            login: ''
        },
        {
            itemStyle: Styles.navItems,
            text: 'Videos',
            linkTo: '/videos',
            icon: <FaPlay className={Styles.icons} />,
            login: ''
        },
        {
            itemStyle: Styles.navItems,
            text: 'Dashboard',
            linkTo: '/dashboard',
            icon: <FaCreativeCommonsBy className={Styles.icons} />,
            login: false
        },
        {
            itemStyle: Styles.navItems,
            text: 'Sign In',
            linkTo: '/sign-in',
            icon: <FaSignInAlt className={Styles.icons} />,
            login: true
        },
        {
            itemStyle: Styles.navItems,
            text: 'Sign Out',
            linkTo: '/sign-out',
            icon: <FaSignOutAlt className={Styles.icons} />,
            login: false
        }
    ]

    console.log('sidenav props inner ------ ', props)

    //Looping Function...   
    const showItems = () => (
        items.map((item, index) => (
            item.login !== '' ?
                restrigatedItems(item, index)
                :
                sidenavItems(item, index)
        ))
    )

    const sidenavItems = (item, index) => (
        <div key={index} className={item.itemStyle}>
            {item.icon}
            <Link to={item.linkTo}>{item.text}</Link>
        </div>
    )

    const restrigatedItems = (item, index) => {
        let showIfLoggedIn = null;

        if (props.user === null && item.login) {
            showIfLoggedIn = sidenavItems(item, index);
        }

        if (props.user && !item.login) {
            if (item.linkTo === '/sign-out') {
                showIfLoggedIn = (
                    <div key={index} className={item.itemStyle}
                        onClick={() => {
                            firebase.auth().signOut()
                            .then(() => {
                                props.history.push('/')
                            })
                            .catch(error => console.log(error))
                        }}
                    >
                        {item.icon}
                        <Link>{item.text}</Link>
                    </div>
                )
            } else {
                showIfLoggedIn = sidenavItems(item, index);
            }
        }

        return showIfLoggedIn;
    }

    //The Return Statement...   
    return (
        <>
            {showItems()}
        </>
    )

}

export default withRouter(SidenavItems);