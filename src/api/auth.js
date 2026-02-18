// import axios from "axios";
// const API = "http://localhost:5000";

// // Register
// export const registerUser = async ({ name, email, password, role }) => {
//   const res = await axios.post(`${API}/register`, {
//     name,
//     email,
//     password,
//     role
//   });

//   localStorage.setItem("token", res.data.token);
//   localStorage.setItem("user", JSON.stringify(res.data.user));

//   return res.data.user;
// };

// // Login
// export const loginUser = async ({ email, password }) => {
//   const res = await axios.post(`${API}/login`, { email, password });

//   localStorage.setItem("token", res.data.token);
//   localStorage.setItem("user", JSON.stringify(res.data.user));

//   return res.data.user;
// };


// export const getUser = () => {
//   const user = localStorage.getItem("user");
//   return user ? JSON.parse(user) : null;
// };

import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../Firebase/firebase.config";

const API = "http://localhost:5000";

// Register
export const registerUser = async ({ name, email, password, role }) => {
  const res = await axios.post(`${API}/register`, {
    name,
    email,
    password,
    role,
  });

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data.user;
};

// Login
export const loginUser = async ({ email, password }) => {
  const res = await axios.post(`${API}/login`, { email, password });

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data.user;
};

// ✅ Google Login (NEW CLEAN VERSION)
export const googleLogin = async () => {
  // Firebase popup
  const result = await signInWithPopup(auth, googleProvider);

  const googleUser = {
    name: result.user.displayName,
    email: result.user.email,
    avatar: result.user.photoURL,
  };

  // backend এ পাঠাও
  const res = await axios.post(`${API}/google-login`, googleUser);

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data.user;
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

