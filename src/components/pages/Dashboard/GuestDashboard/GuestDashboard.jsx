import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLeaf, FaShoppingBag, FaUserPlus, FaSignInAlt, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

const features = [
  { icon: "🌸", title: "Browse Flowers", desc: "Explore our full collection of fresh, handcrafted bouquets.", link: "/shop", cta: "Shop Now" },
  { icon: "💐", title: "Special Collections", desc: "Discover seasonal and occasion-based flower collections.", link: "/shop", cta: "Explore" },
  { icon: "📞", title: "Contact Us", desc: "Have a question? Our team is happy to help you.", link: "/contacts", cta: "Get in Touch" },
];

export default function GuestDashboard() {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    fetch("https://flower-shop-server-nu.vercel.app/flowers")
      .then(r => r.json())
      .then(d => setFlowers(Array.isArray(d) ? d.slice(0, 4) : []))
      .catch(() => {});
  }, []);

  return (
    <div className="p-6 md:p-8 min-h-screen bg-[#f0f7f2]">

      {/* Welcome hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-[#e8f0ea] overflow-hidden mb-6"
      >
        <div className="relative h-36 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #2d5a3d 0%, #4a8a5d 60%, #6aaa7d 100%)" }}
        >
          <div className="absolute inset-0"
            style={{ backgroundImage: "radial-gradient(circle at 10% 60%, rgba(232,160,180,0.35) 0%, transparent 45%), radial-gradient(circle at 90% 20%, rgba(255,255,255,0.12) 0%, transparent 40%)" }}
          />
          <FaLeaf className="absolute bottom-4 right-8 text-white/15 text-7xl rotate-12" />
          <div className="relative z-10 h-full flex items-center px-8">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#e8a0b4] font-medium mb-1">Welcome to Fiorello</p>
              <h1 className="text-3xl font-serif text-white font-medium">Hello, Guest! 🌸</h1>
            </div>
          </div>
        </div>

        <div className="p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-[#1a2e1a] font-medium mb-1">You're browsing as a guest</p>
            <p className="text-sm text-[#4a6a4a]">Create an account to place orders, track deliveries, and save your favourites.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link to="/register" className="btn-primary text-[10px] py-2.5 px-5 flex items-center gap-2">
              <FaUserPlus size={11} /> Register
            </Link>
            <Link to="/login" className="btn-outline text-[10px] py-2.5 px-5 flex items-center gap-2">
              <FaSignInAlt size={11} /> Login
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Feature cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl border border-[#e8f0ea] p-6 card-lift"
          >
            <div className="text-3xl mb-4">{f.icon}</div>
            <h3 className="font-serif text-lg text-[#1a2e1a] mb-2">{f.title}</h3>
            <p className="text-sm text-[#4a6a4a] leading-relaxed mb-5">{f.desc}</p>
            <Link to={f.link} className="text-[10px] tracking-widest uppercase text-[#2d5a3d] font-medium hover:underline">
              {f.cta} →
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Featured flowers */}
      {flowers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-[#e8f0ea] p-7"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="section-label">Featured</p>
              <h2 className="font-serif text-xl text-[#1a2e1a] mt-1">Popular Flowers</h2>
            </div>
            <Link to="/shop" className="text-[10px] tracking-widest uppercase text-[#2d5a3d] hover:underline font-medium">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {flowers.map((flower, i) => (
              <motion.div
                key={flower._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + i * 0.07 }}
                className="group bg-[#f0f7f2] rounded-xl overflow-hidden card-lift"
              >
                <div className="h-36 overflow-hidden">
                  <img src={flower.image} alt={flower.name}
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-3 text-center">
                  <p className="text-sm font-medium text-[#1a2e1a] truncate">{flower.name}</p>
                  <p className="text-[#2d5a3d] font-semibold text-sm mt-0.5">${flower.price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA banner */}
          <div className="mt-6 bg-[#f0f7f2] rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#c8e0d0]">
            <div className="flex items-center gap-3">
              <FaStar className="text-[#e8a0b4] text-xl flex-shrink-0" />
              <p className="text-sm text-[#1a2e1a]">
                <span className="font-medium">Register now</span> to place orders and get exclusive member discounts.
              </p>
            </div>
            <Link to="/register" className="btn-primary text-[10px] py-2.5 px-6 whitespace-nowrap flex items-center gap-2">
              <FaUserPlus size={11} /> Create Account
            </Link>
          </div>
        </motion.div>
      )}

    </div>
  );
}
