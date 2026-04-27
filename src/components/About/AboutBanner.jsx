const AboutBanner = () => {
    return (
      <section className="relative w-full h-[260px] overflow-hidden"
        style={{ background: "linear-gradient(135deg, #2d5a3d 0%, #4a8a5d 50%, #6aaa7d 100%)" }}
      >
        <div className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle at 15% 60%, rgba(232,160,180,0.3) 0%, transparent 45%), radial-gradient(circle at 85% 20%, rgba(255,255,255,0.12) 0%, transparent 40%)" }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <p className="section-label text-[#e8a0b4] mb-3">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white font-medium mb-3">
            About Fiorello
          </h1>
          <p className="text-sm text-white/70 tracking-wide">
            Home <span className="mx-2">›</span>
            <span className="text-white">About us</span>
          </p>
        </div>
      </section>
    );
  };
  
  export default AboutBanner;
  