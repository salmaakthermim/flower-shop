import { motion } from "framer-motion";

const partners = [
  { name: "GiftTree", initial: "GT" },
  { name: "Sasha Flowers", initial: "SF" },
  { name: "Euroflor", initial: "EF" },
  { name: "Dimmen", initial: "DM" },
  { name: "Harry's", initial: "HF" },
  { name: "Costa Flora", initial: "CF" },
];

const Partners = () => {
  return (
    <section className="bg-[#f0f7f2] py-16 border-y border-[#c8e0d0]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-[#4a6a4a] text-sm leading-relaxed mb-10 max-w-2xl mx-auto">
          Our pride is in working with exceptional companies to deliver stunning bouquets and create flower decorations.
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {partners.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-white h-20 flex flex-col items-center justify-center rounded-xl border border-[#e8f0ea] hover:border-[#2d5a3d] transition-colors duration-300 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#f0f7f2] flex items-center justify-center text-[#2d5a3d] font-serif text-sm font-medium group-hover:bg-[#2d5a3d] group-hover:text-white transition-colors duration-300">
                {p.initial}
              </div>
              <p className="text-[9px] tracking-widest uppercase text-[#4a6a4a] mt-1.5">{p.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
