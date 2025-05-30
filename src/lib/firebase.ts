// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXPzQLjBTZ6e0iLnVVKCw8s1zIEeWbyMQ",
  authDomain: "alpiot-a0c3a.firebaseapp.com",
  projectId: "alpiot-a0c3a",
  storageBucket: "alpiot-a0c3a.firebasestorage.app",
  messagingSenderId: "871006870400",
  appId: "1:871006870400:web:2955d4993f7696fc10bf65",
  measurementId: "G-EJX7QKZ50M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export { app, analytics };