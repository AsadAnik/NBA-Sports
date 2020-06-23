import React, { Component } from 'react';
import FormField from './formFields';
import Loading from '../Widgets/Loading/loading';
import Styles from './dashboard.module.css';
import { teamsDatabase } from '../../Firebase';

///Imported Elements for Special_Words_Editor...
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';


class Dashboard extends Component {
    ///The State for this POSTing System...
    state = {///State..
        editorState: EditorState.createEmpty(),
        postError: '',
        loading: false,

        formdata: {
            author: {
                element: 'input',
                value: '',
                config: {
                    name: 'author_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            title: {
                element: 'input',
                value: '',
                config: {
                    name: 'title_input',
                    type: 'text',
                    placeholder: 'Enter the title'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            body: {
                element: 'texteditor',
                value: '',
                valid: true
            },
            teams: {
                element: 'teamSelector',
                value: '',
                valid: true,
                config: {
                    name: 'select_team',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    ///The React LIfeCycle method... 
    componentDidMount() {
        this.teamFetched()
    }

    //To fetching the data from teams database..
    teamFetched = () => {
        teamsDatabase.once('value')
            .then(snapShotData => {
                let newTeamsData = [];

                snapShotData.forEach(snapTeams => {
                    newTeamsData.push({
                        id: snapTeams.val().teamId,
                        city: snapTeams.val().city
                    })
                })

                //Now create new state and put into the set state for old state..
                const formDataState = { ...this.state.formdata };
                const newDataState = { ...formDataState['teams'] };
                newDataState.config.options = newTeamsData;
                formDataState['teams'] = newDataState;

                //Set the state with new state again..
                this.setState({
                    formdata: formDataState
                })
                // console.log(this.state.formdata.teams)
            })
            .catch(error => console.log('Team Selector on POST in dashboard route --- ', error))
    }


    ///onChange methods Handler another method... 
    updateForm = (element, content = '') => {
        const newFormdata = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormdata[element.id]
        }

        //Condition for Special_Word_Editor..
        if (content === '') {
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content;
        }

        if (element.blur) {
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
        }
        newElement.touched = element.blur;
        newFormdata[element.id] = newElement;

        //lets set the state..
        this.setState({
            formdata: newFormdata
        })
    }

    ///Simple Validation method..
    validate = (element) => {
        let error = [true, ''];

        if (element.validation.required) {
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is required' : ''}`;
            error = !valid ? [valid, message] : error
        }

        return error;
    }

    ///The Submit method for POST form submit..
    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value
        }
        for (let key in this.state.formdata) {
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }


        if (formIsValid) {
            console.log(dataToSubmit)
        }
    }

    ///Submit Button for make POST of this form...
    submitButton = () => (
        this.state.loading ?
            <Loading />
            :
            <div>
                <button className={Styles.btn} type="submit"> Add Post </button>
            </div>
    )

    ///Show Errors Method..
    showError = () => (
        this.state.postError !== '' ?
            <div className={Styles.label_message}>{this.state.postError}</div>
            : ''
    )

    ///The Editors Method.... 
    onEditorStateChange = (editorState) => {
        let contentState = editorState.getCurrentContent();
        // let rawState = convertToRaw(contentState)
        let html = stateToHTML(contentState)

        //Called Function for setting the Value...  
        this.updateForm({ id: 'body' }, html)

        //Set the Event on to state...  
        this.setState({
            editorState,
        })
    }

    ///The Rendaring method...
    render() {
        return (///Return Statement....
            <div className={Styles.postForm}>
                <form onSubmit={this.submitForm}>
                    <h2>Add Post</h2>

                    <div className={Styles.mainLayer}>
                        <FormField
                            id={'author'}
                            formdata={this.state.formdata.author}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField
                            id={'title'}
                            formdata={this.state.formdata.title}
                            change={(element) => this.updateForm(element)}
                        />

                        <Editor
                            editorState={this.state.editorState}
                            wrapperClassName="myEditor-wrapper"
                            editorClassName="myEditor-editor"
                            onEditorStateChange={this.onEditorStateChange}
                        />

                        <FormField 
                            id={'teams'}
                            formdata={this.state.formdata.teams}
                            change={(element) => this.updateForm(element)}
                        />

                        {this.submitButton()}
                        {this.showError()}
                    </div>
                </form>
            </div>
        )
    }
}

export default Dashboard;