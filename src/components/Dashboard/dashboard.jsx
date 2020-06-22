import React, { Component } from 'react';
import Input from './formFields';
import Styles from './dashboard.module.css';

///using the draft-js and the word editor with react-draft-wysiwyg..
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ConvertFromRaw, ConvertToRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

class Dashboard extends Component {
    ///Application state for this posting way solved..
    state = {
        editorState: EditorState.createEmpty(),
        loading: false,

        formData: {
            author: {
                elements: 'input',
                label: true,
                labelText: 'Your Name',
                value: '',

                config: {
                    name: 'author',
                    type: 'text',
                    placeholder: 'Whats your name..'
                },

                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            title: {
                elements: 'input',
                label: true,
                labelText: 'Title',
                value: '',

                config: {
                    name: 'title',
                    type: 'text',
                    placeholder: 'Write title..'
                },

                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
        }
    }

    //the change function for when using keys inner of the input bar then use the value..
    changeFunc = (newData) => {
        this.setState({
            ...this.state.formData,
            newData,
        })

        console.log('NewStateData -->> ', this.state.formData)
    }

    //Showing the label innne of this fields of label when says true..
    showLabel = (labelType) => (
        labelType.label ?
            <div className={Styles.label}>
                <span>{labelType.labelText}</span>
            </div>
            :
            null
    )

    ///Showing the Error messages for posting fields.... 
    showError = (fieldMessage) => {
        let showMessage = null;

        fieldMessage.validation.required && !fieldMessage.valid ?
            showMessage = (
                <div className={Styles.label_message}>
                    <span>{fieldMessage.validationMessage}</span>
                </div>
            )
            :
            showMessage = null

        return showMessage;
    }

    //The method for submitting the form with click post button..
    submitForm = (event) => {
        event.preventDefault();

        let userValues = {};
        let validForm = true;

        for(let i in this.state.formData){
            userValues[i] = this.state.formData[i].value;
        }

        for(let j in this.state.formData){
            validForm = this.state.formData[j].valid && validForm;
        }

        if (validForm) {
            alert('POSTED!!!')
            console.log(userValues)
        }
    }

    ///The Editors Method...
    onEditorStateChange = (editorState) => {

        let contentState = editorState.getCurrentContent();
        let rawState = convertToRaw(contentState);
        let html = stateToHTML(contentState);

        console.log(html)

        this.setState({
            editorState,
        })
    }


    //The rendering method of this app posting site...
    render() {
        return (//Returning Statement...
            <form className={Styles.postForm} onSubmit={(event) => this.submitForm(event)}>
                <h2>Add Post</h2>
                <div className={Styles.mainLayer}>
                    {this.showLabel(this.state.formData.author)}
                    <Input
                        className={Styles.input}
                        formData={this.state.formData.author}
                        change={(newData) => this.changeFunc(newData)}
                    />
                    {this.showError(this.state.formData.author)}

                    {this.showLabel(this.state.formData.title)}
                    <Input
                        className={Styles.input}
                        formData={this.state.formData.title}
                        change={(newData) => this.changeFunc(newData)}
                    />
                    {this.showError(this.state.formData.title)}

                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="myEditorWrapper"
                        editorClassName="editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />

                    <button type="submit">post</button>
                </div>
            </form>
        )
    }
}

export default Dashboard;