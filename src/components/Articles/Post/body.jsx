import React from 'react';
import Styles from '../articles.module.css';

const Body = ({ articleData }) => {
    return (
        <>
            <div className={Styles.body}>
                <h1>{articleData.title}</h1>
                <img src={`/images/articles/${articleData.image}`} alt={articleData.image}/>
                <p>
                    {articleData.body}
                </p>
            </div>
        </>
    )
}

export default Body;