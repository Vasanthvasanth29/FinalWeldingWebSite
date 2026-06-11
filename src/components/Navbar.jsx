import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Heritage', href: '/' },
    { name: 'Capabilities', href: '/capabilities' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleMobileMenuClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          scrolled ? 'bg-black/40 backdrop-blur-[12px] py-4 shadow-[0_10px_40px_rgba(0,0,0,0.6)] border-b border-white/5' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-[1700px] mx-auto px-8 lg:px-16 flex items-center justify-between">
          
          {/* Brand Identity */}
          <Link to="/" onClick={handleMobileMenuClick} className="flex items-center gap-5 z-50 group cursor-pointer">
            <div className="relative">
              <img 
                src="/logo_emblem.png" 
                alt="GV WELDING WORKS" 
                className="w-10 h-10 md:w-12 md:h-12 object-contain filter brightness-110 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 h-[10%] bg-brand-primary/40 blur-md rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-xl md:text-2xl tracking-tighter text-white leading-none uppercase">
                GV WELDING
              </span>
              <span className="text-[9px] tracking-[0.5em] text-brand-primary/80 font-black uppercase leading-none mt-1.5">
                Works
              </span>
            </div>
          </Link>

          {/* Luxury Desktop Nav */}
          <div className="hidden lg:flex items-center gap-16">
            <motion.ul 
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="flex items-center gap-10"
            >
              {navLinks.map((link) => (
                <motion.li 
                  key={link.name}
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                >
                  <Link 
                    to={link.href} 
                    className={`nav-link text-[10px] font-black tracking-[0.4em] uppercase transition-all duration-500 hover:text-white ${
                      pathname === link.href ? 'active-link text-brand-primary drop-shadow-[0_0_10px_rgba(255,140,0,0.5)]' : 'text-white/50'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link 
                to="/contact" 
                className="group relative isolate overflow-hidden px-10 py-3 bg-white/[0.03] border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full transition-all duration-1000 hover:border-brand-primary active:scale-95 flex items-center justify-center transform-gpu [mask-image:linear-gradient(white,white)]"
              >
                <span className="relative z-20 transition-colors duration-1000 group-hover:text-black">Get Quote</span>
                <div 
                   className="absolute inset-0 bg-brand-primary z-10 translate-x-[-105%] group-hover:translate-x-0 transition-transform duration-1000 ease-in-out pointer-events-none"
                />
              </Link>
            </motion.div>
          </div>

          {/* Menu Trigger */}
          <button 
            className="lg:hidden text-white z-50 w-12 h-12 flex items-center justify-center bg-white/[0.05] border border-white/5 rounded-full hover:bg-white/[0.08] transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Cinematic Mobile Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-[45] bg-[#050505] flex items-center justify-center"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            <ul className="flex flex-col items-center gap-10 relative z-10 w-full px-12 text-center">
              {navLinks.map((link, idx) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx + 0.3, duration: 0.8 }}
                  className="w-full"
                >
                  <Link 
                    to={link.href} 
                    onClick={handleMobileMenuClick}
                    className="text-4xl font-black tracking-tight text-white/40 hover:text-brand-primary transition-all duration-500 uppercase flex items-center justify-center gap-6 group"
                  >
                    <span className="text-xs font-black text-brand-primary/30 group-hover:text-brand-primary transition-colors">0{idx + 1}</span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
              
              <motion.li
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.8 }}
                 className="mt-12 w-full"
              >
                <Link 
                  to="/contact" 
                  onClick={handleMobileMenuClick}
                  className="inline-flex items-center justify-center gap-4 w-full py-6 bg-brand-primary text-black font-black uppercase tracking-[0.4em] text-xs rounded-2xl shadow-[0_20px_40px_rgba(255,140,0,0.2)]"
                >
                  Initiate Order
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
