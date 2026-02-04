import { createBrowserRouter, Navigate } from "react-router-dom";

// layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// public pages
import Home from "../layouts/HomeLayout/Home";
import ContactsHome from "../components/pages/ContactsHome/ContactsHome";
import AboutHome from "../components/About/AboutHome";
import Login from "../components/pages/Login/login";
import Register from "../components/pages/Register/register";

// dashboard pages
import DashboardHome from "../components/pages/Dashboard/DashboardHome";
import Profile from "../components/pages/Dashboard/Profile";

import AdminDashboard from "../components/pages/Dashboard/AdminDashboard/AdminDashboard";
import CustomerDashboard from "../components/pages/Dashboard/CustomerDashboard/CustomerDashboard";
import GuestDashboard from "../components/pages/Dashboard/GuestDashboard/GuestDashboard";

// new: AddFlower page
// import AddFlower from "../components/admin/AddFlower";

// routes
import PrivateRoute from "../routes/PrivateRoute";
import AddFlower from "../components/pages/Dashboard/AdminDashboard/AddFlower";

/* ==============================
   Role Helper & Redirect
================================ */
const getRole = () => {
  return localStorage.getItem("role") || "guest";
};

const DashboardRedirect = () => {
  const role = getRole();

  if (role === "admin") return <Navigate to="/dashboard/admin" replace />;
  if (role === "customer") return <Navigate to="/dashboard/customer" replace />;
  return <Navigate to="/dashboard/guest" replace />;
};

/* ==============================
   Router
================================ */
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "contacts", element: <ContactsHome /> },
      { path: "about", element: <AboutHome /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // /dashboard → role অনুযায়ী redirect
      { index: true, element: <DashboardRedirect /> },

      // common
      { path: "profile", element: <Profile /> },

      // role based dashboards
      { path: "admin", element: <AdminDashboard /> },
      { path: "admin/add-flower", element: <AddFlower /> }, // ✅ Add Flower route
      { path: "customer", element: <CustomerDashboard /> },
      { path: "guest", element: <GuestDashboard /> },
    ],
  },
]);

export default router;
