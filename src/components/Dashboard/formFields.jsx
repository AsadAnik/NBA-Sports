import React from 'react';
import Styles from './dashboard.module.css';

const Fields = ({formData, change}) => {

    const renderField = (formData) => {
        let output = null;

        switch(formData.elements){
            case "input":
                output = <input className={Styles.input} {...formData.config} onChange={(event) => changeFunc(event, formData)} />
                break;

            default:
                output = null;
        }

        return output;
    }

   //The Input values change statement.. 
    const changeFunc = (event, data) => {
        let value = event.target.value;
        data.value = value;

        let validateData = validation(data);//This will returning an array,
        data.valid = validateData[0];
        data.validationMessage = validateData[1];

        change(data)
    }

  //From Validate is Empty or Not..  
    const validation = (data) => {
        let error = [true, ''];

        if (data.validation) {
            let valid = data.value.trim() !== '';
            let vMessage = `${!valid ? 'This Field Is Required!' : ''}`;
            error = !valid ? [valid, vMessage] : error;
        }
        return error;
    }

    ///The return statement....
    return (
       <>
           {renderField(formData)}
       </>
    )
}

export default Fields;