// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWEMd2YKKzUWa3Dth9wSBQFZMUxc2Wi5o",
  authDomain: "salaxer-1cea4.firebaseapp.com",
  projectId: "salaxer-1cea4",
  storageBucket: "salaxer-1cea4.appspot.com",
  messagingSenderId: "1097334377403",
  appId: "1:1097334377403:web:6ba64abc33a1a068d6d29e",
  measurementId: "G-CNLNE4HBKG"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);