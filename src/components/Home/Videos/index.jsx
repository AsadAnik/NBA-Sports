import React, { Component } from 'react';
// import { URL } from '../../../config';
import {teamsDatabase, videosDatabase, firebaseLooper} from '../../../Firebase';
import Styles from '../../Widgets/VideoList/videos.module.css';
import Button from '../../Widgets/Button/button';
import Videos from '../../Widgets/VideoList/videos';

class _ extends Component {
    constructor(props) {//constructor..
        super(props)

        this.state = {//App_State,
            ...props,
            videos: [],
            teams: [],
            startURL: this.props.start,
            endURL: this.props.end,
            amountURL: this.props.start + this.props.end
        }
    }

  //LifeCycle_React...  
    componentDidMount() {
        this.serviceData(this.state.startURL, this.state.amountURL)
    }

  //Service API...  
    serviceData = async (start, end) => {
        if (this.state.teams.length < 1) {
            // await fetch(`${URL}/teams`)
            //     .then(res => res.json())
            //     .then(teamData => {
            //         this.setState({
            //             teams: teamData,
            //         })
            //         // console.log('--------------Teams Fetched for Videos -> ', teamData);
            //     })
            //     .catch(error => console.log(error))

          //Worked with database regardless with API..  
            teamsDatabase.once('value')
            .then(teamDataSnap => {
                const teamData = firebaseLooper(teamDataSnap);
                this.setState({
                    teams: teamData
                })
            })
            .catch(e => console.log('ERROR in HOme sections Video Data -->>', e))
        }

        // await fetch(`${URL}/videos?_start=${start}&_end=${end}`)
        //     .then(res => res.json())
        //     .then(videosData => {
        //         this.setState({
        //             videos: [...this.state.videos, ...videosData],
        //             startURL: start,
        //             endURL: end
        //         })
        //         // console.log('------------Fetched again Videos -> ', videosData)
        //     })
        //     .catch(error => console.log('Videos Error ', error))

        ///Working with Database instead of API..
            videosDatabase.orderByChild('id').startAt(start).endAt(end).once('value')
            .then(videoSnapData => {
                const videosData = firebaseLooper(videoSnapData);
                this.setState({
                    videos: [...this.state.videos, ...videosData]
                })
            })
            .catch(e => console.log('ERROR in Homes Videos Section -->> ', e))
    }

 //Load More Items function..   
    moreVideoClick = (end, amount) => {
        let POINTS = {
            a: end,
            e: amount + end
        }
        this.serviceData(POINTS.a + 1, POINTS.e)
    }

 ///Button or, show Link Button..   
    buttonShouldAppear = (loadButton) => {
        return loadButton ?
            <Button type={'dark_btn'} value={'Load More Videos'} moreVideoClick={() => { this.moreVideoClick(this.state.endURL, this.state.amountURL) }} />
            :
            <Button type={'link_btn'} linkAdress={this.state.linkMoreVideos} value={'Link To See More'} />;
    }

 //Showing Title of Video or not..  
    renderTitle = (title) => {
        return title ? (
            <div className={Styles.title}><span>NBA</span> Videos</div>
        ) : (null)
    }

  ///To Checking List of prevent reusable component..  
    renderVideoList = (type) => {
        let renderingList = null;
        switch (type) {
            case "video":
                renderingList = <Videos videosData={this.state.videos} teamsData={this.state.teams} />
                break;

            default:
                renderingList = null;
        }

        return renderingList;
    }

    render() {//App Rendering Method...
        // console.log('Vidoes Fetched : ', this.state.videos)
        // console.log('Teams Fetched : ', this.state.teams)

        return (
            <div>
                {this.renderTitle(this.state.showTitle)}
                {this.renderVideoList(this.state.type)}
                {this.buttonShouldAppear(this.state.loadButton)}
            </div>
        )
    }
}

export default _;