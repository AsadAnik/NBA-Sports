import React from 'react';
import SlideShow from './Slider';
import NewsShow from './News';
import VideoList from './Videos';

const Home = () => {
    return (
        <>
                <SlideShow 
                    type={'slider'}
                    slidersAmount={3}
                    settings={{
                   //Reuseable settings components.. 
                    dots: false,
                    arrows: false,
                    }}
                />

                <NewsShow
                    type={'news'}
                    slidersEntry={3}
                    slidersAmount={3}
                />

                <VideoList
                    type={'video'}
                    start={0}
                    end={3}
                    showTitle={true}
                    loadButton={true}
                    linkMoreVideos='/videos'
                />
        </>
    )
}
export default Home;