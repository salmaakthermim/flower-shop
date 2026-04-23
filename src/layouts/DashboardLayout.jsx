import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import {
  FaBars, FaTimes, FaHome, FaUser, FaSignOutAlt,
  FaPlusCircle, FaBoxOpen, FaClipboardList, FaUsers,
  FaShoppingBag, FaShoppingCart, FaLeaf
} from "react-icons/fa";

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

  const adminLinks = [
    { to: "/dashboard/admin", label: "Overview", icon: <FaHome size={14} />, end: true },
    { to: "/dashboard/admin/add-flower", label: "Add Flower", icon: <FaPlusCircle size={14} /> },
    { to: "/dashboard/admin/manage-flowers", label: "Manage Flowers", icon: <FaBoxOpen size={14} /> },
    { to: "/dashboard/admin/all-orders", label: "All Orders", icon: <FaClipboardList size={14} /> },
    { to: "/dashboard/admin/manage-users", label: "Manage Users", icon: <FaUsers size={14} /> },
  ];

  const customerLinks = [
    { to: "/dashboard/customer", label: "Overview", icon: <FaHome size={14} />, end: true },
    { to: "/dashboard/customer/my-orders", label: "My Orders", icon: <FaShoppingBag size={14} /> },
    { to: "/dashboard/customer/my-cards", label: "My Cart", icon: <FaShoppingCart size={14} /> },
  ];

  const links = role === "admin" ? adminLinks : role === "customer" ? customerLinks : [];

  return (
    <div className="min-h-screen flex bg-[#f0f7f2]">

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-[#2d5a3d] text-white px-5 py-4 flex justify-between items-center z-40 shadow-md">
        <div className="flex items-center gap-2">
          <FaLeaf className="text-[#e8a0b4]" />
          <span className="font-serif text-lg tracking-wide">Fiorello</span>
        </div>
        <button onClick={() => setIsOpen(true)}><FaBars size={20} /></button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static top-0 left-0 h-full w-64 bg-[#1a2e1a] flex flex-col z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="px-6 py-7 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-serif text-xl tracking-widest text-white">FIORELLO</p>
              <p className="text-[9px] tracking-[0.3em] text-[#e8a0b4] uppercase mt-0.5">
                {role} Panel
              </p>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-white/60 hover:text-white">
              <FaTimes size={18} />
            </button>
          </div>
        </div>

        {/* User info */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            {user?.avatar ? (
              <img src={user.avatar} className="w-9 h-9 rounded-full object-cover ring-2 ring-[#e8a0b4]" alt="avatar" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#2d5a3d] flex items-center justify-center text-[#e8a0b4] font-serif text-sm">
                {(user?.name || user?.email || "U")[0].toUpperCase()}
              </div>
            )}
            <div className="overflow-hidden">
              <p className="text-white text-sm font-medium truncate">{user?.name || "User"}</p>
              <p className="text-white/40 text-[10px] truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
          {links.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-[11px] tracking-widest uppercase font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#2d5a3d] text-white"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <span className="flex-shrink-0">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom links */}
        <div className="px-4 py-5 border-t border-white/10 space-y-1">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[11px] tracking-widest uppercase font-medium text-white/50 hover:text-white hover:bg-white/5 transition"
          >
            <FaHome size={14} /> Home
          </NavLink>
          <NavLink
            to="/dashboard/profile"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-[11px] tracking-widest uppercase font-medium transition ${
                isActive ? "bg-[#2d5a3d] text-white" : "text-white/50 hover:text-white hover:bg-white/5"
              }`
            }
          >
            <FaUser size={14} /> Profile
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[11px] tracking-widest uppercase font-medium text-[#e8a0b4] hover:bg-[#e8a0b4]/10 transition"
          >
            <FaSignOutAlt size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto mt-14 lg:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
