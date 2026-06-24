import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const pageMap = {
  '/': { nextPath: '/capabilities', title: 'Capabilities' },
  '/capabilities': { nextPath: '/services', title: 'Services' },
  '/services': { nextPath: '/gallery', title: 'Projects' },
  '/gallery': { nextPath: '/contact', title: 'Contact' },
  '/contact': { nextPath: '/', title: 'Heritage' }
};

const NextPagePreview = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const nextData = pageMap[currentPath] || pageMap['/'];

  return (
    <section className="relative py-28 z-10 overflow-hidden flex flex-col items-center justify-center px-6">
      
      <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-6">
        Next Chapter
      </span>

      <Link to={nextData.nextPath} className="group outline-none cursor-pointer">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#ff7a00] hover:bg-[#ff8c00] text-black px-12 sm:px-16 py-5 sm:py-6 rounded-full flex items-center justify-center gap-4 transition-all duration-400 group-hover:-translate-y-1 group-hover:shadow-[0_15px_40px_rgba(255,122,0,0.45)]"
        >
          <span className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] whitespace-nowrap">
            {nextData.title}
          </span>
          <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
        </motion.div>
      </Link>
    </section>
  );
};

export default NextPagePreview;
