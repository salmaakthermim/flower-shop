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

// dashboard common
import DashboardHome from "../components/pages/Dashboard/DashboardHome";
import Profile from "../components/pages/Dashboard/Profile";

// role dashboards
import AdminDashboard from "../components/pages/Dashboard/AdminDashboard/AdminDashboard";
import CustomerDashboard from "../components/pages/Dashboard/CustomerDashboard/CustomerDashboard";
import GuestDashboard from "../components/pages/Dashboard/GuestDashboard/GuestDashboard";

// admin pages
import AddFlower from "../components/pages/Dashboard/AdminDashboard/AddFlower";
import ManageFlowers from "../components/pages/Dashboard/AdminDashboard/ManageFlowers";

// routes
import PrivateRoute from "../routes/PrivateRoute";
import AllOrders from "../components/pages/Dashboard/AdminDashboard/AllOrders";
import ManageUsers from "../components/pages/Dashboard/AdminDashboard/ManageUsers";
import OrderSuccess from "../components/OrderSuccess";
import MyOrders from "../components/pages/Dashboard/CustomerDashboard/MyOrders";
import MyCard from "../components/pages/Dashboard/CustomerDashboard/MyCard";
import FlowerDetails from "../components/FlowerDetails";

/* ==============================
   Role Helper
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
  // ================= PUBLIC =================
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "contacts", element: <ContactsHome /> },
      { path: "about", element: <AboutHome /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "order-success/:id", element: <OrderSuccess /> },
      {path:"/flower/:id", element: <FlowerDetails /> }

    ],
  },

  // ================= DASHBOARD =================
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // /dashboard
      { index: true, element: <DashboardRedirect /> },

      // common
      { path: "profile", element: <Profile /> },

      // ---------- ADMIN ----------
      {
        path: "admin",
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "add-flower", element: <AddFlower /> },
          { path: "manage-flowers", element: <ManageFlowers /> },
          { path: "all-orders", element: <AllOrders></AllOrders> },
          { path: "manage-users", element: <ManageUsers /> },
        ],
      },

      // ---------- CUSTOMER ----------
      {
        path: "customer",
        children: [
          { index: true, element: <CustomerDashboard /> },
          { path: "my-orders", element: <MyOrders /> },
          { path: "my-cards", element: <MyCard></MyCard> },
        ],
      },

      // ---------- GUEST ----------
      { path: "guest", element: <GuestDashboard /> },
    ],
  },
]);

export default router;
