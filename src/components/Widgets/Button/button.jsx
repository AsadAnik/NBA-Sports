import React from 'react';
import Styles from './button.module.css';
import { Link } from 'react-router-dom';

const Buttons = ({ type, value, loadMoreClick, linkAdress, moreVideoClick }) => {
    let button = null;

    switch (type) {
        case "blue_btn":
            button = <button className={Styles.btn_blue} onClick={() => loadMoreClick()}>{value}</button>
            break;

        case "link_btn":
            button = <Link to={linkAdress} className={Styles.btn_link}>{value}</Link>
            break;

        case "dark_btn":
            button = <button className={Styles.btn_dark} onClick={() => moreVideoClick()}>{value}</button>
            break;

        default:
            return null;
    }

    return button;
}

export default Buttons;