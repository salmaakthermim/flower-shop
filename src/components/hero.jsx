import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="bg-[#f7f3ee] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm text-gray-400 italic block"
          >
            Fresh flowers
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="mt-4 text-5xl lg:text-6xl font-serif font-light text-[#6d6a63] leading-tight"
          >
            Beautiful Flowers for <br /> any Occasion
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="h-[1px] bg-gray-400 my-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-gray-500 max-w-md"
          >
            Most elegant, freshly cut floral arrangements.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-10 px-8 py-3 border border-[#6d6a63] text-sm tracking-widest uppercase hover:bg-[#6d6a63] hover:text-white transition"
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex justify-center"
        >
          <img
            src="https://i.ibb.co.com/MkdKRN5h/Capture.png"
            alt="Flower Bouquet"
            className="w-full max-w-lg"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
