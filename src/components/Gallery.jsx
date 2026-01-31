import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const images = [
  "https://i.ibb.co/HLNqCmGD/Capture.png",
  "https://i.ibb.co/4wSMnj8M/Capture-PNG6.png",
  "https://i.ibb.co/sJz3xQzt/Capture.png",
  "https://i.ibb.co/tTcdbRrY/Capture-PNG2.png",
  "https://i.ibb.co/JjNx8nFm/Capture-PNG1.png",
  "https://i.ibb.co/HLNqCmGD/Capture.png",
];

const Gallery = () => {
  return (
    <section className="bg-[#f7f2ec] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1.3 },
            640: { slidesPerView: 2.3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="h-[260px] overflow-hidden rounded-lg">
                <img
                  src={img}
                  alt="flower"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Gallery;
