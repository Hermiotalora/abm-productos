import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyBhTO_HwXCpsmULxJdZf1-qdN1KejhZ2S8",

    authDomain: "productos-672c7.firebaseapp.com",

    projectId: "productos-672c7",

    storageBucket: "productos-672c7.firebasestorage.app",

    messagingSenderId: "669993062644",

    appId: "1:669993062644:web:94e22b87517c985efe8ea1",

    measurementId: "G-44PHGDDSKD"

    };


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);