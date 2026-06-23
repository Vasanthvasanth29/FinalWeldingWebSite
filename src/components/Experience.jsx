import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import masterWelder from '../assets/images/master_welder.png';

const AnimatedCounter = ({ from, to, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * (to - from) + from));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const Experience = () => {
  return (
    <section id="about" className="bg-[#0a0a0a] min-h-screen flex items-center pt-44 pb-32 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Texture Background */}
      <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none mix-blend-overlay">
        <img src="/images/industrial_shed.png" alt="" className="w-full h-full object-cover grayscale blur-[2px]" />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

      {/* Optimized ambient light */}
      <div className="absolute top-[-10%] right-1/3 w-[500px] h-[500px] bg-brand-primary/[0.04] -z-10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-1/4 w-[400px] h-[400px] bg-brand-primary/[0.03] -z-10 rounded-full blur-[100px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Visual Showcase */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[400px] sm:h-[600px] md:h-[700px] w-full group rounded-[2.5rem] overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-700"></div>
            <img 
              src={masterWelder} 
              alt="Master of Metallurgy" 
              className="w-full h-full object-cover saturate-[1.15] contrast-[1.1] transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Precision Frame Brackets */}
            <div className="absolute top-12 left-12 w-24 h-24 border-t-2 border-l-2 border-brand-primary/40 z-20 group-hover:w-32 group-hover:h-32 transition-all duration-700"></div>
            <div className="absolute bottom-12 right-12 w-24 h-24 border-b-2 border-r-2 border-brand-primary/40 z-20 group-hover:w-32 group-hover:h-32 transition-all duration-700"></div>
            
            {/* Status Info Overlay */}
            <div className="absolute bottom-6 left-6 md:bottom-16 md:left-16 z-20">
               <div className="flex items-center gap-4 bg-black/80 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-2xl shadow-2xl">
                  <div className="w-3 h-3 bg-brand-primary rounded-full animate-pulse shadow-[0_0_10px_#ff8c00]"></div>
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/80">Active Operations</span>
               </div>
            </div>
          </motion.div>

          {/* Narrative & Statistics */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="label-tag border-brand-primary/20 bg-brand-primary/5 text-brand-primary w-max mb-10">
              OUR INDUSTRIAL HERITAGE
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-10 text-white uppercase leading-[0.9]">
              Forging <br />
              <span className="text-brand-primary italic font-serif tracking-normal normal-case">Modern Legacies.</span>
            </h2>
            <p className="text-white/40 text-lg md:text-xl leading-relaxed mb-16 max-w-xl font-medium">
              GV Welding Works is founded on unyielding quality and mastery of metallurgy. We do not just construct gates; we engineer permanence. Every project is executed by certified master artisans using elite structural materials.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 border-t border-white/5 pt-16">
              
              <div className="flex flex-col gap-4 group">
                <span className="text-7xl font-black text-white tracking-tighter group-hover:text-brand-primary transition-colors duration-500">
                  <AnimatedCounter from={0} to={25} suffix="+" />
                </span>
                <div>
                  <h4 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-1">Decades Active</h4>
                  <p className="text-white/30 text-xs font-medium uppercase tracking-[0.1em]">Established Heritage</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 group">
                <span className="text-7xl font-black text-white tracking-tighter group-hover:text-brand-primary transition-colors duration-500">
                  <AnimatedCounter from={0} to={500} suffix="+" />
                </span>
                <div>
                  <h4 className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-1">Global Delivery</h4>
                  <p className="text-white/30 text-xs font-medium uppercase tracking-[0.1em]">Projects Fabricated</p>
                </div>
              </div>

            </div>

            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-px bg-gradient-to-r from-brand-primary/40 to-transparent mt-16"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
