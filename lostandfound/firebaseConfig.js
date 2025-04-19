import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);

// const dataList = async () => {
//     const collectionRef = collection(db, "Data");
//     const collectionSnap = await getDocs(collectionRef);
//     collectionSnap.forEach((doc) => {
//         const data = {
//             data: doc.data(),
//             id: doc.id
//         }
//         console.log(data)
//     })
//     return collectionSnap;
// };
const collectionRef = collection(db, "Data");
getDocs(collectionRef).then(response => {
    const list = response.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
    }))
    console.log(list);
})
// dataList()
