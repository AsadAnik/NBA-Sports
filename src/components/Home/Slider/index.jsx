import React, { useState, useEffect } from 'react';
import Slider from '../../Widgets/SliderMotion/slider';
// import { URL } from '../../../config';
import { articlesDatabase, firebaseLooper, firebase } from '../../../Firebase';

const _ = ({ type, slidersAmount, settings }) => {
    const [sliderData, setSliderData] = useState({ data: [] })
    const wrapper = React.createRef();

    //Object for make unique url with sliders serve.. 
    // let URL_Points = {
    //     start: slidersEntry,
    //     end: slidersEntry + slidersAmount
    // }

    ///LifeCycle for fetching the aync data from API..  
    useEffect(() => {
        //  const fetchData = async() => {
        //     await fetch(`${URL}/articles?_start=${URL_Points.start}&_end=${URL_Points.end}`)
        //     .then(res => res.json())
        //     .then(resData => {
        //         setSliderData({ data: resData })
        //     })
        //     .catch(error => console.log(error))
        //  }

        //  fetchData()

        //Updated with Database instead of API..
        articlesDatabase.limitToFirst(slidersAmount).once('value')
            .then(snapshop => {
                const snapData = firebaseLooper(snapshop);

                snapData.forEach((item, i) => {
                    firebase.storage().ref('images').child(item.image).getDownloadURL()
                        .then(url => {
                            snapData[i].image = url;
                            setSliderData({ data: snapData })
                        })
                })
            })
            .catch(e => console.log('Home_Slider_ERROR -->> ', e))

    }, [slidersAmount])

    ///Return Statement...   
    return (
        <>
            <Slider wrapper={wrapper} sliderData={sliderData} type={type} settings={settings} />
        </>
    )
}

export default _;