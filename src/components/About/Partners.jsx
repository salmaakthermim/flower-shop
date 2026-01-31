import { useState } from "react";
// import { ChevronLeft, ChevronRight } from "react-icons/hi";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";

const logos = [
  "/logos/gifttree.png",
  "/logos/sasha.png",
  "/logos/euroflor.png",
  "/logos/dimmen.png",
  "/logos/harry.png",
  "/logos/costa.png",
];

const Partners = () => {
  const [start, setStart] = useState(0);
  const visible = 4;

  const prev = () => {
    setStart(start === 0 ? logos.length - visible : start - 1);
  };

  const next = () => {
    setStart(start + visible >= logos.length ? 0 : start + 1);
  };

  return (
    <section className="bg-[#f6f1eb] py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Text */}
        <p className="text-gray-600 italic mb-12 max-w-3xl mx-auto">
          Our pride is in working with exceptional companies to deliver stunning
          bouquets and create flower decorations.
        </p>

        {/* Slider */}
        <div className="relative flex items-center justify-center gap-6">

          {/* Left Arrow */}
          <button
            onClick={prev}
            className="absolute left-0 p-2 text-gray-500 hover:text-black"
          >
            <FaChevronLeft size={28} />
          </button>

          {/* Logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full px-12">
            {logos.slice(start, start + visible).map((logo, index) => (
              <div
                key={index}
                className="bg-[#f3eee8] h-32 flex items-center justify-center rounded-md"
              >
                <img
                  src={logo}
                  alt="partner"
                  className="max-h-12 opacity-80"
                />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            className="absolute right-0 p-2 text-gray-500 hover:text-black"
          >
           <FaChevronRight size={28} />

          </button>

        </div>
      </div>
    </section>
  );
};

export default Partners;
