const DeliveryConditions = () => {
    return (
      <section className="bg-[#f7f3ee] py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* LEFT SIDE */}
          <div>
            <span className="text-sm italic text-gray-400">Delivery</span>
            <h2 className="text-4xl font-serif text-gray-700 mt-2">
              Delivery Conditions
            </h2>
            <p className="text-gray-500 mt-4">
              Your order flowers — we deliver joy.
            </p>
  
            <div className="mt-12 space-y-8">
              {/* Item 1 */}
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-full bg-[#c9c6b8] flex items-center justify-center">
                  🚚
                </div>
                <div>
                  <h4 className="text-lg font-serif text-gray-700">
                    Same-Day Delivery
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    The bouquet must be ordered at least 1 hour before receiving it.
                  </p>
                </div>
              </div>
  
              {/* Item 2 */}
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-full bg-[#c9c6b8] flex items-center justify-center">
                  🏠
                </div>
                <div>
                  <h4 className="text-lg font-serif text-gray-700">
                    Free Delivery for Orders Over $59
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    The basic cost of delivery for orders less than $59 in NY is $15.
                  </p>
                </div>
              </div>
  
              {/* Item 3 */}
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-full bg-[#c9c6b8] flex items-center justify-center">
                  🌙
                </div>
                <div>
                  <h4 className="text-lg font-serif text-gray-700">
                    Deliveries at Night
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    Flowers delivery at night costs $100. No discounts or offers are eligible.
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          {/* RIGHT SIDE FORM */}
          <div>
            <form className="space-y-10">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-transparent border-b border-gray-400 focus:outline-none py-2"
              />
              <input
                type="text"
                placeholder="Phone number*"
                className="w-full bg-transparent border-b border-gray-400 focus:outline-none py-2"
              />
              <input
                type="email"
                placeholder="Email*"
                className="w-full bg-transparent border-b border-gray-400 focus:outline-none py-2"
              />
              <textarea
                placeholder="Message"
                rows="4"
                className="w-full bg-transparent border-b border-gray-400 focus:outline-none py-2 resize-none"
              />
  
              <button className="w-full bg-[#6f6b4e] text-white py-4 tracking-widest text-sm hover:bg-[#5e5a42] transition">
                ORDER FLOWERS
              </button>
            </form>
          </div>
  
        </div>
      </section>
    );
  };
  
  export default DeliveryConditions;
  