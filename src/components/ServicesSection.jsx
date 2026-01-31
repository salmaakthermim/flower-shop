import {
    GiForkKnifeSpoon,
    GiBigDiamondRing,
    GiPartyPopper,
    GiCoffin,
    GiTrophyCup,
  } from "react-icons/gi";
  
  const services = [
    {
      icon: <GiForkKnifeSpoon />,
      title: "Restaurants",
      desc: "Flower decorations for restaurants and cafes.",
    },
    {
      icon: <GiBigDiamondRing />,
      title: "Weddings",
      desc: "Beautiful bridal bouquets and flower archs.",
    },
    {
      icon: <GiPartyPopper />,
      title: "Parties",
      desc: "Bright flower arrangements for themed parties.",
    },
    {
      icon: <GiCoffin />,
      title: "Funerals",
      desc: "Express your grief with the right flowers.",
    },
    {
      icon: <GiTrophyCup />,
      title: "Sports & Media",
      desc: "Identical bouquets for competition winners.",
    },
  ];
  
  const ServicesSection = () => {
    return (
      <section className="bg-[#f7f2ec] py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 text-center">
          {services.map((item, index) => (
            <div key={index} className="space-y-4">
              <div className="text-4xl text-gray-500 flex justify-center">
                {item.icon}
              </div>
  
              <h3 className="text-lg font-serif text-gray-700">
                {item.title}
              </h3>
  
              <div className="w-10 h-[2px] bg-blue-200 mx-auto"></div>
  
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default ServicesSection;
  