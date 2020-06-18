import React from 'react';
import Styles from '../articles.module.css';

const Header = ({teamData, author, date}) => {

    console.log(teamData)

 //wins and lose.......
    const team = {
        name: teamData.name,
        logo: teamData.logo,
        wins: teamData.stats[0].wins,
        lose: teamData.stats[0].defeats
    }

 ///Return Statement..   
    return (
        <div className={Styles.header}>
            <div className={Styles.head}>
                <img src={`/images/teams/${team.logo}`} alt={team.logo} />
                <h1>
                    <span className={Styles.teamname}>{team.name}</span>
                    <br/>
                    <span className={Styles.stats}>Wins - {team.wins} | Lose - {team.lose}</span>
                </h1>
            </div>

            <div className={Styles.foot}>
                <p><span className={Styles.littleBold}>Date:</span> {date}</p>
                <p><span className={Styles.littleBold}>Author:</span> {author}</p>
            </div>
        </div>
    )
}

export default Header;