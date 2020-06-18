import React from 'react';
import Videos from '../../Home/Videos';

///Videos Main Section for the application...
const _ = () => {
    return (
        <>
           <Videos
                type={'video'}
                start={0}
                end={8}
                showTitle={true}
                loadButton={true}
                linkMoreVideos='/videos'
            />
        </>
    )
}

export default _;