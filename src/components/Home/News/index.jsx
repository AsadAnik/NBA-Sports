import React from 'react';
// import { URL } from '../../../config';
import {teamsDatabase, articlesDatabase, firebaseLooper} from '../../../Firebase';
import NewsList from '../../Widgets/NewsList/newsList';
import Button from '../../Widgets/Button/button';

class _ extends React.Component {//classBase component..
    constructor(props) {//Constructor..
        super(props)

        this.state = {//State..
            data: [],
            teams: [],
            type: this.props.type,
            start: this.props.slidersEntry,
            amount: this.props.slidersAmount,
            end: this.props.slidersEntry + this.props.slidersAmount,
        }

        this.wrapper = React.createRef()
    }

    componentDidMount() {//The LifeCycle method..
        this.getFetchedData(this.state.start, this.state.end)
    }

  //API Fetcheding method..  
    getFetchedData = async(startURL, endURL) => {
        if(this.state.teams.length < 1){
            // await fetch(`${URL}/teams`)
            // .then(resTeams => resTeams.json())
            // .then(teamList => {
            //     this.setState({
            //         teams: teamList
            //     })
            //     // console.log('>>>>>>>>>>>>Teams Fetched -> ',teamList)
            // })

         //Working with Database and updated from API...
            teamsDatabase.once('value')
            .then(teamSnap => {
                const teamsData = firebaseLooper(teamSnap);
                this.setState({
                    teams: teamsData,
                })
            })
        }

            // await fetch(`${URL}/articles?_start=${startURL}&_end=${endURL}`)
            // .then(resData => resData.json())
            // .then(newsData => {
            //     this.setState({
            //         data: [...this.state.data, ...newsData],
            //         start: startURL,
            //         end: endURL
            //     })
            //     // console.log('<<<<<<<<<<<<<Articles Fetched -> ', newsData)
            // })
            // .catch(err => console.log(err))

          //Updating with Database instead of API..
            articlesDatabase.orderByChild('id').startAt(startURL).endAt(endURL).once('value')
            .then(articlesSnapData => {
                const articlesData = firebaseLooper(articlesSnapData);
                this.setState({
                    data: [...this.state.data, ...articlesData],
                    start: startURL,
                    end: endURL
                })
            })
            .catch(e => console.log('ERROR in articles data of Home Page -->>', e))
    }

  //Loading more items by clicking the button..  
    LoadMoreNews() {
        let URLpoints = {
            end: this.state.end,
            amountEnd: this.state.amount + this.state.end
        }
        this.getFetchedData(URLpoints.end + 1, URLpoints.amountEnd)
    }

    render() {//The Render Method..
        const { type, data, teams } = this.state;
        // console.log('Articles ', this.state.data)
        // console.log('Teams ', this.state.teams)

        return (
            <div wrapper={this.wrapper}>
                <NewsList type={type} listData={data} teams={teams} />
                  
                <Button 
                    type={'blue_btn'} 
                    value={'Load More News'} 
                    loadMoreClick={() => this.LoadMoreNews() }
                />
            </div>
        )
    }
}

export default _;