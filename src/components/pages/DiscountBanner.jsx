const DiscountBanner = () => {
    return (
      <section className="bg-[#bfc6cb] relative overflow-hidden">
        {/* Background floral overlay */}
        <div
          className="absolute inset-0 opacity-20 bg-no-repeat bg-right bg-contain"
          style={{
            backgroundImage:
              "url('https://t3.ftcdn.net/jpg/05/01/11/30/360_F_501113026_AKXrCaUD8B7zE0eyn1SWyjGBGmLHfgeR.jpg')",
          }}
        ></div>
  
        <div className="relative max-w-7xl mx-auto px-6 py-28">
          <div className="max-w-2xl text-white">
            <p className="tracking-widest mb-4">%%% %%%</p>
  
            <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-6">
              Get Your First Order with a <br /> 15% Discount!
            </h1>
  
            <p className="text-white/90 mb-4">
              Get advantage of our special offer applicable to any bouquet or
              service.
            </p>
  
            <p className="text-sm italic text-white/80 mb-8">
              * To get the discount, use the promo code{" "}
              <span className="font-semibold">SAMIFLO</span> when submitting your
              order.
            </p>
  
            <button className="font-script text-xl underline underline-offset-4 hover:opacity-80 transition">
              Make first order
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default DiscountBanner;
  