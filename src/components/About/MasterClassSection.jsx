import { motion } from "framer-motion";

const classes = [
  {
    title: "Spring Flowers Composition",
    desc: "Create your own flower arrangement with tulips and daffodils.",
    price: "$50",
    img: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
  },
  {
    title: "Rosy Roses Composition",
    desc: "Learn how to work with roses of different species.",
    price: "$60",
    img: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
  },
  {
    title: "Autumn Bouquet Workshop",
    desc: "Seasonal arrangements using warm-toned autumn blooms.",
    price: "$55",
    img: "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
  },
];

const MasterClassSection = () => {
  return (
    <section className="bg-[#f0f7f2] py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span className="section-label">Master Classes</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-serif font-medium text-[#1a2e1a] leading-snug mb-2">
            Learn to Create <em className="text-[#e8a0b4] not-italic">Beautiful Bouquets</em>
          </h2>
          <div className="w-14 h-[2px] bg-[#e8a0b4] my-6 rounded-full" />
          <p className="text-[#4a6a4a] leading-relaxed mb-8">
            From time to time, we hold master classes for everyone who wants to learn how to
            work with flowers and create unique bouquets.
          </p>

          <div className="space-y-4 mb-8">
            {classes.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-white border border-[#e8f0ea] p-4 rounded-xl"
              >
                <img src={c.img} alt={c.title} className="w-12 h-12 rounded-full object-cover flex-shrink-0 ring-2 ring-[#e8a0b4] ring-offset-1" />
                <div className="flex-1">
                  <h4 className="font-medium text-[#1a2e1a] text-sm">{c.title}</h4>
                  <p className="text-xs text-[#4a6a4a] mt-0.5">{c.desc}</p>
                </div>
                <span className="font-serif text-lg text-[#2d5a3d] font-medium flex-shrink-0">{c.price}</span>
              </motion.div>
            ))}
          </div>

          <button className="btn-primary">Sign Up for a Class</button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-[300px] md:w-[360px] h-[500px] rounded-full border-2 border-[#e8a0b4]/30 flex items-center justify-center">
            <div className="w-[260px] md:w-[320px] h-[460px] rounded-full overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop"
                alt="Master Class"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default MasterClassSection;
