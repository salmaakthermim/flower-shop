import React from "react";

const AboutSection = () => {
  return (
    <section className="bg-[#F8F6F2] py-16 px-4 md:px-16 flex flex-col md:flex-row items-center md:items-start gap-10">
      {/* Left Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="overflow-hidden rounded-tl-[50px] rounded-br-[50px] border border-gray-200">
          <img
            src="https://i.ibb.co.com/xqGWbTbh/Capture.png" // replace with your image path
            alt="Flower arrangement"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Text */}
      <div className="w-full md:w-1/2">
        <p className="text-sm text-gray-400 italic mb-2">About us</p>
        <h2 className="text-5xl md:text-5xl font-serif font-semibold text-gray-500 mb-4">
          Our Mission is to Make <br /> Your Lives Beautiful
        </h2>
        <p className="text-2xl font-semibold text-gray-400 mb-6">
          We are a small yet professional flower studio based in NY.
        </p>
        <p className= " text-2xl text-gray-400 mb-8">
          Our mission is to make your lives <em>brighter and beautiful</em>, help
          you impress guests during important events, and make your loved ones
          happy with <em>wonderful bouquets</em> and flower arrangements.
        </p>

        {/* Feature Box */}
        <div className="flex items-center gap-4 bg-gray-200 rounded-lg p-4 max-w-md">
          <div className="bg-gray-400 text-white p-4 rounded-full">
            {/* Icon placeholder */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7h2M7 3v2m0 16v2m4-20h2m4 0h2m-2 20h-2m0-20v2m0 16v2m4-2h2m-6-6h2M9 9h2m2 6h2"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">
              Elegant Compositions from $59
            </h4>
            <p className="text-gray-500 text-sm">
              Order fresh and stylish flower arrangements at Sami's Flowers! We
              offer different bouquets for fair prices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
