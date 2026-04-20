import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-[#faf8f5] overflow-hidden min-h-[92vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="section-label"
          >
            Fresh · Handcrafted · Elegant
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="mt-5 text-6xl lg:text-7xl font-serif font-light text-[#4a3728] leading-[1.1]"
          >
            Beautiful <br />
            <em className="text-[#c8a97e] not-italic">Flowers</em> for <br />
            any Occasion
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="h-[1px] bg-[#c8a97e] my-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-[#7a6a5e] max-w-sm text-base leading-relaxed"
          >
            Most elegant, freshly cut floral arrangements — crafted with love for every special moment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mt-10 flex gap-4 flex-wrap"
          >
            <Link to="/shop" className="btn-elegant">
              Shop Now
            </Link>
            <Link to="/about" className="btn-outline-elegant">
              Our Story
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-14 flex gap-10"
          >
            {[["500+", "Happy Clients"], ["12+", "Years Experience"], ["50+", "Flower Types"]].map(([num, label]) => (
              <div key={label}>
                <p className="text-3xl font-serif text-[#4a3728]">{num}</p>
                <p className="text-[11px] tracking-widest text-[#c8a97e] uppercase mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex justify-center relative"
        >
          {/* Decorative circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[420px] h-[420px] rounded-full bg-[#f0e8df] opacity-60" />
          </div>

          <img
            src="https://i.ibb.co.com/MkdKRN5h/Capture.png"
            alt="Flower Bouquet"
            className="relative z-10 w-full max-w-[500px] drop-shadow-2xl"
          />

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-4 bg-white shadow-lg px-5 py-4 z-20 border-l-2 border-[#c8a97e]"
          >
            <p className="text-[10px] tracking-widest text-[#c8a97e] uppercase">Starting from</p>
            <p className="text-2xl font-serif text-[#4a3728]">$29</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
