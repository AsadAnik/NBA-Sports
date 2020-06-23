import React, { Component } from 'react';
import FileUploader from 'react-firebase-file-uploader';
import { firebase } from '../../../Firebase';
import Styles from './FileUploader.module.css';

class Uploader extends Component {
    ///State for FileUPload System..
    state = {
        name: '',
        isUploading: false,
        progress: 0,
        fileURL: ''
    }

    //onUploadStart method..
    handleUploadStart = () => {
        this.setState({
            isUploading: true,
            progress: 0,
        })
    }

    //onUploadError method...
    handleUploadError = () => {
        this.setState({ isUploading: false })
        console.log('get ERROR! when get ready to upload post image file ----')
    }

    //onUploadSuccess method..
    handleUploadSuccess = (filename) => {
        this.setState({
            name: filename,
            progress: 100,
        })

        ///Get link form firebase, when its done with uploading..
        firebase.storage().ref('images').child(filename).getDownloadURL()
            .then(url => {
                this.setState({ fileURL: url, isUploading: false })
            })

        //Passing the filename for props function..
        this.props.fileName(filename);
    }

    //onProgress method..
    handleProgress = (progress) => {
        this.setState({ progress })
    }

    ///The Render Method to Rendaring the template..
    render() {//Rendaring Method...
        return (
            <div className={Styles.FileUploader}>
                <FileUploader
                    accept="image/*"
                    name="image"
                    storageRef={firebase.storage().ref('images')}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                />

                {///The Progess Counting showing when file uploading..
                    this.state.isUploading ?
                    <div className={Styles.progress}>
                        <span>{`${this.state.progress}%`}</span>
                    </div>
                    :
                    null
                }
                {///Showing the Image file after uploaded done...
                    this.state.fileURL ? 
                    <img 
                        className={Styles.imageFile} 
                        src={this.state.fileURL} 
                        alt={'Not Founded!'} 
                    />
                    :
                    null
                }
            </div>
        )
    }
}

export default Uploader;