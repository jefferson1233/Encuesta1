// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBfMZjRMjQCPCLMZ8khIhqSDnHHzY6jgiA",
    authDomain: "iesstupse.firebaseapp.com",
    projectId: "iesstupse",
    storageBucket: "iesstupse.firebasestorage.app",
    messagingSenderId: "1032590085456",
    appId: "1:1032590085456:web:eea1a1fd9ab1629048b055",
    measurementId: "G-80CFFK5R98"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
