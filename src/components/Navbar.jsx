import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logoutUser, loading } = useAuth();
  const [dropdown, setDropdown] = useState(false);

  if (loading) {
    return null; // wait until firebase finishes
  }

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <header className="bg-[#f7f3ee] border-b">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

        <Link
          to="/"
          className="text-3xl font-serif tracking-widest text-red-500"
        >
          FIORELLO
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-sm tracking-widest font-medium">
          <NavItem to="/" text="HOME" />
          <NavItem to="/shop" text="SHOP" />
          <NavItem to="/contacts" text="Contacts" />
          <NavItem to="/about" text="AboutUs" />

          {user ? (
            <div className="relative">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setDropdown(!dropdown)}
                />
              ) : (
                <FaUserCircle
                  size={32}
                  className="cursor-pointer"
                  onClick={() => setDropdown(!dropdown)}
                />
              )}

              {dropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavItem to="/login" text="Login" />
          )}
        </nav>
      </div>
    </header>
  );
};


const NavItem = ({ to, text }) => (
  <Link
    to={to}
    className="relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
  >
    {text}
  </Link>
);

export default Navbar;
