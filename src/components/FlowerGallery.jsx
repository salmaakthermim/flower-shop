const FlowerGallery = () => {
    return (
      <section className="bg-[#f6f1eb] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Left big image */}
            <div className="md:row-span-2">
              <img
                src="https://i.ibb.co.com/JjNx8nFm/Capture-PNG1.png"
                alt="Flowers"
                className="w-130 h-120 object-cover rounded-md"
              />
            </div>
  
            {/* Middle small images */}
            <div className="grid grid-rows-2 gap-4">
              <img
                src="https://i.ibb.co.com/sJz3xQzt/Capture.png"
                alt=""
                className="w-60 h-60 object-cover rounded-md"
              />
              <img
                src="https://i.ibb.co.com/tTcdbRrY/Capture-PNG2.png"
                alt=""
                className="w-60 h-60  object-cover rounded-md"
              />
            </div>
  
           {/* Middle small images */}
           <div className="grid grid-rows-2 gap-4">
              <img
                src="https://i.ibb.co.com/4wSMnj8M/Capture-PNG6.png"
                alt=""
                className="w-150 h-60 object-cover rounded-md"
              />
              <img
                src="https://i.ibb.co.com/HLNqCmGD/Capture-PNG8.png"
                alt=""
                className="w-150 h-60  object-cover rounded-md"
              />
            </div>
  
            {/* Right big image */}
            <div className="md:row-span-2">
              <img
                src="https://i.ibb.co.com/XkbbfdBz/Capture-PNG3.png"
                alt=""
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
  
          {/* Bottom Content */}
          <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-600 max-w-2xl text-sm leading-relaxed">
              Buying flowers for your loved ones is an important way to show them
              that you care. Flowers have a powerful emotional impact, conveying
              love, sympathy, and other heartfelt sentiments.
            </p>
  
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#6b6a4d] flex items-center justify-center text-white text-xl">
                ☎
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Order Flowers Now
                </h4>
                <p className="text-gray-500 text-sm">
                  Call us: <span className="font-medium">+1 (234) 567 89 00</span>
                </p>
              </div>
            </div>
          </div>
  
        </div>
      </section>
    );
  };
  
  export default FlowerGallery;

// const images = [
//   "https://i.ibb.co.com/JjNx8nFm/Capture-PNG1.png",
//   "https://i.ibb.co.com/sJz3xQzt/Capture.png",
//   "https://i.ibb.co.com/tTcdbRrY/Capture-PNG2.png",
//   "https://i.ibb.co.com/4wSMnj8M/Capture-PNG6.png",
//   "https://i.ibb.co.com/HLNqCmGD/Capture-PNG8.png",
//   "https://i.ibb.co.com/XkbbfdBz/Capture-PNG3.png",
// ];

// export default function FlowerGallery() {
//   return (
//     <section className="bg-[#f7f3ef] py-16 px-4">
//       <div className="max-w-7xl mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
//         {images.map((img, index) => (
//           <div
//             key={index}
//             className="mb-6 overflow-hidden rounded-xl shadow-md group"
//           >
//             <img
//               src={img}
//               alt="Flower Gallery"
//               className="w-full h-full object-cover   "
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

  