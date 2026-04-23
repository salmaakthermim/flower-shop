import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1600",
    label: "New Spring Collection",
    title: "Beautiful Flowers\nfor Every Moment",
    subtitle: "Handcrafted with love — fresh blooms delivered to your door.",
    cta: "Shop Now",
    ctaLink: "/shop",
    accent: "#e8a0b4",
    overlay: "from-[#0d1f0d]/75 via-[#0d1f0d]/45 to-transparent",
  },
  {
    id: 2,
    image: "https://thumbs.dreamstime.com/b/flower-frame-banner-beautiful-flowers-background-wedding-scene-173630820.jpg",
    label: "Wedding Specials",
    title: "Make Your Day\nUnforgettable",
    subtitle: "Elegant bridal bouquets and floral arrangements for your special day.",
    cta: "Explore Collections",
    ctaLink: "/shop",
    accent: "#fff",
    overlay: "from-[#1a0a0a]/70 via-[#1a0a0a]/40 to-transparent",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=1600",
    label: "Seasonal Bouquets",
    title: "Fresh Blooms\nEvery Season",
    subtitle: "Discover our curated seasonal collections — nature's finest, arranged for you.",
    cta: "View Bouquets",
    ctaLink: "/shop",
    accent: "#e8a0b4",
    overlay: "from-[#0a1a0a]/70 via-[#0a1a0a]/40 to-transparent",
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
};

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next, paused]);

  const slide = slides[current];

  return (
    <section
      className="relative w-full h-[92vh] min-h-[600px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt="hero" className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-8 md:px-16 w-full">
          <AnimatePresence mode="wait">
            <motion.div key={`content-${current}`} className="max-w-2xl">
              <motion.span
                custom={0} variants={textVariants} initial="hidden" animate="visible" exit="exit"
                className="inline-block text-[10px] tracking-[0.35em] uppercase font-medium mb-5 px-4 py-1.5 border rounded-full"
                style={{ color: slide.accent, borderColor: `${slide.accent}60` }}
              >
                {slide.label}
              </motion.span>

              <motion.h1
                custom={1} variants={textVariants} initial="hidden" animate="visible" exit="exit"
                className="text-5xl md:text-7xl font-serif font-medium text-white leading-[1.1] mb-6 whitespace-pre-line"
              >
                {slide.title}
              </motion.h1>

              <motion.p
                custom={2} variants={textVariants} initial="hidden" animate="visible" exit="exit"
                className="text-white/75 text-base md:text-lg leading-relaxed mb-10 max-w-md"
              >
                {slide.subtitle}
              </motion.p>

              <motion.div
                custom={3} variants={textVariants} initial="hidden" animate="visible" exit="exit"
                className="flex gap-4 flex-wrap"
              >
                <Link to={slide.ctaLink} className="btn-primary">{slide.cta}</Link>
                <Link to="/about" className="btn-secondary">Our Story</Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Arrows */}
      <button onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white text-2xl flex items-center justify-center transition-all duration-300 rounded-full">
        ‹
      </button>
      <button onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white text-2xl flex items-center justify-center transition-all duration-300 rounded-full">
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`hero-dot ${i === current ? "active" : ""}`} />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute bottom-8 right-8 z-20 text-white/60 text-xs tracking-widest">
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>

      {/* Stats */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-8 md:px-16 pb-8 hidden md:flex gap-16">
          {[["500+", "Happy Clients"], ["12+", "Years Experience"], ["50+", "Flower Types"]].map(([num, label]) => (
            <div key={label} className="text-white">
              <p className="text-2xl font-serif">{num}</p>
              <p className="text-[9px] tracking-[0.25em] text-white/60 uppercase mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
