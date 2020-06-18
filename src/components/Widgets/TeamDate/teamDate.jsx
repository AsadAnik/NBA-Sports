import React from 'react';
import moment from 'moment';
import Styles from './teamDate.module.css';
import { FaClock } from 'react-icons/fa';

const TeamDate = ({ teams, teamId, date }) => {

  //Finding the Team Name with Articles ID checking...   
    const calculateTeamWithID = (team, id) => {
        let findTeam = team.find((value) => value.teamId === id)
        if (findTeam) {
            return findTeam.name;
        }
    }

  //Rendering elements..
    const renderDateTeam = () => {
        let dateTeam = null;

        dateTeam = (
            <div className={Styles.team_date}>
                <span className={Styles.team}>{calculateTeamWithID(teams, teamId)}</span>
                <span className={Styles.date_clock}><FaClock /></span>
                <span className={Styles.date}>{moment(date).format('DD-MM-YYYY')}</span>
            </div>
        )
        return dateTeam;
    }

    return <> {renderDateTeam()}</>
}

export default TeamDate;