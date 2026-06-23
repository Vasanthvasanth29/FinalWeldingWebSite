import React from 'react';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative pt-32 pb-12 z-10 overflow-hidden">
      {/* Background Suppression (Atmospheric continuity from content) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/95 to-black z-0 pointer-events-none" />
      
      {/* Top Transition Fade */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-black/40 z-0 pointer-events-none" />
      {/* Cinematic Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent shadow-[0_0_80px_rgba(255,122,0,0.15)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-16">
          
          {/* Brand Column */}
          <div className="flex flex-col items-start group max-w-sm">
            <div className="relative mb-8">
              <img 
                src="/logo_emblem.png" 
                alt="GV WELDING WORKS" 
                className="w-14 h-14 object-contain filter brightness-125 transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-brand-primary/20 blur-xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
            <h2 className="text-3xl font-black uppercase text-white mb-4 tracking-tighter leading-none">
              GV WELDING <br />
              <span className="text-brand-primary">WORKS</span>
            </h2>
            <p className="text-white/30 text-[10px] font-black tracking-[0.4em] uppercase leading-relaxed">
              Precision Engineering. <br />
              Industrial Excellence.
            </p>
          </div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 lg:gap-24 w-full sm:w-auto">
            <div className="flex flex-col gap-6">
              <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">Directory</span>
              <ul className="flex flex-col gap-4 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                <li><a href="#about" className="hover:text-brand-primary transition-colors">Heritage</a></li>
                <li><a href="#services" className="hover:text-brand-primary transition-colors">Services</a></li>
                <li><a href="#gallery" className="hover:text-brand-primary transition-colors">Projects</a></li>
                <li><a href="#contact" className="hover:text-brand-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">Socials</span>
              <ul className="flex flex-col gap-4 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                <li>
                  <a 
                    href="https://instagram.com/_mad.x.dark_" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-brand-primary transition-all duration-300 flex items-center gap-2 group w-max"
                  >
                    <span className="group-hover:drop-shadow-[0_0_8px_rgba(255,122,0,0.5)]">Instagram</span> 
                    <FaInstagram className="transition-transform duration-300 group-hover:scale-110" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-6 hidden sm:flex">
              <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">Contact</span>
              <a 
                href="https://maps.google.com/?q=Thuthurmattam,Coonoor,The Nilgiris"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-brand-primary transition-colors leading-loose"
              >
                Thuthurmattam, Coonoor <br />
                The Nilgiris, India
              </a>
            </div>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-white/10 text-[9px] font-black tracking-[0.2em] sm:tracking-[0.4em] uppercase">
            &copy; {new Date().getFullYear()} GV WELDING WORKS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
            <a href="#" className="text-white/20 text-[9px] font-black tracking-[0.2em] uppercase hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/20 text-[9px] font-black tracking-[0.2em] uppercase hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
