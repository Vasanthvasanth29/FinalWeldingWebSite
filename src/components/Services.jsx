import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
  { title: "Grill Gates", category: "Gates", description: "Custom designed sliding and swing grill gates offering high security with elegant aesthetics.", image: "/images/Gate/gate_6.jpg" },
  { title: "Steel Gates", category: "Gates", description: "Heavy-duty structural steel gates engineered for industrial, commercial, and luxury residential properties.", image: "/images/Gate/gate_1.jpg" },
  { title: "Window Frames", category: "Window Frames", description: "Precision-welded metal window frames and security grills built to withstand extreme pressure.", image: "/images/window/window_1.jpg" },
  { title: "Roofing Works", category: "Roofing", description: "Complete metal roofing framework structures fabricated with galvanized steel for absolute durability.", image: "/images/roof/roof_1.png" },
  { title: "Metal Staircases", category: "Stairs", description: "Bespoke internal and external metal staircases built for industrial strength and modern design.", image: "/images/Stairs/stairs_1.jpg" },
  { title: "Shelter Works", category: "Shelters", description: "Premium car parking shelters, outdoor canopies, and specialized shelter frames.", image: "/images/shelter/shelter_1.png" },
  { title: "Custom Fabrication", category: "All", description: "Bespoke metal structures, precise cutting, and purely engineering-driven custom projects.", image: "/images/Stairs/stairs_2.jpg" },
];

const Services = () => {
  const navigate = useNavigate();

  const handleExplore = (category) => {
    navigate(`/gallery?category=${category.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <section id="services" className="relative py-20 md:py-28 overflow-hidden z-10">
      
      {/* Background Suppression (Atmospheric Flow) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-0 pointer-events-none" />
      
      {/* Soft Branded Under-glow (Atmospheric depth) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-brand-primary/5 blur-[160px] rounded-full z-0 pointer-events-none" />
      
      {/* Subtle Depth Glow (Optimized for top-level visibility) */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-brand-primary/5 blur-[140px] rounded-full z-0 pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 mb-16 md:mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-brand-primary/50 font-black uppercase tracking-[0.7em] text-[10px] mb-8 inline-block">
            OUR CAPABILITIES
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight uppercase leading-none">
            EXPERT <span className="text-brand-primary drop-shadow-[0_0_30px_rgba(255,122,0,0.3)]">SERVICES</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-primary to-brand-primary/20 mx-auto rounded-full shadow-[0_0_20px_rgba(255,122,0,0.4)]" />
        </motion.div>
      </div>

      {/* Premium Luxury Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {services.map((service, index) => {
          const isLastCard = index === services.length - 1;
          const isSingleInLastRow = services.length % 3 === 1;
          const isEmphasized = isLastCard && isSingleInLastRow;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={isEmphasized ? "lg:col-span-1 lg:col-start-2 lg:z-20" : ""}
            >
              <div 
                className={[
                  "interactive-card group relative flex flex-col h-full overflow-hidden rounded-[2.8rem] bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-md border border-white/[0.07] transition-all duration-700 ease-out",
                  isEmphasized 
                    ? "border-brand-primary/30 shadow-[0_40px_100px_rgba(0,0,0,0.8),0_0_40px_rgba(255,122,0,0.08)] bg-white/[0.05]" 
                    : "shadow-[0_30px_70px_rgba(0,0,0,0.7)]"
                ].join(" ")}
              >
                {/* Subtle Inner depth layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none z-[1]" />
                
                {/* Industrial Grain Texture */}
                <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>

                {/* Cinematic Background Image */}
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover brightness-[0.9] contrast-[1.15] transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  />
                  {/* Multi-step cinematic fade for seamless image-to-content transition */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-[#0a0a0a] z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60 z-10" />
                </div>

                {/* Refined Content Area */}
                <div className="p-11 flex-grow flex flex-col items-start relative z-20 -mt-16 bg-[#0a0a0a]/40 backdrop-blur-sm rounded-t-[2.5rem]">
                  <div className="relative mb-6">
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-[0.04em] uppercase transition-all duration-500 group-hover:text-brand-primary drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-white/40 text-[15px] leading-[1.8] font-medium mb-12 flex-grow group-hover:text-white/70 transition-colors duration-500">
                    {service.description}
                  </p>

                  {/* PREMIUM CTA: Clickable & Intentional */}
                  <div 
                    onClick={() => handleExplore(service.category)}
                    className="group/cta flex items-center gap-5 cursor-pointer relative py-1"
                  >
                     <div className="relative overflow-hidden">
                        <span className="text-white/90 font-black uppercase tracking-[0.5em] text-[10px] group-hover/cta:text-brand-primary transition-colors duration-300 block">
                          EXPLORE
                        </span>
                        {/* Animated Underline */}
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-primary transform scale-x-0 group-hover/cta:scale-x-100 transition-transform duration-500 origin-left shadow-[0_0_8px_rgba(255,122,0,1)]" />
                     </div>
                    
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover/cta:border-brand-primary/40 group-hover/cta:bg-brand-primary/10 group-hover/cta:shadow-[0_0_20px_rgba(255,122,0,0.2)]">
                      <ArrowRight size={14} className="text-white/60 group-hover/cta:text-brand-primary transform transition-all duration-300 group-hover/cta:translate-x-1" />
                    </div>
                  </div>
                </div>

                {/* Final Polish: Precision Edge Highlight (Rim Lighting) */}
                <div className="absolute inset-0 pointer-events-none rounded-[2.8rem] border-t border-l border-white/[0.1] group-hover:border-white/[0.18] transition-colors duration-700" />
                
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 pointer-events-none rounded-[2.8rem] shadow-[inset_0_0_40px_rgba(255,255,255,0.01)] group-hover:shadow-[inset_0_0_60px_rgba(255,255,255,0.02)] transition-all duration-700" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="h-24 md:h-32" />
      
    </section>
  );
};

export default Services;
