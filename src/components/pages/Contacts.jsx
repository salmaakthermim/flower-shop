// src/pages/Contacts.jsx
import React from 'react';

const Contacts = () => {
  return (
    <section className="relative w-full h-[260px] bg-[#c9cbb5] overflow-hidden">
        
    {/* Background floral pattern (optional image) */}
    <div className="absolute inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOCifMr_agLUjm47kuwyhcDJCNcx_vqLkFbg&s')] bg-cover bg-center opacity-20"></div>

    {/* Content */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-4xl md:text-5xl font-serif text-white mb-3">
        Contact Us
      </h1>

      <p className="text-sm text-white/80">
        Home <span className="mx-1">›</span>
        <span className="underline">contact us</span>
      </p>
    </div>
  </section>
  );
};

export default Contacts;
