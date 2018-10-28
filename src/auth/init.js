import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Initialize Firebase CHANGE TO YOUR KEYS
var config = {
    apiKey: "YOUR API KEY HERE",
    authDomain: "YOUR DOMAIN HERE",
    databaseURL: "SAME, GET FROM FIREBASE",
    projectId: "--||--",
    storageBucket: "--||--",
    messagingSenderId: "--||--"
  };

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });
export default firebaseApp.firestore();
