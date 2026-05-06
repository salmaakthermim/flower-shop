import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const sliderImages = [
  "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop&crop=right",
  "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop&crop=bottom",
  "https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop&crop=left",
  "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop&crop=top",
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Bride",
    text: "Absolutely stunning arrangements! My wedding flowers were beyond perfect. Every guest was amazed.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
  },
  {
    name: "James K.",
    role: "Regular Customer",
    text: "Ordered for my mom's birthday — she cried happy tears. The freshness and quality is unmatched.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
  },
  {
    name: "Emily R.",
    role: "Event Planner",
    text: "Fast delivery, fresh flowers, and beautifully packaged every single time. My go-to florist.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
  },
];

const Gallery = () => {
  return (
    <>
      {/* Auto-scroll strip */}
      <section className="bg-[#2d5a3d] py-12 overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2200, disableOnInteraction: false }}
          loop={true}
          spaceBetween={12}
          breakpoints={{
            320: { slidesPerView: 1.5 },
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 5 },
          }}
        >
          {sliderImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="h-[190px] rounded-xl overflow-hidden">
                <img src={img} alt="flower"
                  className="w-full h-full object-cover hover:scale-105 transition duration-700 opacity-80 hover:opacity-100"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Testimonials */}
      <section className="bg-[#fffdf9] py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="section-label">What clients say</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-serif font-medium text-[#1a2e1a]">Testimonials</h2>
            <div className="petal-divider max-w-xs mx-auto my-5">
              <span className="text-[#e8a0b4] text-xl">✿</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white border border-[#e8f0ea] p-8 card-lift rounded-2xl relative"
              >
                <span className="absolute top-5 right-6 text-6xl font-serif text-[#f0f7f2] leading-none select-none">"</span>
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-[#e8a0b4] text-sm">★</span>
                  ))}
                </div>
                <p className="text-[#4a6a4a] text-sm leading-relaxed mb-7">"{t.text}"</p>
                <div className="flex items-center gap-3 border-t border-[#e8f0ea] pt-5">
                  <img src={t.avatar} alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#e8a0b4] ring-offset-1"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#1a2e1a]">{t.name}</p>
                    <p className="text-[10px] tracking-widest text-[#2d5a3d] uppercase">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
