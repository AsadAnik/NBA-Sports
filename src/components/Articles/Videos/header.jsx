import React from 'react';
import Styles from '../articles.module.css';

const Header = ({tData, date}) => {
 ///Catching the data in Object from Props..   
    const teams = {
        name: tData.data.name,
        city: tData.data.city,
        logo: tData.data.logo
    }

 ///Return Statement..   
    return (
        <div className={Styles.header}>
            <div className={Styles.head}>
                <img src={`/images/teams/${teams.logo}`} alt={teams.logo} />
                <h1 className={Styles.vTeamname}>
                    <span>{teams.name}</span>
                    <span> | </span>
                    <span>{teams.city}</span>
                </h1>
            </div>

            <div className={Styles.foot}>
                <p><span className={Styles.littleBold}>Date:</span> {date}</p>
            </div>
        </div>
    )
}

export default Header;