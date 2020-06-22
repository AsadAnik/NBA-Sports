import React from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Styles from './videos.module.css';
import TeamDate from '../TeamDate/teamDate';

//Takes 2_Props from Team & Video API..
const Video = ({ videosData, teamsData }) => {
 //Render Videos with Good Look...   
    const renderList = () => {
        let listItem = videosData.map((item, id) => {
            return (
                <CSSTransition
                    classNames={{
                        enter: Styles.list_enter,
                        enterActive: Styles.list_active
                    }}
                    timeout={500}
                    key={id}
                >
                    <Link to={`/videos/${item.id}`} className={Styles.list}>
                        <div className={Styles.list_left} 
                            style={{
                                background: `url('/images/videos/${item.image}')`
                        }}> 
                            <div></div>
                        </div>

                        <div className={Styles.list_right}>
                            <TeamDate 
                                teams={teamsData} 
                                teamId={item.team} 
                                date={item.date}
                            />
                            <span className={Styles.title_text}>{item.title}</span>
                        </div>
                    </Link>
                </CSSTransition>
            )
        })

        return listItem;
    }


 //Return Statement...   
    return (
        <TransitionGroup component={'div'} className={'list'}>
            {renderList()}
        </TransitionGroup>
    )
}

export default Video;