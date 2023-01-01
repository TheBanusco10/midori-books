// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Initialize Firebase
const app = initializeApp({
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: "midori-books.firebaseapp.com",
    projectId: "midori-books",
    storageBucket: "midori-books.appspot.com",
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID
});

const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    db
}