
import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../Firebase/firebase.config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // ✅ FIXED GOOGLE LOGIN
  const googleLogin = () =>
    signInWithPopup(auth, googleProvider);

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
