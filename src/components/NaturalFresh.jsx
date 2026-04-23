import { motion } from "framer-motion";

const NaturalFresh = () => {
  return (
    <section className="bg-[#f0f7f2] py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span className="section-label">How we create bouquets</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-serif font-medium text-[#1a2e1a] leading-tight">
            Natural Fresh <br />
            <em className="text-[#e8a0b4] not-italic">Bouquets</em>
          </h2>
          <div className="w-14 h-[2px] bg-[#e8a0b4] my-7 rounded-full" />
          <p className="text-[#4a6a4a] text-base leading-relaxed mb-4">
            We work with only fresh-cut and high-quality flowers.
          </p>
          <p className="text-[#4a6a4a] text-base leading-relaxed mb-10">
            Creating bouquets is an art, and our florists are artists. We use the highest quality
            flowers from local greenhouses and suppliers from the Netherlands and France.
          </p>
          <div className="flex items-start gap-5 bg-white border border-[#c8e0d0] p-6 rounded-xl shadow-sm">
            <img
              src="https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
              alt="flower"
              className="w-16 h-16 rounded-full object-cover flex-shrink-0 ring-2 ring-[#e8a0b4] ring-offset-2"
            />
            <div>
              <h3 className="font-semibold text-[#1a2e1a] mb-2 flex items-center gap-2">
                Special Flower Collections
                <span className="text-[#2d5a3d]">→</span>
              </h3>
              <p className="text-sm text-[#4a6a4a] leading-relaxed">
                Our florists will do everything possible to create the best bouquet for you.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full border-2 border-[#e8a0b4]/30 scale-110" />
            <div className="border-[14px] border-white rounded-full p-2 shadow-2xl">
              <img
                src="https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=500&h=420&fit=crop&crop=center"
                alt="Bouquet"
                className="rounded-full object-cover w-[300px] h-[420px]"
              />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#2d5a3d] text-white px-7 py-3 text-center shadow-xl whitespace-nowrap rounded-full">
              <p className="text-[9px] tracking-widest text-[#e8a0b4] uppercase">100% Natural</p>
              <p className="text-sm font-serif mt-0.5">Fresh Daily</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default NaturalFresh;
