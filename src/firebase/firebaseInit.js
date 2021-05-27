import firebase from "firebase/app"
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCq876YQaECWyaZs10MwL3Fx6-NdoKJdN8",
    authDomain: "joker-s-blog.firebaseapp.com",
    projectId: "joker-s-blog",
    storageBucket: "joker-s-blog.appspot.com",
    messagingSenderId: "895712784593",
    appId: "1:895712784593:web:cf533d9f429d53602f95f0",
    measurementId: "G-WQS2B19MSK"
  };


// Initialize app
const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp }
export default firebaseApp.firestore();
