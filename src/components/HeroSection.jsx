const HeroSection = () => {
    return (
      <section className="bg-[#6b6b4d]  min-h-[80vh] flex items-center">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-gray-400 leading-snug">
              Beautiful <span className="italic text-white">Compositions</span> for Any{" "}
              <span className="underline">Occasion</span>
            </h1>
  
            <p className="mt-4 text-gray-600 max-w-md">
              Surprise your loved ones and make any holiday even happier!
            </p>
  
            <ul className="flex gap-6 mt-6 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-xl text-white">*</span> Wedding Flowers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-xl text-white">*</span> Prom Flowers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-xl text-white">*</span> Flower Crowns
              </li>
            </ul>
  
            <button className="mt-8 bg-gray-700 text-white px-8 py-3 tracking-wide hover:bg-gray-800 transition">
              ORDER FLOWERS
            </button>
          </div>
  
          {/* Right Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src="https://i.ibb.co.com/QV6ssSC/Capture-PNG33.png"
              alt="Flower Bouquet"
              className="max-h-[500px] object-contain"
            />
          </div>
        </div>
      </section>
    );
  };
  
  export default HeroSection;
  