// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPzuNyIslDdZwOFC5-qZXoCX6FIt86H5c",
  authDomain: "fir-firebase-1778a.firebaseapp.com",
  projectId: "fir-firebase-1778a",
  storageBucket: "fir-firebase-1778a.appspot.com",
  messagingSenderId: "460170356716",
  appId: "1:460170356716:web:ae8382b03a012a6e1742c9",
  measurementId: "G-7RJ98E1GSY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()