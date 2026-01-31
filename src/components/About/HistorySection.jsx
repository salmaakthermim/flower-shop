import React from "react";

const HistorySection = () => {
  return (
    <section className="bg-[#f7f3ee] py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* LEFT IMAGE */}
        <div className="flex relative w-[300px] md:w-[380px] h-[520px]  justify-center rounded-[180px] border border-[#ddd8cc]">
          <div className="w-[260px] md:w-[330px] h-[480px] rounded-[160px] mt-4 overflow-hidden">
            <img
              src="https://cdn.pixabay.com/photo/2017/10/05/06/46/asia-2818564_1280.jpg"
              alt="Flower Studio"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <span className="text-sm italic text-gray-400">History</span>

          <h2 className="text-4xl font-serif text-gray-800 mt-3">
            How Our Studio Started
          </h2>

          <p className="text-gray-500 mt-4">
            It all started with a great love for flowers.
          </p>

          <p className="text-gray-500 mt-6 leading-relaxed">
            In early 2015, Sami Smith was walking down the street and saw florists
            working in one of the trendy florist shops. She was impressed by the
            beauty of freshly-cut flowers and bouquets.
          </p>

          <p className="text-gray-500 mt-4 leading-relaxed">
            She borrowed some money, took a florist course, and opened her small
            studio in the Bronx. Very quickly, her bouquets became very popular.
            Six months later, <span className="italic">Mioko Sudoru</span> joined
            Sami, and together they continued to develop their business and moved
            to Manhattan.
          </p>

          {/* SMALL CARD */}
          <div className="flex items-center gap-4 mt-8">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWHXqg7ZF-G6eyNM_29V4LWzea6vo_7Mf7ow&s"
              alt="Studio 2015"
              className="w-16 h-16 rounded-full object-cover border-2 border-white"
            />

            <div>
              <h4 className="font-medium text-gray-700">
                Our Studio in 2015
              </h4>
              <p className="text-sm text-gray-400">
                This is what our flower shop looked like when it opened
              </p>
              <p className="text-xs italic text-gray-400 mt-1">
                ph. by Michael Nilson (2015, 15 of April)
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HistorySection;
