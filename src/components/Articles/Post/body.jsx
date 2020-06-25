import React from 'react';
import Styles from '../articles.module.css';

const Body = ({ articleData, imageURL }) => {
    return (
        <>
            <div className={Styles.body}>
                <h1>{articleData.title}</h1>
                
                {/* <img src={`/images/articles/${articleData.image}`} alt={articleData.image}/> */}
                <img src={`${imageURL}`} alt={imageURL}/>

                <p
                    dangerouslySetInnerHTML={{
                        __html: articleData.body
                    }}
                >
                    {/* {articleData.body} */}
                </p>
            </div>
        </>
    )
}

export default Body;