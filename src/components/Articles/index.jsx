import React, { useState ,useEffect } from 'react';
// import {URL} from '../../config';
import {firebaseDB, teamsDatabase, firebaseLooper} from '../../Firebase';
import Loading from '../Widgets/Loading/loading';
import Header from './Post/header';
import Body from './Post/body';

const Article = (props) => {
    const [articleData, setArticleData] = useState({data: []})
    const [teamData, setTeamData] = useState({data: []})
    const [loading, setLoading] = useState(false)

 //LifeCycle Function with Hooks...   
    useEffect(() => {
        // fetch(`${URL}/articles/${props.match.params.id}`)
        // .then(res => res.json())
        // .then(fetchedData => {
        //     let articleFetched = fetchedData;
            
        //     fetch(`${URL}/teams/${articleFetched.team}`)
        //     .then(res => res.json())
        //     .then(teamData => {
        //         setArticleData({data: articleFetched})
        //         setTeamData({data: teamData})
        //         setLoading(true)
        //         // console.log('Article_ROUTE |||||||||||||||| ->',articleFetched);
        //         // console.log('Team_ROUTE !!!!!!!!! ->', teamData);
        //     })
        //     .catch(error => console.log(error))
        // })

        //Working with Database instead of API..
            firebaseDB.ref(`articles/${props.match.params.id}`).once('value')
            .then(articleSnap => {
                let articlesData = articleSnap.val();

                teamsDatabase.orderByChild('teamId').equalTo(articlesData.team).once('value')
                .then(teamSnap => {
                    const teamData = firebaseLooper(teamSnap);

                    setArticleData({data: articlesData});
                    setTeamData({data: teamData});
                    setLoading(true)
                })

            })

    }, [props.match.params.id])

    // console.log('articleData --------------', articleData)
    // console.log('teamData ---------- ', teamData);

 ///Loading the Page Until the API is called....   
    if(!loading){
        return <Loading />
    }else{
        return (
            <>
                <Header 
                    teamData={teamData.data[0]} 
                    author={articleData.data.author} 
                    date={articleData.data.date} 
                />
                <Body articleData={articleData.data} />
            </>
        )
    }
}

export default Article;