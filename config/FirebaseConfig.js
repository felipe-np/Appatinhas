// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "appatinhas-a0e5a.firebaseapp.com",
  projectId: "appatinhas-a0e5a",
  storageBucket: "appatinhas-a0e5a.appspot.com",
  messagingSenderId: "949508968610",
  appId: "1:949508968610:web:d3a3911ab9756e099dc7fb",
  measurementId: "G-XNSKD5X0W0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const storage=getStorage(app);
// const analytics = getAnalytics(app);