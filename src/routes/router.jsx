import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../layouts/HomeLayout/Home";
import ContactsHome from "../components/pages/ContactsHome/ContactsHome";
import AboutHome from "../components/About/AboutHome";
import Login from "../components/pages/Login/login";
import Register from "../components/pages/Register/register";
import DashboardLayout from "../layouts/DashboardLayout";
// import DashboardHome from "../pages/Dashboard/DashboardHome";
// import Profile from "../pages/Dashboard/Profile";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardHome from "../components/pages/Dashboard/DashboardHome";
import Profile from "../components/pages/Dashboard/Profile";

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
      { index: true, element: <DashboardHome /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

export default router;
