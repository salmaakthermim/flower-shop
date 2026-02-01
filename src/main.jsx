import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Toaster position="top-right" reverseOrder={false} />
    <AuthProvider>
    <RouterProvider router={router} />
    {/* <App></App> */}
    </AuthProvider>
  </React.StrictMode>
);
