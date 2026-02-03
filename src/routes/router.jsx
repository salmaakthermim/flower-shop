// import { createBrowserRouter } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import Home from "../layouts/HomeLayout/Home";
// import ContactsHome from "../components/pages/ContactsHome/ContactsHome";
// import AboutHome from "../components/About/AboutHome";
// import Login from "../components/pages/Login/login";
// import Register from "../components/pages/Register/register";
// import DashboardLayout from "../layouts/DashboardLayout";
// // import DashboardHome from "../pages/Dashboard/DashboardHome";
// // import Profile from "../pages/Dashboard/Profile";
// import PrivateRoute from "../routes/PrivateRoute";
// import DashboardHome from "../components/pages/Dashboard/DashboardHome";
// import Profile from "../components/pages/Dashboard/Profile";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/contacts", element: <ContactsHome /> },
//       { path: "/about", element: <AboutHome /> },
//       { path: "/login", element: <Login /> },
//       { path: "/register", element: <Register /> },
//     ],
//   },
//   {
//     path: "/dashboard",
//     element: (
//       <PrivateRoute>
//         <DashboardLayout />
//       </PrivateRoute>
//     ),
//     children: [
//       { index: true, element: <DashboardHome /> },
//       { path: "profile", element: <Profile /> },
//     ],
//   },
// ]);

// export default router;


// src/router/router.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../layouts/HomeLayout/Home";
import ContactsHome from "../components/pages/ContactsHome/ContactsHome";
import AboutHome from "../components/About/AboutHome";
import Login from "../components/pages/Login/login";
import Register from "../components/pages/Register/register";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../components/pages/Dashboard/DashboardHome";
import Profile from "../components/pages/Dashboard/Profile";
import PrivateRoute from "../routes/PrivateRoute";

// Role-based dashboard redirect
// import AdminDashboard from "../components/pages/Dashboard/AdminDashboard";
// import CustomerDashboard from "../components/pages/Dashboard/CustomerDashboard";
// import GuestDashboard from "../components/pages/Dashboard/GuestDashboard";
import AdminDashboard from "../components/pages/Dashboard/AdminDashboard/AdminDashboard";
import CustomerDashboard from "../components/pages/Dashboard/CustomerDashboard/CustomerDashboard";
import GuestDashboard from "../components/pages/Dashboard/GuestDashboard/GuestDashboard";

// Helper to get role from localStorage (or Firebase user metadata)
const getRole = () => {
  const role = localStorage.getItem("role"); // save role on login/register
  return role || "guest";
};

const DashboardRedirect = () => {
  const role = getRole();
  if (role === "admin") return <Navigate to="/dashboard/admin" replace />;
  if (role === "customer") return <Navigate to="/dashboard/customer" replace />;
  return <Navigate to="/dashboard/guest" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/contacts", element: <ContactsHome /> },
      { path: "/about", element: <AboutHome /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
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
      { index: true, element: <DashboardRedirect /> },
      { path: "profile", element: <Profile /> },
      { path: "admin", element: <AdminDashboard /> },
      { path: "customer", element: <CustomerDashboard /> },
      { path: "guest", element: <GuestDashboard /> },
    ],
  },
]);

export default router;

