import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const DashboardLayout = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const role = user?.role || localStorage.getItem("role");

  const handleLogout = async () => {
    await logoutUser?.();
    localStorage.removeItem("role");
    navigate("/login");
  };

  const linkClass =
    "block w-full py-2 px-3 rounded-lg hover:bg-pink-100 transition";

  return (
    <div className="min-h-screen h-50 flex bg-pink-50 relative">
      
      {/* ===== Mobile Top Bar ===== */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-40">
        <h2 className="text-lg font-bold text-pink-600">
          🌸 {role?.toUpperCase()} Panel
        </h2>
        <button onClick={() => setIsOpen(true)}>
          <FaBars size={22} />
        </button>
      </div>

      {/* ===== Overlay ===== */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ===== Sidebar ===== */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        {/* Close button (mobile) */}
        <div className="flex justify-between items-center mb-6 lg:hidden">
          <h2 className="text-xl font-bold text-pink-600">
            🌸 {role?.toUpperCase()}
          </h2>
          <button onClick={() => setIsOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="space-y-3 text-gray-700 flex-1">

          {/* ADMIN */}
          {role === "admin" && (
            <>
            <h1 className="text-2xl py-2 px-3 rounded-lg hover:bg-pink-100"> Admin Dashbord</h1>
              <NavLink to="/dashboard/admin/add-flower" className={linkClass}>
                🌼 Add Flower
              </NavLink>
              <NavLink to="/dashboard/admin/manage-flowers" className={linkClass}>
                📦 Manage Products
              </NavLink>
              <NavLink to="/dashboard/admin/all-orders" className={linkClass}>
                🛒 All Orders
              </NavLink>
              <NavLink to="/dashboard/admin/manage-users" className={linkClass}>
                👥 Manage Users
              </NavLink>
            </>
          )}

          {/* CUSTOMER */}
          {role === "customer" && (
            <>
            <h1> Customar Dashboard</h1>
              <NavLink to="/dashboard/customer/my-orders" className={linkClass}>
                🛍 My Orders
              </NavLink>
              <NavLink to="/dashboard/customer/my-cards" className={linkClass}>
                🛒 My Cart
              </NavLink>
            </>
          )}

          {/* GUEST */}
          {role === "guest" && (
            <NavLink to="/shop" className={linkClass}>
              🌸 Browse Flowers
            </NavLink>
          )}
        </nav>

        {/* Common Links */}
        <div className="mt-6">
          <NavLink to="/" end className={linkClass}>
            🏠 Home
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={`${linkClass} mt-3`}
          >
            👤 Profile
          </NavLink>

          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 p-6 lg:p-8 w-full mt-16 lg:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;