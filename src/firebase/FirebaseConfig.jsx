// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbDi2IECyGZLrXVjxHO1Iy7QgeeSIEWPw",
  authDomain: "ekart-ee343.firebaseapp.com",
  projectId: "ekart-ee343",
  storageBucket: "ekart-ee343.firebasestorage.app",
  messagingSenderId: "100392246741",
  appId: "1:100392246741:web:648684d0a9d72ec4f0715c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { auth, fireDB };
