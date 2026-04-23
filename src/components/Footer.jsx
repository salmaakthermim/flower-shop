import { Link } from "react-router-dom";
import { FaPhoneAlt, FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#1a2e1a] text-white/80">

      {/* Top strip */}
      <div className="border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-[#e8a0b4]" />
            <span className="text-sm tracking-wide">+1 (234) 567 89 00</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[26px] font-serif tracking-[0.2em] text-white">FIORELLO</span>
            <span className="text-[8px] tracking-[0.4em] text-[#e8a0b4] uppercase mt-0.5">Flower Studio</span>
          </div>
          <div className="flex items-center gap-3">
            <MdEmail className="text-[#e8a0b4]" />
            <span className="text-sm tracking-wide">hello@fiorello.com</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#e8a0b4] mb-5 font-medium">About Us</h4>
          <p className="text-sm leading-relaxed text-white/55">
            We are a small yet professional flower studio. You can order your perfect bouquet
            for any occasion here. Every arrangement is crafted with love and care.
          </p>
          <div className="flex gap-3 mt-6">
            {[FaInstagram, FaFacebookF, FaPinterestP].map((Icon, i) => (
              <a key={i} href="#"
                className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center hover:border-[#e8a0b4] hover:text-[#e8a0b4] transition-all duration-300"
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>

        <div className="md:text-center">
          <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#e8a0b4] mb-5 font-medium">Navigation</h4>
          <ul className="space-y-3 text-sm text-white/55">
            {[{ to: "/", label: "Home" }, { to: "/shop", label: "Shop" }, { to: "/about", label: "About Us" }, { to: "/contacts", label: "Contacts" }].map(({ to, label }) => (
              <li key={label}>
                <Link to={to} className="hover:text-[#e8a0b4] transition-colors duration-200">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:text-right">
          <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#e8a0b4] mb-5 font-medium">Find Us</h4>
          <div className="space-y-3 text-sm text-white/55">
            <div className="flex items-start gap-2 md:justify-end">
              <MdLocationOn className="text-[#e8a0b4] mt-0.5 flex-shrink-0" />
              <span>123 Blossom Street, New York, NY 10001</span>
            </div>
            <div className="flex items-center gap-2 md:justify-end">
              <FaPhoneAlt className="text-[#e8a0b4] flex-shrink-0" />
              <span>+1 (234) 567 89 00</span>
            </div>
            <div className="flex items-center gap-2 md:justify-end">
              <MdEmail className="text-[#e8a0b4] flex-shrink-0" />
              <span>hello@fiorello.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2 text-[11px] text-white/35 tracking-wide">
          <span>© 2025 Fiorello Flower Studio. All rights reserved.</span>
          <span>Crafted with ♥</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
