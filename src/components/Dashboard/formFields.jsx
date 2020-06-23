import React from 'react';
import Styles from './dashboard.module.css';

const FormFields = ({formdata,change,id}) =>{

    const showError = () => {
        let errorMessage = null;

        if(formdata.validation && !formdata.valid){
            errorMessage = (
                <div className={Styles.label_message}>
                    {formdata.validationMessage}
                </div>
            )
        }

        return errorMessage;
    }


    const renderTemplate = () => {
        let formTemplate = null;

        switch(formdata.element){
            case('input'):
                formTemplate = (
                    <div>
                        <input
                            className={Styles.input}
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event) => change({event,id,blur:true})}
                            onChange={(event) => change({event,id,blur:false})}
                        />
                        { showError() }
                    </div>
                )
                break;
                
               case('teamSelector'):
                    formTemplate = (
                        <div>
                            <select 
                                value={formdata.value}  
                                name={formdata.config.name}
                                onChange={(event) => change({event, id, blur: false})}
                                onBlur={(event) => change({event, id, blur:true})}
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

    return(
        <div>
            {renderTemplate()}
        </div>
    )

}

export default FormFields;