import React from 'react';
import Styles from './auth.module.css';

const Auth = ({ formData, change }) => {
    ///Form Rendering function for setting up the objects data into Array of Object..   
    const formRendering = () => {
        let grabeIntoList = [];
        //loop object and put it on array_of_object..
        for (let items_key in formData) {
            grabeIntoList.push({
                id: items_key,
                settings: formData[items_key]
            })
        }

        return grabeIntoList.map((item, id) => (
            <div key={id}>
                {rendaringInput(item)}
            </div>
        ))
    }

    //onChange handler function.....   
    const changeHandler = (event, id, blur) => {
        let value = event.target.value;
        formData[id].value = value;

        //Validate Password Specially to more Security...
        let passValidator = passOnlyValidation(formData[id]);
        formData[id].strongPass = passValidator[0];
        formData[id].strongPassMessage = passValidator[1];

        if (blur) {
            let validateData = validation(formData[id]);//This will returning an array,
            formData[id].valid = validateData[0];
            formData[id].validationMessage = validateData[1];

            //Make Default the StrongPassMessage with onBlur event...   
            formData[id].strongPassMessage = '';
        }

        // console.log(value, id);
        //Called the parent method and keep the form value..  
        change(formData)
    }

    ///Validate Password With RegExp, Special Charecter, Numbers, Letters..  
    const passOnlyValidation = (elements) => {
        let error = [undefined, ''];
        let password = elements.value;

        if (elements.config.type === "password" && elements.validation) {
            let methodCase = [];

            methodCase.push("[$@$!%*#?&]"); // Special Charecter.
            methodCase.push("[A-Z]");       // Uppercase Alpabates.
            methodCase.push("[a-z]");       // Lowercase Alpabates.
            methodCase.push("[0-9]");       // Numbers.

            //Checking the Condition for thoes methologies..
            let countWord = 0;
            for (let i = 0; i < methodCase.length; i++) {
                if (new RegExp(methodCase[i]).test(password)) {
                    countWord++;
                }
            }

            //Display With Condition..
            let condition = '';
            switch (countWord) {
                case 0:
                case 1:
                case 2:
                    condition = 'Very Weak';
                    break;

                case 3:
                    condition = 'Medium';
                    break;

                default:
                    condition = 'Strong';
            }

            ///Apply for Application validation Password..
            let valid = countWord > 3;
            let pMessage = !valid ? condition : condition;
            error = !valid ? [valid, pMessage] : [true, condition];
        }

        return error;
    }

    ///The Validation Function...
    const validation = (elements) => {
        let error = [true, ''];

        //validation regex with Email...
        if (elements.config.type === "email" && elements.validation) {
            const valid = /\S+@\S+\.\S+/.test(elements.value);
            const vMessage = !valid ? 'Please Type Valid Email!' : '';
            error = !valid ? [valid, vMessage] : error;
        }

        //Password length validation...  
        if (elements.validation.minLen && elements.config.type === "password") {
            let valid = elements.value.length >= elements.validation.minLen;
            let vMessage = `${!valid ? `Letters length must be upper then ${elements.validation.minLen} char!` : ''}`;
            error = !valid ? [valid, vMessage] : error;
        }

        if (elements.validation) {
            let valid = elements.value.trim() !== '';
            let vMessage = `${!valid ? 'This Field Is Required!' : ''}`;
            error = !valid ? [valid, vMessage] : error;
        }
        return error;
    }

    //Label Rendering over condition..
    const renderLabel = (label, text) => {
        return label ? (
            <label>{text}</label>
        ) : null;
    }

    ///Strong Password Message...
    const strongPassMessage = (data) => {
        let passConflict = null;
        let message = data.strongPassMessage;

        if (data.config.type === 'password' && data.validation) {
            passConflict = (
                <div className={Styles.strongPassMessage}>
                    <span
                        style={{ color: `${message === 'Very Weak' ? 'red' : message === 'Medium' ? 'orange' : 'green'}` }}
                    >
                        {message}
                    </span>
                </div>
            )
        }
        return passConflict
    }

    ///ShowValidation Function...
    const showErrorMessage = (data) => {
        let showMessage = null;

        if (!data.valid && data.validation) {
            showMessage = (
                <div className={Styles.label_message}>
                    <span>{data.validationMessage}</span>
                </div>
            )
        }
        return showMessage;
    }

    //Rendering the input items dynamically from here..   
    const rendaringInput = (inputData) => {
        let input = inputData.settings;
        let output = null;

        ///Makes Area over switch case...   
        switch (input.elements) {
            case "input":
                output = (
                    <>
                        {renderLabel(input.label, input.labelText)}
                        <br />
                        <input {...input.config}
                            value={input.value}
                            onChange={(event) => { changeHandler(event, inputData.id, false) }}
                            onBlur={(event) => { changeHandler(event, inputData.id, true) }}
                        />
                        {showErrorMessage(input)}
                        {strongPassMessage(input)}
                    </>
                )
                break;

            default:
                output = null;
        }
        return output;
    }
    //Final Return Statement..   
    return (
        <>
            {formRendering()}
        </>
    )
}

export default Auth;