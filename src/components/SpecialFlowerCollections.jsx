import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const collections = [
  {
    title: "Mother's Day Collection",
    desc: "One of the best ways to show your mother how much you love her is a beautiful flower composition.",
    img: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=700&h=300&fit=crop&crop=top",
    tag: "Popular",
    tagColor: "bg-[#e8a0b4] text-white",
  },
  {
    title: "Valentine's Day Collection",
    desc: "Looking for a unique gift? Check out this fantastic collection to make Valentine's Day truly special.",
    img: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=700&h=300&fit=crop",
    tag: "Bestseller",
    tagColor: "bg-[#2d5a3d] text-white",
  },
  {
    title: "Autumn Collection",
    desc: "Order bouquets from this beautiful seasonal collection while we arrange the flowers with care.",
    img: "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=700&h=300&fit=crop",
    tag: "Seasonal",
    tagColor: "bg-[#1a2e1a] text-white",
  },
];

export default function SpecialFlowerCollections() {
  return (
    <section className="bg-[#fffdf9] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label">Special</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-serif font-medium text-[#1a2e1a]">
            Special Flower Collections
          </h2>
          <div className="petal-divider max-w-xs mx-auto my-6">
            <span className="text-[#e8a0b4] text-xl">✿</span>
          </div>
          <p className="max-w-xl mx-auto text-[#4a6a4a] text-base leading-relaxed">
            Need to pick a gift for a specific event? We can help you even if you are short of time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              className="group card-lift bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e8f0ea]"
            >
              <div className="img-zoom relative h-[260px]">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                <span className={`absolute top-4 left-4 text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full font-medium ${item.tagColor}`}>
                  {item.tag}
                </span>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-serif font-medium text-[#1a2e1a] mb-3">{item.title}</h3>
                <div className="w-8 h-[2px] bg-[#e8a0b4] mb-4 rounded-full" />
                <p className="text-[#4a6a4a] text-sm leading-relaxed mb-6">{item.desc}</p>
                <Link to="/shop" className="btn-primary text-[10px] py-2.5 px-6">Order Now</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
