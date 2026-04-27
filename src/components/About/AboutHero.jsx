import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutHero = () => {
  return (
    <section className="bg-[#fffdf9] py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span className="section-label">Who we are</span>
          <h1 className="mt-4 text-4xl lg:text-5xl font-serif font-medium text-[#1a2e1a] leading-snug mb-6">
            We Create Flower Bouquets for <em className="text-[#e8a0b4] not-italic">Any Occasion</em>
          </h1>
          <div className="w-14 h-[2px] bg-[#e8a0b4] mb-7 rounded-full" />
          <p className="text-[#4a6a4a] leading-relaxed max-w-xl mb-8">
            We are a small yet professional flower studio. Our mission is to make your lives
            brighter and beautiful, help you impress guests during important events, and make
            your loved ones happy with wonderful bouquets and flower arrangements.
          </p>
          <Link to="/shop" className="btn-primary">Order Flowers</Link>
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
                src="https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop"
                alt="Flower Arrangement"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutHero;
