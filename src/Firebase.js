///Database Of this project..
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBnhFyz-GT4IQvLBL_ppXxPOPJ_2M76tTM",
  authDomain: "nba-sports.firebaseapp.com",
  databaseURL: "https://nba-sports.firebaseio.com",
  projectId: "nba-sports",
  storageBucket: "nba-sports.appspot.com",
  messagingSenderId: "852759642602",
  appId: "1:852759642602:web:e44176233bc95ba03db293",
  measurementId: "G-PSRNKLELB1"
};

//maked configure the firebase inner of project.. 
firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();

//take datebase for use..
const articlesDatabase = firebaseDB.ref('articles');
const teamsDatabase = firebaseDB.ref('teams');
const videosDatabase = firebaseDB.ref('videos');

///For Reuseable function for applications components..
  function firebaseLooper(data){
      let newData = [];

      data.forEach(snapData => {
          newData.push({
            ...snapData.val(),
            id: snapData.key
          })
      })

      return newData;
  }

export {
  firebase,
  firebaseDB,
  articlesDatabase,
  teamsDatabase,
  videosDatabase,
  firebaseLooper,
}