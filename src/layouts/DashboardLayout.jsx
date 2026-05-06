import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import {
  FaBars, FaTimes, FaHome, FaUser, FaSignOutAlt,
  FaPlusCircle, FaBoxOpen, FaClipboardList, FaUsers,
  FaShoppingBag, FaShoppingCart, FaLeaf, FaSearch,
  FaHeart, FaInfoCircle, FaChevronRight
} from "react-icons/fa";

// ── Sidebar content extracted as a standalone component ──
const SidebarContent = ({ collapsed, setCollapsed, setIsOpen, links, role, user, handleLogout }) => {
  const avatarInitial = (user?.name || user?.email || "U")[0].toUpperCase();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`border-b border-white/10 transition-all duration-300 ${collapsed ? "px-3 py-5" : "px-6 py-6"}`}>
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <p className="font-serif text-xl tracking-widest text-white">FIORELLO</p>
              <p className="text-[9px] tracking-[0.3em] text-[#e8a0b4] uppercase mt-0.5 capitalize">{role} Panel</p>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-full bg-[#2d5a3d] flex items-center justify-center mx-auto">
              <FaLeaf className="text-[#e8a0b4]" size={13} />
            </div>
          )}
          <button
            onClick={() => setCollapsed(c => !c)}
            className="hidden lg:flex w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 items-center justify-center text-white/50 hover:text-white transition flex-shrink-0"
          >
            <FaChevronRight size={10} className={`transition-transform duration-300 ${collapsed ? "" : "rotate-180"}`} />
          </button>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-white/60 hover:text-white">
            <FaTimes size={18} />
          </button>
        </div>
      </div>

      {/* User info */}
      {!collapsed ? (
        <div className="px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            {user?.avatar ? (
              <img src={user.avatar} className="w-9 h-9 rounded-full object-cover ring-2 ring-[#e8a0b4] flex-shrink-0" alt="avatar" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#2d5a3d] flex items-center justify-center text-[#e8a0b4] font-serif text-sm flex-shrink-0">
                {avatarInitial}
              </div>
            )}
            <div className="overflow-hidden">
              <p className="text-white text-sm font-medium truncate">{user?.name || "User"}</p>
              <p className="text-white/40 text-[10px] truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-3 py-4 border-b border-white/10 flex justify-center">
          {user?.avatar ? (
            <img src={user.avatar} className="w-8 h-8 rounded-full object-cover ring-2 ring-[#e8a0b4]" alt="avatar" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#2d5a3d] flex items-center justify-center text-[#e8a0b4] font-serif text-xs">
              {avatarInitial}
            </div>
          )}
        </div>
      )}

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {links.map(({ to, label, icon, end }) => (
          <NavLink key={to} to={to} end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] tracking-widest uppercase font-medium transition-all duration-200 group ${
                isActive ? "bg-[#2d5a3d] text-white shadow-sm" : "text-white/50 hover:text-white hover:bg-white/5"
              } ${collapsed ? "justify-center" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`flex-shrink-0 transition-transform duration-200 ${!isActive ? "group-hover:scale-110" : ""}`}>{icon}</span>
                {!collapsed && <span className="truncate">{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 py-4 space-y-0.5 px-3">
        <NavLink to="/"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] tracking-widest uppercase font-medium text-white/50 hover:text-white hover:bg-white/5 transition ${collapsed ? "justify-center" : ""}`}>
          <FaHome size={14} />
          {!collapsed && "Home"}
        </NavLink>

        {role !== "guest" && (
          <NavLink to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] tracking-widest uppercase font-medium transition ${
                isActive ? "bg-[#2d5a3d] text-white" : "text-white/50 hover:text-white hover:bg-white/5"
              } ${collapsed ? "justify-center" : ""}`
            }>
            <FaUser size={14} />
            {!collapsed && "Profile"}
          </NavLink>
        )}

        {role === "guest" ? (
          !collapsed && (
            <div className="pt-2 space-y-2">
              <NavLink to="/register"
                className="flex items-center justify-center w-full px-3 py-2.5 rounded-xl text-[11px] tracking-widest uppercase font-medium bg-[#e8a0b4] text-white hover:bg-[#d4809a] transition">
                Register Free
              </NavLink>
              <NavLink to="/login"
                className="flex items-center justify-center w-full px-3 py-2.5 rounded-xl text-[11px] tracking-widest uppercase font-medium border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition">
                Login
              </NavLink>
            </div>
          )
        ) : (
          <button onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] tracking-widest uppercase font-medium text-[#e8a0b4] hover:bg-[#e8a0b4]/10 transition ${collapsed ? "justify-center" : ""}`}>
            <FaSignOutAlt size={14} />
            {!collapsed && "Logout"}
          </button>
        )}
      </div>
    </div>
  );
};

