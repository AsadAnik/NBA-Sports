import React, {useState, useEffect} from 'react';
// import {URL} from '../../../config';
import {firebaseDB, firebaseLooper, teamsDatabase, videosDatabase} from '../../../Firebase';
import Loading from '../../Widgets/Loading/loading';
import Header from './header';
import Videos from './videos';
import RelatedVideos from '../../Widgets/VideoList/videos';

const _ = (props) => {
    const [videos, setVideos] = useState({data: []})
    const [team, setTeam] = useState({data: []})
    const [relatedVideos, setRelatedVideos] = useState({data: []})
    const [teamsData, setTeamsData] = useState({data: []})
    const [loading, setLoading] = useState(true)

 //LifeCycle Method...   
    useEffect(() => {
        // fetch(`${URL}/videos/${props.match.params.id}`)
        // .then(res => res.json())
        // .then(vData => {

        //     fetch(`${URL}/teams/${vData.id}`)
        //     .then(res => res.json())
        //     .then(tData => {
        //         setVideos({data: vData})
        //         setTeam({data: tData})
                
        //         setLoading(false)
        //         vRelated(tData)
        //         // console.log('Hacked Video----------', vData)
        //         // console.log('Hacked Team-------', tData)
        //     })
        // })

     //Leave API and start with Database(Firebase)...
        firebaseDB.ref(`videos/${props.match.params.id}`).once('value')
        .then(vSnapData => {
            let vData = vSnapData.val();

            teamsDatabase.orderByChild('teamId').equalTo(vData.team).once('value')
            .then(tSnapData => {
                let tData = firebaseLooper(tSnapData);

                setVideos({data: vData});
                setTeam({data: tData});
                setLoading(false);
                // vRelated(tData)
                vRelated()
            })
        })   

    }, [props.match.params.id])

 ///Related Videos fetching...   
    const vRelated = () => {
        // let city = teamData[0].city;

        // fetch(`${URL}/teams`)
        // .then(res => res.json())
        // .then(tData => {

        //     fetch(`${URL}/videos?q=${city}&_limit=5`)
        //     .then(res => res.json())
        //     .then(vRelated => {
        //         setTeamsData({data: tData})
        //         setRelatedVideos({data: vRelated})
        //     })
        // })

       ///Using the Database Instead of API(fetch api)...
        teamsDatabase.once('value')
        .then(snapTData => {
            let tData = firebaseLooper(snapTData);

            videosDatabase.orderByChild('team').equalTo(3).once('value')
            .then(rVideoSnap => {
                let rVideo = firebaseLooper(rVideoSnap);

                setTeamsData({data: tData});
                setRelatedVideos({data: rVideo});
            })
        })
    }

    // console.log('Hacked Videos', videos.data)
    // console.log('Hacked Teams', team)
    // console.log('Related_Videos :->>> ',relatedVideos)
    // console.log('Teams_Data :->>> ',teamsData)

 ///Loading time with API rendered fully in time then render page...   
    if(loading){
        return <Loading />
    }else{
        return (
            <>
                <Header tData={team.data[0]} date={videos.data.date} /> 
                <Videos vData={videos.data} /> 
                <RelatedVideos videosData={relatedVideos.data} teamsData={teamsData.data} />
            </>
        )
    }

}

export default _;