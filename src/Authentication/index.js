import React from 'react';
import { firebase } from '../Firebase';
import Input from './auth';
import Styles from './auth.module.css';
import Loading from '../components/Widgets/Loading/loading';

class Auth extends React.Component {
    ///State for form Data Validation for Login/Register...
    state = {
        loading: false,
        registerError: '',

        formData: {
            email: {
                elements: 'input',
                label: true,
                labelText: 'Email',
                value: '',

                config: {
                    name: 'username',
                    type: 'email',
                    placeholder: 'Enter your Email..'
                },

                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            password: {
                elements: 'input',
                label: true,
                labelText: 'Password',
                value: '',

                config: {
                    name: 'password',
                    type: 'password',
                    placeholder: 'Type Password..'
                },

                validation: {
                    required: true,
                    minLen: 8,
                },
                valid: false,
                touched: false,
                validationMessage: '',

                strongPass: false,
                strongPassMessage: '',
            },
        }
    }

    ///Update the Application states formData with newState from Auth.jsx...
    updateState = (newState) => {
        this.setState({
            formData: newState
        })
    }

    ///Submit Method for form submit when click for Login/Register.. 
    submittedForm = (e, type) => {
        e.preventDefault();
        ///Add the Data to specific properties of object like value.. 
        //Loop thow the object and find value and keep data here..  
        if (type !== null) {
            let formValues = {};
            let validData = true;

            //Loop the state to set into the new state...   
            for (let key in this.state.formData) {
                formValues[key] = this.state.formData[key].value;
            }
            //for throw the state and checking for valid data..   
            for (let key in this.state.formData) {
                validData = this.state.formData[key].valid &&
                    this.state.formData['password'].strongPass && validData;
            }

            //Checking full state if valid then access for data in console...   
            if (validData) {
                this.setState({
                    loading: true,
                    registerError: ''
                })

                if (!type) {//Registering the New User...
                    firebase.auth().createUserWithEmailAndPassword(
                        formValues.email,
                        formValues.password
                    )
                        .then(() => {
                            this.props.history.push('/');
                        })
                        .catch(error => {
                            this.setState({
                                loading: false,
                                registerError: error.message
                            })
                        })

                } else {///Login User...
                    firebase.auth().signInWithEmailAndPassword(
                        formValues.email,
                        formValues.password
                    )
                        .then(() => {
                            this.props.history.push('/');
                        })
                        .catch(error => {
                            this.setState({
                                loading: false,
                                registerError: error.message
                            })
                        })
                }
            }
            
        }
    }

  //To Showing  any errors after form complete with Login/Register..  
    showErrorMessage = (errorMessage) => (
        errorMessage !== '' ?
        <div className={Styles.registerErrorMessage}>
            <span>{errorMessage}</span>
        </div>
        :
        null
    )


    //The Main Rendaring Function...
    render() {//The rendaring method inner here...
        return (
            <form onSubmit={(e) => this.submittedForm(e, null)} className={Styles.form}>
                <h2>Register/Login</h2>
                <Input
                    formData={this.state.formData}
                    change={(newState) => this.updateState(newState)}
                    changeWithBlur={(newState) => this.updateState(newState)}
                />

                {this.showErrorMessage(this.state.registerError)}
                {
                    this.state.loading ?
                        <Loading />
                        :
                        <>
                            <button type='button' onClick={(e) => this.submittedForm(e, true)}>Login</button>
                            <button type='submit' onClick={(e) => this.submittedForm(e, false)}>Register</button>
                        </>
                }
            </form>
        )
    }
}

export default Auth;