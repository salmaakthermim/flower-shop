const AboutHero = () => {
    return (
      <section className="bg-[#f7f3ee] py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
  
          {/* LEFT CONTENT */}
          <div>
            <div className="w-16 h-[1px] bg-gray-300 mb-6"></div>
  
            <h1 className="text-4xl lg:text-5xl font-serif text-[#6b665a] leading-snug mb-6">
              We Create Flower Bouquets and Arrangements for Any Occasion
            </h1>
  
            <p className="text-[#9a9589] leading-relaxed max-w-xl mb-8">
              We are a small yet professional flower studio based in NY. Our mission
              is to make your lives brighter and beautiful, help you impress guests
              during important events, and make your loved ones happy with wonderful
              bouquets and flower arrangements.
            </p>
  
            <button className="bg-[#7b7a5a] text-white px-8 py-3 text-sm tracking-widest hover:bg-[#6a694c] transition">
              ORDER FLOWERS
            </button>
          </div>
  
          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-[300px] md:w-[380px] h-[520px] rounded-[180px] border border-[#ddd8cc] flex items-center justify-center">
              
              <div className="w-[260px] md:w-[330px] h-[480px] rounded-[160px] overflow-hidden">
                <img
                  src="https://cdn.pixabay.com/photo/2024/07/14/14/42/woman-8894656_1280.jpg"
                  alt="Flower Arrangement"
                  className="w-full h-full object-cover"
                />
              </div>
  
            </div>
          </div>
  
        </div>
      </section>
    );
  };
  
  export default AboutHero;
  