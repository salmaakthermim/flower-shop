import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#f7f2ec] py-20">
      <div className="max-w-7xl mx-auto px-6  text-center">

        {/* Top Contact */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-12">
          <div className="flex items-center gap-2">
            <FaPhoneAlt />
            {/* <span>+1 (234) 567 89 00</span> */}
          </div>

          <div className="flex items-center gap-2">
            <MdEmail />
            {/* <span>samiflowers@email.com</span> */}
          </div>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <img
            src="https://i.ibb.co.com/rXyfWMM/Capture-PNG1111.png"
            alt="logo"
            className="w-12"
          />
          <h2 className="text-2xl font-serif text-gray-700">
            Sami&apos;s Flowers
          </h2>
        </div>

        {/* Navigation */}
        <ul className="flex flex-wrap justify-center gap-8 text-gray-500 mb-8">
          <li className="hover:text-gray-700 cursor-pointer">About us</li>
          <li className="hover:text-gray-700 cursor-pointer">Services</li>
          <li className="hover:text-gray-700 cursor-pointer">Flowers</li>
          <li className="hover:text-gray-700 cursor-pointer">Collections</li>
          <li className="hover:text-gray-700 cursor-pointer">Testimonials</li>
          <li className="hover:text-gray-700 cursor-pointer">Contacts</li>
        </ul>

        {/* Description */}
        <p className="max-w-xl mx-auto text-gray-400 text-sm leading-relaxed">
          We are a small yet professional flower studio based in NY.
          You can order your perfect bouquet for any occasion here.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
