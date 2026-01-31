import { Outlet } from "react-router-dom";
import Home from "./HomeLayout/Home";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
    <Navbar></Navbar>
      <Outlet />
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
