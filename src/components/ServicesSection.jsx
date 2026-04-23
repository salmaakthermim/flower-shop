import { motion } from "framer-motion";
import { GiForkKnifeSpoon, GiBigDiamondRing, GiPartyPopper, GiCoffin, GiTrophyCup } from "react-icons/gi";

const services = [
  { icon: <GiForkKnifeSpoon />, title: "Restaurants", desc: "Elegant flower decorations for restaurants and cafes." },
  { icon: <GiBigDiamondRing />, title: "Weddings", desc: "Beautiful bridal bouquets and stunning flower arches." },
  { icon: <GiPartyPopper />, title: "Parties", desc: "Bright flower arrangements for themed celebrations." },
  { icon: <GiCoffin />, title: "Funerals", desc: "Express your grief with the right, meaningful flowers." },
  { icon: <GiTrophyCup />, title: "Sports & Media", desc: "Identical bouquets for competition winners." },
];

const ServicesSection = () => {
  return (
    <section className="bg-[#f0f7f2] py-20 border-y border-[#c8e0d0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {services.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center group cursor-default"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:bg-[#2d5a3d] transition-colors duration-300">
                <span className="text-2xl text-[#2d5a3d] group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </span>
              </div>
              <h3 className="text-base font-serif font-medium text-[#1a2e1a] mb-3">{item.title}</h3>
              <div className="w-8 h-[2px] bg-[#e8a0b4] mx-auto mb-3 rounded-full" />
              <p className="text-sm text-[#4a6a4a] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
