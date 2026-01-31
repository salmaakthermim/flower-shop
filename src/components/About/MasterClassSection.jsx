import React from "react";

const MasterClassSection = () => {
  return (
    <section className="bg-[#f7f3ee] py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <span className="text-sm italic text-gray-400">
            Master classes
          </span>

          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mt-4 leading-snug">
            Registration for Master <br /> Classes in Sami's Flowers
          </h2>

          <div className="w-12 h-[2px] bg-gray-400 my-6"></div>

          <p className="text-gray-600 font-medium">
            Want to learn how to create bouquets yourself?
          </p>

          <p className="text-gray-500 mt-4 leading-relaxed max-w-xl">
            From time to time, we hold master classes for everyone who wants to
            learn how to work with flowers and create unique bouquets.
          </p>

          {/* CLASS LIST */}
          <div className="mt-10 space-y-6">

            {/* ITEM 1 */}
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
                alt=""
                className="w-14 h-14 rounded-full object-cover"
              />

              <div className="flex-1">
                <h4 className="font-serif text-lg text-gray-700">
                  Spring Flowers Composition
                </h4>
                <p className="text-sm text-gray-500">
                  Create your own flower arrangement with tulips and daffodils.
                </p>
              </div>

              <span className="font-serif text-lg text-gray-700">
                $50
              </span>
            </div>

            {/* ITEM 2 */}
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
                alt=""
                className="w-14 h-14 rounded-full object-cover"
              />

              <div className="flex-1">
                <h4 className="font-serif text-lg text-gray-700">
                  Rosy Roses Composition
                </h4>
                <p className="text-sm text-gray-500">
                  Learn how to work with roses of different species.
                </p>
              </div>

              <span className="font-serif text-lg text-gray-700">
                $60
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <button className="mt-10 px-8 py-3 bg-[#7a775f] text-white text-sm tracking-widest uppercase hover:bg-[#6a6854] transition">
            Sign Up
          </button>
        </div>
        
        <div className="w-full md:w-1/2 flex justify-center">
        <div className="overflow-hidden rounded-tl-[50px] rounded-br-[50px] border border-gray-200">
          <img
            src="https://i.ibb.co.com/xqGWbTbh/Capture.png" // replace with your image path
            alt="Flower arrangement"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      </div>
    </section>
  );
};

export default MasterClassSection;
