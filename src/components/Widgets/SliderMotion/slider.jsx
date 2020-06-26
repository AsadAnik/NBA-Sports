import React from 'react';
import Slick from 'react-slick';
import { Link } from 'react-router-dom';
import Styles from './slider.module.css';

const Slider = ({ sliderData, type, settings }) => {
    const fetchedData = sliderData.data;
    let slidersItem = null;
    // console.log(sliderData)

    const settingsItem = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,

        ...settings
    }

    switch (type) {
        case "slider":
            slidersItem = (fetchedData.map(item => {
                return (
                    <div key={item.id} className={Styles.slider_items}>
                        <div
                            className={Styles.slider_image}
                            style={{
                                background: `url('${item.image}')`
                            }}
                        >
                        </div>

                        <Link to={`/articles/${item.id}`}>
                            <div className={Styles.slider_text}>
                                {item.title}
                            </div>
                        </Link>
                    </div>
                )
            }))
            break;

        default:
            return null;
    }


    return (
        <>
            <Slick {...settingsItem}>
                {slidersItem}
            </Slick>
        </>
    )
}

export default Slider;