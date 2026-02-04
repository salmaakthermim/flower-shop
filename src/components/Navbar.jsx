import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    // ইউজারের ডাটা localStorage থেকে নেওয়া
    const role = localStorage.getItem("role");
    const avatar = localStorage.getItem("avatar"); // register page থেকে save করলে
    const name = localStorage.getItem("name");
    if (role && avatar && name) {
      setUser({ role, avatar, name });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-[#f7f3ee] border-b">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-serif tracking-widest text-red-500"
        >
          FIORELLO
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10 text-sm tracking-widest font-medium">
          <NavItem to="/" text="HOME" />
          <NavItem to="/pages" text="PAGES" />
          <NavItem to="/shop" text="SHOP" />
          <NavItem to="/contacts" text="Contacts" />
          <NavItem to="/about" text="AboutUs" />

          {/* User Section */}
          {user ? (
            <div className="relative">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setDropdown(!dropdown)}
              />
              {dropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
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

        {/* Mobile Icon */}
        <div className="md:hidden text-2xl cursor-pointer">☰</div>
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
