import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZ_zIcRlLWF6r1bZ9GxsJsxU1Jo_UHbOM",
  authDomain: "flower-shop-fddc2.firebaseapp.com",
  projectId: "flower-shop-fddc2",
  storageBucket: "flower-shop-fddc2.firebasestorage.app",
  messagingSenderId: "809509240157",
  appId: "1:809509240157:web:e36cdc8fcde8ef2ae0fcb4",
  measurementId: "G-V5J3Z538JM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();