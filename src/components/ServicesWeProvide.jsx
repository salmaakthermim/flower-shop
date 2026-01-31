const services = [
    {
      title: "Decoration",
      desc: "We create elegant flower decorations for homes, offices, shops, and other locations. Contact us if you want to demonstrate your style and taste to your guests, clients or visitors.",
      img: "/src/assets/service1.PNG",
    },
    {
      title: "Events",
      desc: "We know that details matter. That's why we provide and arrange flowers for private and corporate celebrations, charity galas, product launches, and other important events. Come to us to make your event an all-time memory.",
      img: "/src/assets/service2.PNG",
    },
    {
      title: "Floral Design",
      desc: "Our design team is always here to arrange unique and beautiful bouquets and flower compositions. Hurry up to surprise your loved ones and add some personal touch to your gifts.",
      img: "/src/assets/service3.PNG",
    },
  ];
  
  const ServicesWeProvide = () => {
    return (
      <section className="bg-[#f7f2ec] py-20">
        <div className="container mx-auto px-6">
  
          {/* Header */}
          <div className="text-center mb-14">
            <p className="italic text-sm text-gray-400">Our services</p>
            <h2 className="text-4xl font-serif text-gray-700 mt-2">
              Services We Provide
            </h2>
            <div className="w-12 h-[2px] bg-blue-200 mx-auto my-4"></div>
            <p className="text-gray-500 max-w-xl mx-auto">
              We offer a variety of floral services, from unique bouquets to event decoration.
            </p>
          </div>
  
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((item, index) => (
              <div key={index} className="space-y-6">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[320px] object-cover"
                />
  
                <h3 className="text-xl font-serif text-gray-700 flex items-center gap-4">
                  <span className="text-gray-400">—</span> {item.title}
                </h3>
  
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default ServicesWeProvide;
  