const collections = [
    {
      title: "Mother's Day Collection",
      desc: "One of the best and the most elegant ways to show your mother how much you love her is to present her a beautiful flower composition.",
      img: "https://i.ibb.co.com/rfmvNywR/Capture-PNG234.png",
    },
    {
      title: "Valentine's Day Collection",
      desc: "If you're looking for a unique gift to your loved one, check out this fantastic collection. It'll help you make Valentine's Day really special!",
      img: "https://i.ibb.co.com/4gS63YLg/Capture-PNG1.png",
    },
    {
      title: "Autumn Collection",
      desc: "Order bouquets from this beautiful special collection and focus on picking the presents to match them, while we'll arrange the flowers.",
      img: "https://i.ibb.co.com/qLDfj7mK/Capture-PNG55555.png",
    },
  ];
  
  export default function SpecialFlowerCollections() {
    return (
      <section className="bg-[#f7f3ef] py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Heading */}
          <p className="italic text-gray-400 mb-2">Special</p>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-700">
            Special Flower Collections
          </h2>
          <div className="w-16 h-[2px] bg-gray-400 mx-auto my-6"></div>
          <p className="max-w-2xl mx-auto text-gray-500 mb-14">
            Need to pick a gift for a specific event? We can help you even if you
            are short of time.
          </p>
  
          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-10">
            {collections.map((item, index) => (
              <div key={index} className="text-left">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[260px] object-cover"
                />
                <h3 className="text-2xl font-serif text-gray-700 mt-6">
                  {item.title}
                </h3>
                <p className="text-gray-500 mt-4">{item.desc}</p>
                <button className="mt-6 bg-[#6b6b4d] text-white px-6 py-3 text-sm tracking-wider hover:bg-[#5a5a3f] transition">
                  ORDER NOW
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  