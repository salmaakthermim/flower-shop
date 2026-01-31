import { Link } from "react-router-dom";

const Navbar = () => {
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
          <NavItem to="/elements" text="ELEMENTS" />
        </nav>

        {/* Mobile Icon */}
        <div className="md:hidden text-2xl cursor-pointer">
          ☰
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
    >
      {text}
    </Link>
  );
};

export default Navbar;
