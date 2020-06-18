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

        if (blur) {
            let validateData = validation(formData[id]);//This will returning an array,
            formData[id].valid = validateData[0];
            formData[id].validationMessage = validateData[1]
        }

        // console.log(value, id);
        //Called the parent method and keep the form value..  
        change(formData)
    }

    ///The Validation Function...
    const validation = (elements) => { 
        let error = [true, ''];

        if (elements.validation.minLen) {
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

    ///ShowValidation Function...
    const showValidation = (data) => {
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
                        {showValidation(input)}
                    </>
                )
                break;
            case "textarea":
                output = (
                    <>
                        {renderLabel(input.label, input.labelText)}
                        <br />
                        <textarea
                            {...input.config}
                            value={input.value}
                            onChange={(event) => { changeHandler(event, inputData.id) }}
                            onBlur={(event) => { changeHandler(event, inputData.id, true) }}
                        />
                        {showValidation(input)}
                    </>
                )
                break;
            case "select":
                output = (
                    <>
                        {renderLabel(input.label, input.labelText)}
                        <br />
                        <select
                            value={input.value}
                            name={input.config.name}
                            onChange={(event) => { changeHandler(event, inputData.id) }}
                            onBlur={(event) => { changeHandler(event, inputData.id, true) }}
                        >
                            {input.config.options.map((option, i) => (
                                <option key={i} value={option.item}>
                                    {option.item}
                                </option>
                            ))}
                        </select>
                        {showValidation(input)}
                    </>
                );
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