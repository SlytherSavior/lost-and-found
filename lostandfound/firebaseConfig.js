// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore"; //you have option for firebase/firestore/lite
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries





// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhv0mq3CZcRcJRvnt93LhdI6XomLxpEuk",
    authDomain: "lost-found-b2d66.firebaseapp.com",
    projectId: "lost-found-b2d66",
    storageBucket: "lost-found-b2d66.firebasestorage.app",
    messagingSenderId: "745297315548",
    appId: "1:745297315548:web:e2fc31d4c288ada5951619"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function readData() {
    const docRef = doc(db, "Data", "g8wZ4B6IPg9m3L0aw8cS");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        console.log("No such document!");
    }
}

readData(); //fixing firestore , so apprently it is working