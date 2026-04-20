import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutUser, loading } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#e8e0d8]"
          : "bg-[#faf8f5] border-b border-[#e8e0d8]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col items-start leading-none">
          <span className="text-2xl font-serif tracking-[0.2em] text-[#4a3728]">
            FIORELLO
          </span>
          <span className="text-[9px] tracking-[0.35em] text-[#c8a97e] uppercase">
            Flower Studio
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 text-[11px] tracking-[0.2em] font-medium text-[#4a3728]">
          <NavItem to="/" text="HOME" />
          <NavItem to="/shop" text="SHOP" />
          <NavItem to="/contacts" text="CONTACTS" />
          <NavItem to="/about" text="ABOUT US" />
          {user ? (
            <UserDropdown
              user={user}
              dropdown={dropdown}
              setDropdown={setDropdown}
              handleLogout={handleLogout}
            />
          ) : (
            <Link
              to="/login"
              className="btn-elegant text-[10px] tracking-[0.2em]"
            >
              LOGIN
            </Link>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-xl text-[#4a3728]"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t border-[#e8e0d8] px-6 pb-6 pt-4 space-y-4 text-[11px] tracking-[0.2em] font-medium text-[#4a3728]">
          <NavItem to="/" text="HOME" />
          <NavItem to="/shop" text="SHOP" />
          <NavItem to="/contacts" text="CONTACTS" />
          <NavItem to="/about" text="ABOUT US" />
          {user ? (
            <>
              <Link to="/dashboard" className="block py-2" onClick={() => setMobileMenu(false)}>
                DASHBOARD
              </Link>
              <button onClick={handleLogout} className="block py-2 text-left w-full">
                LOGOUT
              </button>
            </>
          ) : (
            <NavItem to="/login" text="LOGIN" />
          )}
        </div>
      )}
    </header>
  );
};

const NavItem = ({ to, text }) => (
  <Link to={to} className="nav-link block py-1">
    {text}
  </Link>
);

const UserDropdown = ({ user, dropdown, setDropdown, handleLogout }) => (
  <div className="relative">
    {user?.avatar ? (
      <img
        src={user.avatar}
        alt="avatar"
        className="w-9 h-9 rounded-full cursor-pointer ring-2 ring-[#c8a97e] ring-offset-1"
        onClick={() => setDropdown(!dropdown)}
      />
    ) : (
      <FaUserCircle
        size={28}
        className="cursor-pointer text-[#4a3728]"
        onClick={() => setDropdown(!dropdown)}
      />
    )}
    {dropdown && (
      <div className="absolute right-0 mt-3 w-44 bg-white shadow-xl border border-[#e8e0d8] py-2 z-50">
        <Link to="/dashboard" className="block px-5 py-2.5 text-[11px] tracking-widest hover:bg-[#faf8f5] hover:text-[#c8a97e] transition">
          DASHBOARD
        </Link>
        <button onClick={handleLogout} className="block w-full text-left px-5 py-2.5 text-[11px] tracking-widest hover:bg-[#faf8f5] hover:text-[#c8a97e] transition">
          LOGOUT
        </button>
      </div>
    )}
  </div>
);

export default Navbar;
