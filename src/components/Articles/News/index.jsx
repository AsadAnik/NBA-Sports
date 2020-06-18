import React from 'react';
import Slider from '../../Home/Slider';
import NewsList from '../../Home/News';

///All information for Main_News will go to Reuseable components...
const _ = () => {
    return(
       <>
           <Slider
                type={'slider'}
                slidersEntry={0}
                slidersAmount={3}
                settings={{dots: false}}
           />

           <NewsList
                type={'mainNews'}
                slidersEntry={3}
                slidersAmount={6}
           />
       </>
    )
}

export default _;