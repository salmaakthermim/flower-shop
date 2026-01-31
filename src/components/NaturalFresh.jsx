const NaturalFresh = () => {
    return (
      <section className="bg-[#f7f3ee] py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-50 items-center">
          
          {/* Left Content */}
          <div>
            <p className="italic text-gray-400 mb-2">How we create bouquets</p>
  
            <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-6">
              Natural Fresh Bouquets
            </h1>
  
            <div className="w-16 h-[2px] bg-gray-300 mb-6"></div>
  
            <p className="text-gray-600 mb-4">
              We work with only fresh-cut and high-quality flowers.
            </p>
  
            <p className="text-gray-500 leading-relaxed mb-8">
              Creating bouquets is an art, and our florists are artists. 
              We use the highest quality flowers from local greenhouses 
              and suppliers from the Netherlands and France to create unique arrangements.
            </p>
  
            {/* Special Collection */}
            <div className="flex items-start gap-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS__kmq6JOilOSOhJIN_V5wNVdQimWCikiraQ&s"
                alt="flower"
                className="w-30 h-30 rounded-full object-cover"
              />
  
              <div>
                <h3 className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
                  Special Flower Collections
                  <span className="text-xl">→</span>
                </h3>
  
                <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                  Do you have a wedding or children's birthday? 
                  Or do you just want to please loved ones while being far away?
                  Our florists will do everything possible to create the best bouquet for you.
                </p>
              </div>
            </div>
          </div>
  
          {/* Right Image */}
          <div className="flex  justify-center">
            <div className="border-[10px] border-[#eee7df] rounded-t-full rounded-b-full p-2">
              <img
                src="https://i.ibb.co.com/6cn1dW8Y/Capture.png"
                alt="Bouquet"
                className="rounded-t-full rounded-b-full object-cover w-[320px] h-[450px]"
              />
            </div>
          </div>
  
        </div>
      </section>
    );
  };
  
  export default NaturalFresh;
  

