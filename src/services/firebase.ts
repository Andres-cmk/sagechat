import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCbiPQK49pPnTfJ4B3aKP8pVJszs5vxR0Y",
    authDomain: "chat-app-8a678.firebaseapp.com",
    projectId: "chat-app-8a678",
    storageBucket: "chat-app-8a678.firebasestorage.app",
    messagingSenderId: "73943992195",
    appId: "1:73943992195:web:37811fcb62321082cfd8b6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


export default app;


