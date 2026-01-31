// import { FaMotorcycle, FaFlower, FaPalette, FaServicestack } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa";

const Features = () => {
  const featureData = [
    {
      icon: <FaMotorcycle className="text-3xl mb-4" />,
      title: "Fast Delivery 24/7",
      description: "Forgot about an important date? Order flowers right now!",
    },
    {
      icon: <FaFlower className="text-3xl mb-4" />,
      title: "Only Fresh Flowers",
      description: "All flowers are freshly cut and always meet your expectations.",
    },
    {
      icon: <FaPalette className="text-3xl mb-4" />,
      title: "Made by Artists",
      description: "We create not just bouquets but real works of floral art.",
    },
    {
      icon: <FaServicestack className="text-3xl mb-4" />,
      title: "Range of Services",
      description: "We also offer decoration, floral design, and other services.",
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {featureData.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            {feature.icon}
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <hr className="border-t-2 border-gray-200 w-12 mb-2" />
            <p className="text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
