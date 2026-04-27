import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLeaf, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const services = [
  { icon: "💍", title: "Weddings", desc: "Beautiful bridal bouquets and stunning flower arches for your special day." },
  { icon: "🎉", title: "Parties & Events", desc: "Bright flower arrangements for themed celebrations and corporate events." },
  { icon: "🍽️", title: "Restaurants", desc: "Elegant flower decorations for restaurants, cafes, and dining spaces." },
  { icon: "🏆", title: "Sports & Media", desc: "Identical bouquets for competition winners and media appearances." },
];

export default function GuestAbout() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-7">
        <p className="section-label">Guest</p>
        <h1 className="text-3xl font-serif font-medium text-[#1a2e1a] mt-1">About Fiorello</h1>
      </div>

      {/* Hero card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-[#e8f0ea] overflow-hidden mb-6"
      >
        <div className="relative h-40 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #2d5a3d 0%, #4a8a5d 60%, #6aaa7d 100%)" }}
        >
          <div className="absolute inset-0"
            style={{ backgroundImage: "radial-gradient(circle at 10% 60%, rgba(232,160,180,0.3) 0%, transparent 45%)" }}
          />
          <FaLeaf className="absolute bottom-4 right-8 text-white/15 text-7xl rotate-12" />
          <div className="relative z-10 h-full flex items-center px-8">
            <div>
              <h2 className="text-3xl font-serif text-white font-medium">Fiorello Flower Studio</h2>
              <p className="text-white/70 text-sm mt-1">Fresh · Handcrafted · Elegant — Since 2015</p>
            </div>
          </div>
        </div>
        <div className="p-7">
          <p className="text-[#4a6a4a] leading-relaxed mb-4">
            We are a small yet professional flower studio. Our mission is to make your lives brighter
            and beautiful, help you impress guests during important events, and make your loved ones
            happy with wonderful bouquets and flower arrangements.
          </p>
          <p className="text-[#4a6a4a] leading-relaxed">
            Every bouquet is handcrafted by our expert florists using only the freshest blooms sourced
            from local greenhouses and premium suppliers from the Netherlands and France.
          </p>
        </div>
      </motion.div>

      {/* Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-[#e8f0ea] p-7 mb-6"
      >
        <h2 className="font-serif text-xl text-[#1a2e1a] mb-6">Our Services</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <div key={i} className="flex items-start gap-4 bg-[#f0f7f2] rounded-xl p-4">
              <span className="text-2xl flex-shrink-0">{s.icon}</span>
              <div>
                <h3 className="font-medium text-[#1a2e1a] text-sm">{s.title}</h3>
                <p className="text-xs text-[#4a6a4a] mt-0.5 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        {[["500+", "Happy Clients"], ["12+", "Years Experience"], ["50+", "Flower Types"]].map(([num, label]) => (
          <div key={label} className="bg-white rounded-2xl border border-[#e8f0ea] p-5 text-center">
            <p className="text-2xl font-serif text-[#2d5a3d] font-medium">{num}</p>
            <p className="text-[10px] tracking-widest uppercase text-[#4a6a4a] mt-1">{label}</p>
          </div>
        ))}
      </motion.div>

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-[#e8f0ea] p-7 mb-6"
      >
        <h2 className="font-serif text-xl text-[#1a2e1a] mb-5">Contact Us</h2>
        <div className="space-y-4">
          {[
            { icon: <FaPhone />, label: "Phone", value: "+1 (234) 567 89 00" },
            { icon: <FaEnvelope />, label: "Email", value: "hello@fiorello.com" },
            { icon: <FaMapMarkerAlt />, label: "Address", value: "123 Blossom Street, New York, NY 10001" },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-[#f0f7f2] flex items-center justify-center text-[#2d5a3d] flex-shrink-0">
                {icon}
              </div>
              <div>
                <p className="text-[10px] tracking-widest uppercase text-[#4a6a4a] font-medium">{label}</p>
                <p className="text-sm text-[#1a2e1a] font-medium mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-[#2d5a3d] rounded-2xl p-7 flex flex-col sm:flex-row items-center justify-between gap-5"
      >
        <div>
          <h3 className="font-serif text-xl text-white mb-1">Ready to order?</h3>
          <p className="text-white/70 text-sm">Create a free account and start ordering beautiful flowers today.</p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Link to="/register" className="btn-secondary text-[10px] py-2.5 px-5">Register Free</Link>
          <Link to="/shop" className="bg-[#e8a0b4] text-white px-5 py-2.5 text-[10px] tracking-widest uppercase font-medium hover:bg-white hover:text-[#2d5a3d] transition rounded-sm">
            Browse Shop
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