const DashboardLayout = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const role = user?.role || localStorage.getItem("role");

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logoutUser?.();
    localStorage.removeItem("role");
    navigate("/login");
  };

  const adminLinks = [
    { to: "/dashboard/admin",                label: "Overview",       icon: <FaHome size={15} />,        end: true },
    { to: "/dashboard/admin/add-flower",     label: "Add Flower",     icon: <FaPlusCircle size={15} /> },
    { to: "/dashboard/admin/manage-flowers", label: "Manage Flowers", icon: <FaBoxOpen size={15} /> },
    { to: "/dashboard/admin/all-orders",     label: "All Orders",     icon: <FaClipboardList size={15} /> },
    { to: "/dashboard/admin/manage-users",   label: "Manage Users",   icon: <FaUsers size={15} /> },
  ];

  const customerLinks = [
    { to: "/dashboard/customer",             label: "Overview",  icon: <FaHome size={15} />,        end: true },
    { to: "/dashboard/customer/my-orders",   label: "My Orders", icon: <FaShoppingBag size={15} /> },
    { to: "/dashboard/customer/my-cards",    label: "My Cart",   icon: <FaShoppingCart size={15} /> },
    { to: "/dashboard/customer/wishlist",    label: "Wishlist",  icon: <FaHeart size={15} /> },
  ];

  const guestLinks = [
    { to: "/dashboard/guest",               label: "Overview",       icon: <FaHome size={15} />,       end: true },
    { to: "/dashboard/guest/browse",        label: "Browse Flowers", icon: <FaSearch size={15} /> },
    { to: "/dashboard/guest/wishlist",      label: "Wishlist",       icon: <FaHeart size={15} /> },
    { to: "/dashboard/guest/about",         label: "About Us",       icon: <FaInfoCircle size={15} /> },
  ];

  const links = role === "admin" ? adminLinks : role === "customer" ? customerLinks : guestLinks;
  const avatarInitial = (user?.name || user?.email || "U")[0].toUpperCase();

  const sidebarProps = { collapsed, setCollapsed, setIsOpen, links, role, user, handleLogout };

  return (
    <div className="min-h-screen flex bg-[#f0f7f2]">

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col sticky top-0 h-screen bg-[#1a2e1a] flex-shrink-0 transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
        <SidebarContent {...sidebarProps} />
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Drawer */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-[#1a2e1a] flex flex-col z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <SidebarContent {...sidebarProps} />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-[#1a2e1a] text-white px-4 py-3.5 flex items-center justify-between shadow-md">
          <button onClick={() => setIsOpen(true)}
            className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
            <FaBars size={16} />
          </button>
          <div className="flex items-center gap-2">
            <FaLeaf className="text-[#e8a0b4]" size={13} />
            <span className="font-serif text-base tracking-widest">FIORELLO</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#2d5a3d] flex items-center justify-center text-[#e8a0b4] font-serif text-sm ring-2 ring-[#e8a0b4]/40 overflow-hidden">
            {user?.avatar
              ? <img src={user.avatar} className="w-full h-full object-cover" alt="avatar" />
              : avatarInitial
            }
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden sticky bottom-0 bg-white border-t border-[#e8f0ea] z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-around px-2 py-1">
            {links.slice(0, 4).map(({ to, label, icon, end }) => (
              <NavLink key={to} to={to} end={end}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 min-w-0 ${isActive ? "text-[#2d5a3d]" : "text-[#4a6a4a]"}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`transition-transform duration-200 ${isActive ? "scale-110" : ""}`}>{icon}</span>
                    <span className={`text-[9px] tracking-wide font-medium truncate max-w-[56px] text-center ${isActive ? "text-[#2d5a3d]" : "text-[#4a6a4a]"}`}>{label}</span>
                    {isActive && <span className="w-1 h-1 rounded-full bg-[#2d5a3d] mt-0.5" />}
                  </>
                )}
              </NavLink>
            ))}
            <button onClick={() => setIsOpen(true)}
              className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-[#4a6a4a] transition">
              <FaBars size={15} />
              <span className="text-[9px] tracking-wide font-medium">More</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default DashboardLayout;
