// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi-Wp7t75w3qIbQyDTFe2E0KM2bIpf-kk",
  authDomain: "travel-tracker-cae8e.firebaseapp.com",
  projectId: "travel-tracker-cae8e",
  storageBucket: "travel-tracker-cae8e.firebasestorage.app",
  messagingSenderId: "890437549816",
  appId: "1:890437549816:web:c82a90a852276da41d450d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

