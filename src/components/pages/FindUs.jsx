const FindUs = () => {
  return (
    <section className="bg-[#f7f3ee] py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT IMAGE */}
        <div className="flex justify-center">
          <div className="relative w-[300px] sm:w-[400px] md:w-[400px] aspect-[3/4] rounded-[50%] overflow-hidden border border-[#e2ded3]">
            <img
              src="https://i.ibb.co.com/KgPXB9d/Screenshot-13.png"
              alt="Flower shop"
              className="w-100 h-140 object-cover"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <span className="text-sm italic text-gray-400">Our store</span>

          <h2 className="text-4xl md:text-5xl font-serif text-gray-700 mt-2">
            Were Can You Find Us?
          </h2>

          <div className="w-12 h-[2px] bg-gray-400 mt-4 mb-6" />

          {/* Address + Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-500">
            <div className="space-y-1">
              <p>Goddard Hall 80</p>
              <p>Washington Square E,</p>
              <p>New York, NY 10003, USA</p>
            </div>

            <div className="space-y-1">
              <p>+1 (234) 567 89 01</p>
              <p>+1 (234) 567 89 00</p>
              <p>samjsflowers@email.com</p>
            </div>
          </div>

          <hr className="my-8 border-[#ddd8cc]" />

          {/* Opening Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600">
            <div>
              <p className="font-medium">Monday – Friday:</p>
              <p className="text-sm mt-1">7am – 7pm</p>
            </div>

            <div>
              <p className="font-medium">Saturday – Sunday:</p>
              <p className="text-sm mt-1">8am – 7pm</p>
            </div>
          </div>

          {/* Button */}
          <button className="mt-10 px-10 py-3 border border-gray-500 text-gray-600 tracking-widest text-sm hover:bg-gray-700 hover:text-white transition">
            VIEW ON MAP
          </button>
        </div>

      </div>
    </section>
  );
};

export default FindUs;
