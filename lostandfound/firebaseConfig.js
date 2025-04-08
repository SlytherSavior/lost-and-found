import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";


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
const dataList = async () => {
    const collectionRef = collection(db, "Data");
    const collectionSnap = await getDocs(collectionRef);
    return collectionSnap;
};


export { dataList };