import React, { useState } from 'react';
import Styles from './auth.module.css';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { firebase, googleAuthProvider, facebookAuthProvider } from '../Firebase';

///Providers Authentication...
const ProvidersAuth = (props) => {
    ///The Hooks data for showing the Error message for the user...
    const [errorMessage, setErrorMessage] = useState('');

    ///To Google Login System..
    const googleClick = () => {
        firebase.auth().signInWithPopup(googleAuthProvider)
        .then(() => {
            props.history.push('/');
        })
        .catch(error => {
            setErrorMessage(error.message);
        })
    }

    //To Facebook Login System..
    const facebookClick = () => {
        firebase.auth().signInWithPopup(facebookAuthProvider)
        .then(() => {
            props.history.push('/');
        })
        .catch(error => {
            setErrorMessage(error.message);
        })
    }

    return (
        <div className={Styles.ProvidersAuth}>
            <div>
                <h2 className={Styles.ProvidersText}>Providers Login</h2>
            </div>

           {/****************Authentication Provider Methods**************/} 
            <div className={Styles.Providers}>
                {/**********GOOOGLE AUTH PROVIDER***********/}
                <button className={Styles.Google} type={'button'} onClick={ googleClick }>
                    <span><FcGoogle className={Styles.FcGoogle} /></span>
                    <span className={Styles.FaTxtG}>Google Login</span>
                </button>

                {/***********FACEBOOK AUTH PROVIDER*************/}
                <button className={Styles.Facebook} type={'button'} onClick={ facebookClick }>
                    <span><FaFacebook className={Styles.FaFacebook} /></span>
                    <span className={Styles.FaTxtF}>Facebook Login</span>
                </button>
            </div>

            {/*****************ERROR MESSAGE THROWING*************/}
            {
                errorMessage ? 
                    <div style={{color: 'red', fontWeight: 'bold', margin: '10px', padding: '5px'}}>
                        <span>{errorMessage}</span>
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default ProvidersAuth;