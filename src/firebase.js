// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "real-estate-add71.firebaseapp.com",
  projectId: "real-estate-add71",
  storageBucket: "real-estate-add71.firebasestorage.app",
  messagingSenderId: "671319979349",
  appId: "1:671319979349:web:81c93f9603b0d5d606abdc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);