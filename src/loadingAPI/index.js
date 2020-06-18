import React, { useState, useEffect } from 'react';
import {firebaseDB} from '../Firebase';
import Loading from './loading';
// import { URL } from '../config';

const _ = (props) => {

    const [pageLoaded, setPageLoaded] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            // fetch(`${URL}`)
            // .then(res => {
            //     setPageLoaded(true)
            // })
            // .catch(error => console.log(error))

           //Adding with database..
            firebaseDB.ref('articles').once('value')
            .then(snapshot => {
                setPageLoaded(true);
            }) 
            .catch(error => console.log(error))
        }, 2000)
    })

    if (!pageLoaded) {
        return <Loading />
    } else {
        return <>{props.children}</>
    }
}

export default _;