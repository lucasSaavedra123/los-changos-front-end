// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "walletify-4b649.firebaseapp.com",
  projectId: "walletify-4b649",
  storageBucket: "walletify-4b649.appspot.com",
  messagingSenderId: "65591774145",
  appId: "1:65591774145:web:d15ddffde6c0cfc8ac7d40",
  measurementId: "G-N10D5DTRJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
