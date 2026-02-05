import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";

export default function NewFlowers() {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/flowers")
      .then(res => res.json())
      .then(data => setFlowers(data));
  }, []);

  return (
    <section className="bg-[#f7f3ee] py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="italic text-gray-500">New in shop</p>
          <h2 className="text-4xl font-serif text-gray-800">
            New in Shop Bouquets
          </h2>
          <p className="text-gray-500 mt-2">
            Select your bouquet and get it delivered in the shortest possible time!
          </p>
        </motion.div>

        {/* Slider */}
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {flowers.map((flower, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="text-center"
              >
                <div className="overflow-hidden rounded-xl">
                  <motion.img
                    src={flower.image}
                    alt={flower.name}
                    className="mx-auto h-64 object-contain"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                <h3 className="mt-6 text-lg font-semibold text-gray-700">
                  {flower.name}
                </h3>

                <p className="text-gray-400 mt-1">
                  ${flower.price} USD
                </p>

                <button className="mt-4 px-6 py-2 border border-gray-400 text-sm text-gray-600 hover:bg-gray-800 hover:text-white transition-all">
                  ADD TO CART
                </button>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
