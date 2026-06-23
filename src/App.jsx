import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Capabilities from './components/Capabilities';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Lenis smooth scroll wrapper application
const SmoothScrollWrapper = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
};

// Global Parallax Background Component
const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 2000], [0, 200]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 -top-[10%] -bottom-[10%] opacity-80 bg-cover bg-center"
        style={{ 
          y: backgroundY,
          backgroundImage: "url('/images/hero_new.png')",
        }}
      />
      {/* Cinematic Overlay: ~60% opacity so background stays visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/65" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,122,0,0.08),transparent_80%)]" />
    </div>
  );
};

const Home = () => (
  <main className="bg-transparent">
    <Hero />
    <Experience />
  </main>
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div 
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            <img src="/logo_emblem.png" alt="GV Logo" className="w-24 h-24 object-contain animate-pulse" />
            <div className="flex flex-col items-center text-center px-4">
              <h2 className="text-lg md:text-2xl font-black tracking-[0.2em] md:tracking-[0.5em] text-white uppercase">GV WELDING WORKS</h2>
              <div className="w-48 h-[1px] bg-white/10 mt-4 overflow-hidden relative">
                 <motion.div 
                   initial={{ x: "-100%" }}
                   animate={{ x: "100%" }}
                   transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute inset-0 bg-brand-primary"
                 />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div 
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className='min-h-screen text-white font-body selection:bg-brand-primary/20 relative'
        >
          <SmoothScrollWrapper>
            <ScrollToTop />
            <ParallaxBackground />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<main className="pt-24 min-h-screen"><Services /></main>} />
              <Route path="/gallery" element={<main className="pt-24 min-h-screen"><Gallery /></main>} />
              <Route path="/capabilities" element={<main className="pt-24 min-h-screen"><Capabilities /></main>} />
              <Route path="/contact" element={<main className="pt-24 min-h-screen"><Contact /></main>} />
            </Routes>
            <Footer />
          </SmoothScrollWrapper>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
