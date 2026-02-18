// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../Firebase/firebase.config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Register
  const registerUser = async (name, email, password, avatar) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // update display name & photo
    await updateProfile(result.user, {
      displayName: name,
      photoURL: avatar,
    });

    return result.user;
  };

  // 🔥 Login
  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // 🔥 Google Login
  const googleLogin = () => signInWithPopup(auth, googleProvider);

  // 🔥 Logout
  const logoutUser = () => signOut(auth);

  // 🔥 Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        registerUser,
        loginUser,
        googleLogin,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
