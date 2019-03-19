import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Initialize Firebase CHANGE TO YOUR KEYS
var config = {
    apiKey: "AIzaSyBZ9yT2ieAB3LJHRK5B5twSYAJepTfjJ3E",
    authDomain: "quick-notes-31168.firebaseapp.com",
    databaseURL: "https://quick-notes-31168.firebaseio.com",
    projectId: "quick-notes-31168",
    storageBucket: "quick-notes-31168.appspot.com",
    messagingSenderId: "747931419517"
  };

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });
export default firebaseApp.firestore();
