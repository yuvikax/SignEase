// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA63eh5Aj3Tc-Cd8VxlwkcUBtI6zz_xWw0",
  authDomain: "signease-23fae.firebaseapp.com",
  projectId: "signease-23fae",
  storageBucket: "signease-23fae.appspot.com",
  messagingSenderId: "484734156218",
  appId: "1:484734156218:web:b4915ec3e8fab3aabe3183"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
