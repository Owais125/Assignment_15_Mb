// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBeWxUdDt4UCka4HgkApEyrwcbAvgfz0so",
    authDomain: "messaging-app-d6be0.firebaseapp.com",
    databaseURL: "https://messaging-app-d6be0-default-rtdb.firebaseio.com",
    projectId: "messaging-app-d6be0",
    storageBucket: "messaging-app-d6be0.appspot.com",
    messagingSenderId: "225163989521",
    appId: "1:225163989521:web:2be2cd714f8c57fd6997b0"
  };

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
const db = getDatabase(firebase_app);
const google_provider = new GoogleAuthProvider();
const auth = getAuth(firebase_app);


export {firebase_app,db,google_provider,auth}