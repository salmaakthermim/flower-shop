import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
 
  signInWithEmailAndPassword,
 
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth , } from "../Firebase/firebase.config";
// import { auth, googleProvider } from "../firebase.config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const googleLogin = () => signInWithPopup(auth );

  const logoutUser = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{ registerUser, loginUser, googleLogin, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
