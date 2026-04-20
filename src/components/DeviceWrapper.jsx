import { useState } from "react";
import { FaDesktop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";

const DeviceWrapper = ({ children }) => {
  const [device, setDevice] = useState("desktop");

  const getWidth = () => {
    if (device === "mobile") return "w-[375px]";
    if (device === "tablet") return "w-[768px]";
    return "w-full";
  };

  const activeBtn = "bg-pink-500 text-white";
  const normalBtn = "bg-white text-gray-700";

  return (
    <div className="min-h-screen bg-gray-200">

      {/* 🔥 Top Device Switcher */}
      <div className="sticky top-0 z-50 bg-white shadow-md p-3 flex justify-center gap-4">
        <button
          onClick={() => setDevice("desktop")}
          className={`p-2 rounded-lg transition ${
            device === "desktop" ? activeBtn : normalBtn
          }`}
        >
          <FaDesktop size={20} />
        </button>

        <button
          onClick={() => setDevice("tablet")}
          className={`p-2 rounded-lg transition ${
            device === "tablet" ? activeBtn : normalBtn
          }`}
        >
          <FaTabletAlt size={20} />
        </button>

        <button
          onClick={() => setDevice("mobile")}
          className={`p-2 rounded-lg transition ${
            device === "mobile" ? activeBtn : normalBtn
          }`}
        >
          <FaMobileAlt size={20} />
        </button>
      </div>

      {/* 🔥 Website Preview Frame */}
      <div className="flex justify-center p-6 transition-all duration-500">
        <div
          className={`${getWidth()} bg-white shadow-2xl transition-all duration-500 overflow-auto`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default DeviceWrapper;