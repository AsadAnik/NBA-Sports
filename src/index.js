import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Auth User from Firebase..
import { firebase } from './Firebase';

///To checking user is valid or not after dig into the application routes..
firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(
    <React.StrictMode>
      <App user={user} />
    </React.StrictMode>,
    document.getElementById('root')
  );
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
