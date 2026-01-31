import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const MeetOurTeam = () => {
  return (
    <section className="bg-[#f7f3ee] py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Heading */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6 }}
          className="italic text-gray-500 mb-2"
        >
          Our Team
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-serif mb-4"
        >
          Meet Our Team
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 mb-14"
        >
          We are flower lovers and professional florists.
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            className="bg-[#d8d9c4] p-8 flex flex-col justify-center"
          >
            <h3 className="text-xl font-serif mb-1">Sami Smith</h3>
            <p className="italic text-sm mb-4">Owner / florist</p>
            <p className="text-sm text-gray-700 mb-4">
              Sami is our founder and main inspirer. Responsible for ordering
              flowers and creating exclusive bouquets.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="overflow-hidden"
          >
            <img
              src="https://i.ibb.co.com/HDhN7Lfk/meet1.png"
              className="w-full h-full object-cover"
              alt=""
            />
          </motion.div>

          {/* Join */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-[#bfc5cc] p-8 flex flex-col justify-center text-white"
          >
            <h3 className="text-xl font-serif mb-4">Join Our Team</h3>
            <p className="text-sm mb-6">
              Want to work with flowers and create stunning compositions?
            </p>
            <button className="border border-white px-6 py-2 text-sm hover:bg-white hover:text-gray-800 transition">
              Send your CV
            </button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden"
          >
            <img
              src="https://i.ibb.co.com/1hJmb26/Meet-2.png"
              className="w-full h-full object-cover"
              alt=""
            />
          </motion.div>

          {/* Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            className="bg-[#d8d9c4] p-8 flex flex-col justify-center"
          >
            <h3 className="text-xl font-serif mb-1">Mioko Sudoru</h3>
            <p className="italic text-sm mb-4">Florist</p>
            <p className="text-sm text-gray-700 mb-4">
              Professional florist with 5+ years of experience.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden"
          >
            <img
              src="https://i.ibb.co.com/YBM5XYYm/Capture-PNG6.png"
              className="w-full h-full object-cover"
              alt=""
            />
          </motion.div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-16 text-gray-500 italic"
        >
          “After women, flowers are the most lovely thing God has given the
          world.”  
          <p className="mt-2">— Christian Dior</p>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetOurTeam;
