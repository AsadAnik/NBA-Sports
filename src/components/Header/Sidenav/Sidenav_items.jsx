import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { firebase } from '../../../Firebase';
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

    //Checking User...
    // console.log('sidenav props inner ------ ', props)

    ///The Common items which is need to showing in every steps more..   
    const commonItems = (item, index) => (
        <div key={index} className={item.itemStyle}>
            {item.icon}
            <Link to={item.linkTo}>{item.text}</Link>
        </div>
    )

    ///The Dynamic items for showing the items or not..  
    const dynamicItems = (item, index) => {
        let output = null;

        //Check if user is not present and inteadly also login is need true. 
        if (props.user === null && item.login) {
            output = commonItems(item, index);
        }

        //user is present and not need to sign-in again so login false.
        if (props.user && !item.login) {
            if (item.linkTo === '/sign-out') {//make sign-out route to accual sign-out.
                output = (
                    <div key={index} className={item.itemStyle}
                        onClick={() => {
                            firebase.auth().signOut()
                                .then(() => {
                                    props.history.push('/');
                                })
                                .catch(error => console.log(error))
                        }}
                    >
                        {item.icon}
                        {item.text}
                    </div>
                )
            } else {
                output = commonItems(item, index);
            }
        }

        return output;
    }

    //Looping Function for loop throw the arrray for navbars item...   
    const showItems = () => (
        items.map((item, index) => (
            item.login !== '' ?
                dynamicItems(item, index)
                :
                commonItems(item, index)
        ))
    )

    //The Return Statement...   
    return (
        <>
            {showItems()}
        </>
    )

}

export default withRouter(SidenavItems);