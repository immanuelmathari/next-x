// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "next-x-ce2de.firebaseapp.com",
  projectId: "next-x-ce2de",
  storageBucket: "next-x-ce2de.appspot.com",
  messagingSenderId: "202287652986",
  appId: "1:202287652986:web:93eb1e560f3db8acd3dbc3",
  measurementId: "G-25YEQPQ5M1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);