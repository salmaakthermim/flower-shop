// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZ_zIcRlLWF6r1bZ9GxsJsxU1Jo_UHbOM",
  authDomain: "flower-shop-fddc2.firebaseapp.com",
  projectId: "flower-shop-fddc2",
  storageBucket: "flower-shop-fddc2.firebasestorage.app",
  messagingSenderId: "809509240157",
  appId: "1:809509240157:web:e36cdc8fcde8ef2ae0fcb4",
  measurementId: "G-V5J3Z538JM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);