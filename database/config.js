
import * as firebase from 'firebase'
import '@firebase/auth';
import '@firebase/firestore';

 const  firebaseConfig = {
    apiKey: "AIzaSyBCBqf62UVckm2Sis_7r-lPjq6YqjtbZNk",
    authDomain: "react-native-test-86a78.firebaseapp.com",
    databaseURL: "https://react-native-test-86a78.firebaseio.com",
    projectId: "react-native-test-86a78",
    storageBucket: "react-native-test-86a78.appspot.com",
    messagingSenderId: "1058902179439",
    appId: "1:1058902179439:web:46d2c5ce123f4ea2b0979a",
    measurementId: "G-58W9GMW0H5"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);

}

export {firebase}