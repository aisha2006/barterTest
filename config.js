import firebase from "firebase";
require('@firebase/firestore');

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAcwqG4esQRWdlKLG1avazP-1XmZ2qC1mU",
    authDomain: "barter-15d91.firebaseapp.com",
    projectId: "barter-15d91",
    storageBucket: "barter-15d91.appspot.com",
    messagingSenderId: "274417699167",
    appId: "1:274417699167:web:9abeaeb37649251f048eea"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

export default firebase.firestore();