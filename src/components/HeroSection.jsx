import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2010]/85 via-[#0d2010]/55 to-transparent" />
      </div>

      <div className="container mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-[#e8a0b4] border border-[#e8a0b4]/40 px-4 py-1.5 rounded-full mb-6">
            Crafted with Love
          </span>
          <h1 className="text-5xl md:text-6xl font-serif font-medium text-white leading-tight mb-6">
            Beautiful <em className="text-[#e8a0b4] not-italic">Compositions</em>
            <br />for Any Occasion
          </h1>
          <div className="w-14 h-[2px] bg-[#e8a0b4] mb-7 rounded-full" />
          <p className="text-white/70 max-w-md text-base leading-relaxed mb-8">
            Surprise your loved ones and make any holiday even happier with our handcrafted floral arrangements.
          </p>
          <ul className="flex flex-wrap gap-6 mb-10 text-white/80 text-sm">
            {["Wedding Flowers", "Prom Flowers", "Flower Crowns"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8a0b4] inline-block" />
                {item}
              </li>
            ))}
          </ul>
          <Link to="/shop" className="btn-primary">Order Flowers</Link>
        </motion.div>

        {/* Right floating card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="hidden md:flex justify-end"
        >
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=500&h=460&fit=crop"
              alt="Bouquet"
              className="w-[360px] h-[460px] object-cover rounded-tl-[60px] rounded-br-[60px] shadow-2xl"
            />
            <div className="absolute -bottom-5 -left-8 bg-white p-5 shadow-xl border-l-4 border-[#e8a0b4] rounded-r-lg">
              <p className="text-[9px] tracking-widest text-[#2d5a3d] uppercase font-medium">New Arrival</p>
              <p className="font-serif text-[#1a2e1a] text-base mt-0.5">Spring Collection 2025</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
