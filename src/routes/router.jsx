import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import App from "../App";
import Contacts from "../components/pages/Contacts";
import Home from "../layouts/HomeLayout/Home";
import ContactsHome from "../components/pages/ContactsHome/ContactsHome";
import AboutHome from "../components/About/AboutHome";
import Login from "../components/pages/Login/login";
import Register from "../components/pages/Register/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/contacts",
        element: <ContactsHome></ContactsHome>,
      },
      {
        path: "/about",
        element: <AboutHome></AboutHome>,
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
