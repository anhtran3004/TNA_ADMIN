// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyByuR1Pw_Dz7AQEHH8X_bOmmfzCVaD8HRU",
    authDomain: "upload-file-b8564.firebaseapp.com",
    projectId: "upload-file-b8564",
    storageBucket: "upload-file-b8564.appspot.com",
    messagingSenderId: "92764484094",
    appId: "1:92764484094:web:bd220baddd9fd35445d0af",
    measurementId: "G-4J2PBST3DL"
};

const app = initializeApp(firebaseConfig);


export const storage = getStorage();