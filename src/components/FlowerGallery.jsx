import { motion } from "framer-motion";

const galleryImages = [
  { src: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800", tall: true },
  { src: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=600", tall: false },
  { src: "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=600", tall: false },
  { src: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop&crop=bottom", tall: false },
  { src: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop&crop=top", tall: false },
  { src: "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop&crop=right", tall: true },
];

const FlowerGallery = () => {
  return (
    <section className="bg-[#fffdf9] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="section-label">Our Work</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-serif font-medium text-[#1a2e1a]">
            Flower Gallery
          </h2>
          <div className="petal-divider max-w-xs mx-auto my-5">
            <span className="text-[#e8a0b4] text-xl">✿</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 h-[520px]">
          {galleryImages.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={`img-zoom rounded-xl overflow-hidden ${item.tall ? "row-span-2" : ""}`}
            >
              <img src={item.src} alt="gallery" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col md:flex-row justify-between items-center gap-8 bg-[#f0f7f2] border border-[#c8e0d0] p-8 rounded-2xl"
        >
          <p className="text-[#4a6a4a] max-w-xl text-sm leading-relaxed">
            Buying flowers for your loved ones is an important way to show them that you care.
            Flowers have a powerful emotional impact, conveying love, sympathy, and heartfelt sentiments.
          </p>
          <div className="flex items-center gap-5 flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-[#2d5a3d] flex items-center justify-center text-[#e8a0b4] text-xl shadow-md">☎</div>
            <div>
              <h4 className="font-serif text-lg text-[#1a2e1a]">Order Flowers Now</h4>
              <p className="text-[#4a6a4a] text-sm mt-0.5">
                Call us: <span className="text-[#2d5a3d] font-semibold">+1 (234) 567 89 00</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FlowerGallery;
