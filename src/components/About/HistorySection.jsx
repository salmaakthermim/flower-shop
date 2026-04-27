import { motion } from "framer-motion";

const HistorySection = () => {
  return (
    <section className="bg-[#fffdf9] py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex justify-center"
        >
          <div className="relative w-[300px] md:w-[360px] h-[500px] rounded-full border-2 border-[#e8a0b4]/30 flex items-center justify-center">
            <div className="w-[260px] md:w-[320px] h-[460px] rounded-full overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop"
                alt="Flower Studio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <span className="section-label">History</span>
          <h2 className="mt-4 text-4xl font-serif font-medium text-[#1a2e1a] leading-tight mb-2">
            How Our Studio Started
          </h2>
          <div className="w-14 h-[2px] bg-[#e8a0b4] my-6 rounded-full" />
          <p className="text-[#4a6a4a] leading-relaxed mb-4">
            It all started with a great love for flowers. In early 2015, Sami Smith was walking
            down the street and saw florists working in one of the trendy florist shops. She was
            impressed by the beauty of freshly-cut flowers and bouquets.
          </p>
          <p className="text-[#4a6a4a] leading-relaxed mb-8">
            She borrowed some money, took a florist course, and opened her small studio in the Bronx.
            Very quickly, her bouquets became very popular. Six months later,{" "}
            <em>Mioko Sudoru</em> joined Sami, and together they moved to Manhattan.
          </p>

          <div className="flex items-center gap-4 bg-[#f0f7f2] border border-[#c8e0d0] p-5 rounded-xl">
            <div className="w-14 h-14 rounded-full bg-[#2d5a3d] flex items-center justify-center text-white font-serif text-lg flex-shrink-0">
              '15
            </div>
            <div>
              <h4 className="font-medium text-[#1a2e1a]">Our Studio in 2015</h4>
              <p className="text-sm text-[#4a6a4a] mt-0.5">This is when our flower shop first opened its doors.</p>
              <p className="text-xs text-[#4a6a4a] mt-0.5 italic">ph. by Michael Nilson (2015, April 15)</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HistorySection;
