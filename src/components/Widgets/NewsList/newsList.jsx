import React from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup ,CSSTransition } from 'react-transition-group';
import Styles from './news.module.css';
import TeamDate from '../TeamDate/teamDate';

const NewsList = ({type, listData, teams}) => {

    console.log(listData)
    
 ///Function for Checking type and grabing the data for specific item..   
    const NewsItems = (newsType) => {
        let nData = null;
        switch (newsType) {
            case 'news':
                nData = listData.map((item, index) => (
                          <CSSTransition
                                classNames={{
                                    enter: Styles.newslist_item_enter,
                                    enterActive: Styles.newslist_item_active
                                }}
                                timeout={500}
                                key={index}
                            >
                            <div className={Styles.newslist_item}>
                                <Link to={`/articles/${item.id}`} className={Styles.listItems}>
                                    <TeamDate 
                                        teams={teams} 
                                        teamId={item.team} 
                                        date={ item.date }
                                    />
                                    <h2>
                                        {item.title}
                                    </h2>
                                </Link>
                            </div>
                          </CSSTransition>
                        ))
                break;
            
            case 'mainNews':
                nData = listData.map((item, index) => (
                    <CSSTransition
                        classNames={{
                            enter: Styles.newslist_item_enter,
                            enterActive: Styles.newslist_item_active
                        }}
                        timeout={500}
                        key={index}
                    >
                       <Link to={`/articles/${item.id}`} className={Styles.list}>
                        <div className={Styles.list_left} 
                            style={{
                                background: `url('/images/articles/${item.image}')`
                        }}> 
                            <div></div>
                        </div>

                        <div className={Styles.list_right}>
                            <TeamDate 
                                teams={teams} 
                                teamId={item.team} 
                                date={item.date}
                            />
                            <span className={Styles.title_text}>{item.title}</span>
                        </div>
                    </Link>
                    </CSSTransition>
                ))
                break;

            default:
                nData = null;
        }
        return nData;
    }

 //Return Statement...   
    return (
        <TransitionGroup 
            component={'div'} 
            className={'list'}
        >
            { NewsItems(type) }
        </TransitionGroup>
    )
   
}

export default NewsList;