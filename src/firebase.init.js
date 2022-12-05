// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEhD8JPbV2O2ULXQsq0JbXFmcLRtiDBcI",
    authDomain: "syntax-solution-26bed.firebaseapp.com",
    projectId: "syntax-solution-26bed",
    storageBucket: "syntax-solution-26bed.appspot.com",
    messagingSenderId: "804526062302",
    appId: "1:804526062302:web:150845f7982f442ace204f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;