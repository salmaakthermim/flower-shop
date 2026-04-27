import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../Firebase/firebase.config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Load user from localStorage on mount ──
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      try {
        const parsed = JSON.parse(savedUser);
        // merge role from localStorage in case it's stored separately
        const role = parsed.role || localStorage.getItem("role") || "customer";
        setUser({ ...parsed, role });
      } catch { /* ignore */ }
    }

    const unsubscribe = onAuthStateChanged(auth, () => {
      setLoading(false);
    });

    setLoading(false);
    return () => unsubscribe();
  }, []);

  // ── Server-based login (email/password) ──
  const loginUser = async (email, password) => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Login failed");
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("role", data.user.role);
    setUser(data.user);
    return data.user;
  };

  // ── Server-based register ──
  const registerUser = async (name, email, password, role = "customer") => {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Registration failed");
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("role", data.user.role);
    setUser(data.user);
    return data.user;
  };

  // ── Google login (Firebase + server) ──
  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);

    const googleUser = {
      name: result.user.displayName,
      email: result.user.email,
      avatar: result.user.photoURL,
    };

    const res = await fetch("http://localhost:5000/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(googleUser),
    });

    if (!res.ok) throw new Error("Google login failed");

    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("role", data.user.role);
    setUser(data.user);
    return data.user;
  };

  // ── Logout ──
  const logoutUser = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUser(null);
    try { await signOut(auth); } catch { /* ignore */ }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, registerUser, googleLogin, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
