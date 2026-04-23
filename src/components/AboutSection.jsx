import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="bg-[#fffdf9] py-24 px-4 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">

        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="relative">
            <div className="absolute -top-5 -left-5 w-full h-full border-2 border-[#e8a0b4]/50 rounded-tl-[70px] rounded-br-[70px]" />
            <div className="img-zoom rounded-tl-[70px] rounded-br-[70px] overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=700&h=500&fit=crop"
                alt="Flower arrangement"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#2d5a3d] text-white w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-xl">
              <span className="text-2xl font-serif">12</span>
              <span className="text-[8px] tracking-widest uppercase">Years</span>
            </div>
          </div>
        </motion.div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="w-full md:w-1/2"
        >
          <span className="section-label">About us</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-serif font-medium text-[#1a2e1a] leading-tight">
            Our Mission is to Make <br />
            <em className="text-[#e8a0b4] not-italic">Your Lives Beautiful</em>
          </h2>
          <div className="w-14 h-[2px] bg-[#e8a0b4] my-7 rounded-full" />
          <p className="text-[#4a6a4a] text-base leading-relaxed mb-4">
            We are a small yet professional flower studio. Our mission is to make your lives{" "}
            <em>brighter and beautiful</em>, help you impress guests during important events,
            and make your loved ones happy with <em>wonderful bouquets</em>.
          </p>
          <p className="text-[#4a6a4a] text-base leading-relaxed mb-10">
            Every bouquet is handcrafted by our expert florists using only the freshest blooms
            sourced from local greenhouses and premium suppliers.
          </p>
          <div className="flex items-center gap-5 bg-[#f0f7f2] border border-[#c8e0d0] p-5 rounded-lg">
            <div className="bg-[#2d5a3d] text-[#e8a0b4] p-4 rounded-lg flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-[#1a2e1a]">Elegant Compositions from $29</h4>
              <p className="text-[#4a6a4a] text-sm mt-1 leading-relaxed">
                Order fresh and stylish flower arrangements at fair prices.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
