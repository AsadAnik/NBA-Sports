import React, { useState } from 'react';
import Styles from '../articles.module.css';

const Videos = ({ vData }) => {
    const [share, setShare] = useState(false)

    return (
        <>
            <div className={Styles.body}>
                <div>
                    <h1>{vData.title}</h1>
                    <iframe
                        title={'videoplayer'}
                        height={'300px'}
                        width={'100%'}
                        src={`https://www.youtube.com/embed/${vData.url}`}
                        style={{ border: '1px solid lightgray' }}
                    >
                    </iframe>
                </div>

                <div className={Styles.vShare} onClick={() => {setShare(share ? false : true)}}>
                    <span>{!share ? 'Click | Share Video' : vData.url}</span>
                </div>
            </div>
        </>
    )
}

export default Videos;