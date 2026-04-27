import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUserCircle, FaBars, FaTimes, FaShoppingBag } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutUser, loading } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) return null;

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/96 backdrop-blur-lg shadow-md"
          : "bg-white border-b border-[#e8f0ea]"
      }`}
    >
      {/* Top announcement bar */}
      <div className="bg-[#2d5a3d] text-white text-center py-2 text-[10px] tracking-[0.25em] uppercase">
        Free delivery on orders over $80 &nbsp;·&nbsp; Fresh flowers daily
      </div>

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col items-start leading-none group">
          <span className="text-[26px] font-serif tracking-[0.18em] text-[#2d5a3d] group-hover:text-[#e8a0b4] transition-colors duration-300">
            FIORELLO
          </span>
          <span className="text-[8px] tracking-[0.4em] text-[#e8a0b4] uppercase font-medium">
            Flower Studio
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 text-[11px] tracking-[0.18em] font-medium text-[#1a2e1a]">
          <NavItem to="/" text="HOME" />
          <NavItem to="/shop" text="SHOP" />
          <NavItem to="/contacts" text="CONTACTS" />
          <NavItem to="/about" text="ABOUT US" />
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-5">
          {user ? (
            <UserDropdown
              user={user}
              dropdown={dropdown}
              setDropdown={setDropdown}
              handleLogout={handleLogout}
            />
          ) : (
            <Link to="/login" className="btn-primary text-[10px] py-2.5 px-6">
              Login
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-xl text-[#2d5a3d]"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t border-[#e8f0ea] px-6 pb-6 pt-4 space-y-4 text-[11px] tracking-[0.2em] font-medium text-[#1a2e1a]">
          <NavItem to="/" text="HOME" />
          <NavItem to="/shop" text="SHOP" />
          <NavItem to="/contacts" text="CONTACTS" />
          <NavItem to="/about" text="ABOUT US" />
          {user ? (
            <>
              <Link to="/dashboard" className="block py-2" onClick={() => setMobileMenu(false)}>DASHBOARD</Link>
              <button onClick={handleLogout} className="block py-2 text-left w-full">LOGOUT</button>
            </>
          ) : (
            <Link to="/login" className="block py-2">LOGIN</Link>
          )}
        </div>
      )}
    </header>
  );
};

const NavItem = ({ to, text }) => (
  <Link to={to} className="nav-link block py-1 hover:text-[#2d5a3d] transition-colors">
    {text}
  </Link>
);

const UserDropdown = ({ user, dropdown, setDropdown, handleLogout }) => {
  const avatarSrc = user?.avatar || user?.photoURL || null;
  const initial = (user?.name || user?.email || "U")[0].toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setDropdown(!dropdown)}
        className="flex items-center gap-2 focus:outline-none"
      >
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt="avatar"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-[#e8a0b4] ring-offset-1"
            onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
          />
        ) : null}
        <div
          className="w-9 h-9 rounded-full bg-[#2d5a3d] flex items-center justify-center text-white font-serif text-sm ring-2 ring-[#e8a0b4] ring-offset-1"
          style={{ display: avatarSrc ? "none" : "flex" }}
        >
          {initial}
        </div>
      </button>

      {dropdown && (
        <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl border border-[#e8f0ea] py-2 z-50 rounded-xl">
          <div className="px-4 py-2 border-b border-[#e8f0ea] mb-1">
            <p className="text-xs font-medium text-[#1a2e1a] truncate">{user?.name || "User"}</p>
            <p className="text-[10px] text-[#4a6a4a] truncate">{user?.email}</p>
          </div>
          <Link to="/dashboard" className="block px-4 py-2.5 text-[11px] tracking-widest hover:bg-[#f0f7f2] hover:text-[#2d5a3d] transition">
            DASHBOARD
          </Link>
          <button onClick={handleLogout} className="block w-full text-left px-4 py-2.5 text-[11px] tracking-widest hover:bg-[#f0f7f2] hover:text-[#c0506a] transition">
            LOGOUT
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
