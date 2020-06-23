import React from 'react';
import Styles from './dashboard.module.css';

const FormFields = ({ formdata, change, id }) => {
    ///This component for Giving the from input fields...
    //Erro Label showing function..
    const showError = () => {
        let errorMessage = null;

        if (formdata.validation && !formdata.valid) {
            errorMessage = (
                <div className={Styles.label_message}>
                    <span>{formdata.validationMessage}</span>
                </div>
            )
        }

        return errorMessage;
    }


    //Rendaring the Template over with the condition...
    const renderTemplate = () => {
        let formTemplate = null;

        switch (formdata.element) {
            case ('input'):
                formTemplate = (
                    <div>
                        <input
                            className={Styles.input}
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event) => change({ event, id, blur: true })}
                            onChange={(event) => change({ event, id, blur: false })}
                        />
                        {showError()}
                    </div>
                )
                break;

            case ('teamSelector'):
                formTemplate = (
                    <div>
                        <select
                            className={Styles.selector}
                            value={formdata.value}
                            name={formdata.config.name}
                            onChange={(event) => change({ event, id, blur: false })}
                            onBlur={(event) => change({ event, id, blur: true })}
                        >
                            {formdata.config.options.map((teams, id) => (
                                <option key={id} value={teams.id}>{teams.city}</option>
                            ))}
                        </select>
                    </div>
                )
                break;

            default:
                formTemplate = null;
        }
        return formTemplate;
    }


    ///The Returning Statement here... 
    return (//Return Statement..
        <>
            {renderTemplate()}
        </>
    )

}

export default FormFields;