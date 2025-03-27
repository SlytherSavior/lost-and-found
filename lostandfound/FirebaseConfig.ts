// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPFhcYgKNFBjADhJmDyr-HoSAf_mTh_tQ",
    authDomain: "lost-and-found-2a8f6.firebaseapp.com",
    projectId: "lost-and-found-2a8f6",
    storageBucket: "lost-and-found-2a8f6.firebasestorage.app",
    messagingSenderId: "601167392270",
    appId: "1:601167392270:web:294a663d87a3edc76c165f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
