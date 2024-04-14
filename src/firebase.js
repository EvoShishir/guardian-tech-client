// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYae4qLIR3zUn8eDTtrQyUWrRPCIdX9ec",
  authDomain: "guardiantech-9a122.firebaseapp.com",
  projectId: "guardiantech-9a122",
  storageBucket: "guardiantech-9a122.appspot.com",
  messagingSenderId: "1077746139772",
  appId: "1:1077746139772:web:61c1cebc3d27df79917ff9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
