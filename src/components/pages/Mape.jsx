import React from "react";

const Map = () => {
  return (
    <section className="bg-[#f7f3ee] dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <div className="overflow-hidden rounded-lg shadow-lg h-96">
          <iframe
            title="Bangladesh Map"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://maps.google.com/maps?q=Bangladesh&z=7&output=embed"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Map;
