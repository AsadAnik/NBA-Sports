import React from 'react';
import Input from './auth';
import Styles from './auth.module.css';

class Auth extends React.Component {
///State for form Data Validation for Login/Register...
    state = {
        loading: false,

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
        console.log(this.state.formData)
    }

   ///Submit Method for form submit when click for Login/Register.. 
    submittedForm = (e) => {
        e.preventDefault();
        ///Add the Data to specific properties of object like value.. 
        //Loop thow the object and find value and keep data here..  
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
            alert('Successfully Collected Your Informations!')
            console.log(formValues);
        }
    }


    //The Main Rendaring Function...
    render() {//The rendaring method inner here...
        return (
            <form onSubmit={this.submittedForm} className={Styles.form}>
                <h2>Register/Login</h2>
                <Input
                    formData={this.state.formData}
                    change={(newState) => this.updateState(newState)}
                    changeWithBlur={(newState) => this.updateState(newState)}
                />

                <button type='button'>Login</button>
                <button type='submit'>Register</button>
            </form>
        )
    }
}

export default Auth;