// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS77Mj_AoeI77AkWE4TmGCpLVmcO5cL9c",
  authDomain: "dtech-c8e9e.firebaseapp.com",
  projectId: "dtech-c8e9e",
  storageBucket: "dtech-c8e9e.appspot.com",
  messagingSenderId: "859101234649",
  appId: "1:859101234649:web:ebfdd10ac1c217806205c8",
  measurementId: "G-7FNSXM6LNF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storageFB = getStorage(app);
