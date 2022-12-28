// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

import env from "../../.env";

// Initialize Firebase
const app = initializeApp(env.FIREBASE);

const auth = getAuth(app);

export {
    auth
}