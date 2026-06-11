import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

const images = [
  // Gates
  { src: "/images/Gate/gate_1.jpg", title: "Modern Luxury Gate", category: "Gates" },
  { src: "/images/Gate/gate_2.png", title: "Classic Wrought Iron", category: "Gates" },
  { src: "/images/Gate/gate_3.jpg", title: "Elite Entrance Gate", category: "Gates" },
  { src: "/images/Gate/gate_4.jpg", title: "Custom Security Gate", category: "Gates" },
  { src: "/images/Gate/gate_5.jpg", title: "Industrial Slide Gate", category: "Gates" },
  { src: "/images/Gate/gate_6.jpg", title: "Artistic Iron Work", category: "Gates" },
  { src: "/images/Gate/gate_7.png", title: "Premium Grill Gate", category: "Gates" },
  { src: "/images/Gate/gate_8.png", title: "Ornate Steel Gate", category: "Gates" },
  
  // Stairs
  { src: "/images/Stairs/stairs_1.jpg", title: "Industrial Steel Stairs", category: "Stairs" },
  { src: "/images/Stairs/stairs_2.jpg", title: "Minimalist Railing", category: "Stairs" },
  { src: "/images/Stairs/stairs_3.jpg", title: "Floating Staircase", category: "Stairs" },
  { src: "/images/Stairs/stairs_4.jpg", title: "Spiral Metal Stairs", category: "Stairs" },
  { src: "/images/Stairs/stairs_5.jpg", title: "Heavy Duty Framework", category: "Stairs" },
  { src: "/images/Stairs/stairs_6.jpg", title: "Commercial Railing", category: "Stairs" },
  { src: "/images/Stairs/stairs_7.jpg", title: "Bespoke Stair Design", category: "Stairs" },
  
  // Window Frames
  { src: "/images/window/window_1.jpg", title: "Precision Window Grill", category: "Window Frames" },
  { src: "/images/window/window_2.jpg", title: "Security Grill Work", category: "Window Frames" },
  { src: "/images/window/window_3.jpg", title: "Modern Window Frame", category: "Window Frames" },
  { src: "/images/window/window_4.jpg", title: "Custom Metal Screen", category: "Window Frames" },
  { src: "/images/window/window_5.jpg", title: "Protective Steel Grill", category: "Window Frames" },
  { src: "/images/window/window_6.jpg", title: "Architectural Window", category: "Window Frames" },
  { src: "/images/window/window_7.jpg", title: "Designer Metal Grill", category: "Window Frames" },
  { src: "/images/window/window_8.jpg", title: "Fortified Security Window", category: "Window Frames" },
  
  // Roofing & Shelters
  { src: "/images/roof/roof_1.png", title: "Structural Roofing", category: "Roofing" },
  { src: "/images/roof/roof_2.png", title: "Galvanized Roof Support", category: "Roofing" },
  { src: "/images/roof/roof_3.jpeg", title: "Industrial Roof Frame", category: "Roofing" },
  { src: "/images/shelter/shelter_1.png", title: "Industrial Shelter", category: "Shelters" },
  { src: "/images/shelter/shelter_2.png", title: "Premium Parking Canopy", category: "Shelters" },
];

const categories = ["All", "Gates", "Stairs", "Window Frames", "Roofing", "Shelters"];

const Gallery = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const categoryMap = {
        'gates': 'Gates',
        'stairs': 'Stairs',
        'staircases': 'Stairs',
        'window-frames': 'Window Frames',
        'roofing': 'Roofing',
        'shelter': 'Shelters',
        'shelters': 'Shelters',
        'all': 'All'
      };
      const matchedCategory = categoryMap[categoryParam.toLowerCase()];
      if (matchedCategory) setActiveCategory(matchedCategory);
    }
  }, [searchParams]);

  const filteredImages = activeCategory === "All" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const visibleImages = filteredImages.slice(0, visibleCount);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(8);
  };

  return (
    <section id="gallery" className="relative py-24 md:py-32 overflow-hidden min-h-screen">
      
      {/* Cinematic Background Layers (Subtle Workshop visibility) ── */}
      {/* Base darker-to-dark gradient for atmosphere */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-black/35 to-black/65" 
      />
      
      {/* Branded Center Glow (Adds cinematic depth behind grid) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.04),transparent_70%)]" 
      />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="label-tag border-brand-primary/20 bg-brand-primary/5 text-brand-primary">
                ESTABLISHED EXCELLENCE
              </div>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-white mt-6 uppercase leading-[0.9]"
            >
              Crafting <span className="text-brand-primary">Legacies</span> <br /> 
              <span className="text-white/40 italic font-serif normal-case tracking-normal">
                {activeCategory === "All" ? "in every weld." : `${activeCategory} Projects`}
              </span>
            </motion.h2>
          </div>
          
          {/* Category Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            {categories.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border ${
                  activeCategory === cat 
                  ? "bg-brand-primary border-brand-primary text-black shadow-[0_10px_30px_rgba(255,140,0,0.3)]" 
                  : "bg-white/5 border-white/5 text-white/50 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {visibleImages.map((img, idx) => (
              <motion.div
                key={img.src || idx}
                layout
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 30 },
                  visible: { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0, 
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
                  }
                }}
                className="interactive-card group relative flex flex-col h-[520px] overflow-hidden rounded-[2.8rem] bg-[#0a0a0a]/40 backdrop-blur-md border border-white/[0.07] shadow-[0_30px_70px_rgba(0,0,0,0.7)] hover:border-brand-primary/30 transition-all duration-700"
              >
                {/* Subtle Inner depth layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none z-[1]" />
                
                {/* Industrial Grain Texture */}
                <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />

                {/* Cinematic Image Container */}
                <div className="relative h-72 xl:h-80 overflow-hidden">
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    loading="lazy"
                    className="w-full h-full object-cover brightness-[0.8] contrast-[1.1] transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-[#0a0a0a] z-10" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
                </div>
                
                {/* Refined Content Area */}
                <div className="p-8 flex-grow flex flex-col items-start relative z-20 -mt-12 bg-transparent">
                  <span className="text-brand-primary/80 text-[10px] font-black uppercase tracking-[0.4em] block mb-3">
                    {img.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-white tracking-[0.04em] uppercase group-hover:text-brand-primary transition-colors duration-500">
                    {img.title}
                  </h3>

                  <div className="mt-auto pt-6 w-full flex items-center gap-4 opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="w-8 h-[1px] bg-brand-primary"></div>
                    <span className="text-[9px] font-black uppercase tracking-[.3em] text-white">Project Detail</span>
                  </div>
                </div>

                {/* Precision Highlight */}
                <div className="absolute inset-0 pointer-events-none rounded-[2.8rem] border border-white/[0.05] group-hover:border-brand-primary/20 transition-all duration-700" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Action Section */}
        {visibleCount < filteredImages.length && (
          <div className="mt-24 flex flex-col items-center pb-12">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setVisibleCount(prev => prev + 8)}
              className="flex flex-col items-center gap-6 group"
            >
              <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-primary group-hover:shadow-[0_0_30px_rgba(255,140,0,0.2)] transition-all duration-700">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white group-hover:text-brand-primary transition-colors duration-500">
                  <path d="M7 13L12 18L17 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-[10px] uppercase tracking-[.4em] font-black text-white/30 group-hover:text-white transition-colors">Expand Showcase</span>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
