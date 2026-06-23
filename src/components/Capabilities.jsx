import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock4, Award } from 'lucide-react';

const capabilities = [
  {
    id: '01',
    title: 'Elite Materials',
    description: (
      <>
        We source premium aerospace-grade aluminum and high-tensile steel to guarantee unmatched <strong className="font-semibold text-white/90">durability</strong> for your structures.
      </>
    ),
  },
  {
    id: '02',
    title: 'Master Welders',
    description: (
      <>
        Our certified veterans execute every weld with surgical <strong className="font-semibold text-white/90">precision</strong>, ensuring joints are structurally flawless.
      </>
    ),
  },
  {
    id: '03',
    title: 'Flawless Delivery',
    description: (
      <>
        From initial design to final installation, our tightly engineered logistics ensure every project is delivered safely and <strong className="font-semibold text-white/90">on time</strong>.
      </>
    ),
  },
];

const trustItems = [
  { icon: ShieldCheck, label: 'ISO Certified' },
  { icon: Clock4,      label: '25+ Years Experience' },
  { icon: Award,       label: '500+ Projects Delivered' },
];

/* Reusable variants */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
});

const slideLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
});

const slideRight = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
});

const Capabilities = () => (
  <section id="capabilities" className="relative py-24 md:py-36 overflow-hidden z-10">

    {/* ── Section divider (top) ──────────────────────────────────────────── */}
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent z-[5]" />

    {/* Bottom fade for seamless transition to next section if needed */}
    <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#000] to-transparent z-[5] pointer-events-none" />

    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10"
    >

      {/* ── Header row ────────────────────────────────────────────────────── */}
      <div className="flex flex-col xl:flex-row items-start justify-between gap-16 mb-28 lg:mb-32">

        {/* Left — badge + heading */}
        <div className="max-w-2xl overflow-hidden">
          <motion.div {...slideLeft(0)}>
            <div className="label-tag border-brand-primary/20 bg-brand-primary/5 text-brand-primary w-max mb-6 transition-all duration-300 hover:bg-brand-primary/10 hover:border-brand-primary/40 hover:shadow-[0_0_15px_rgba(255,140,0,0.1)] cursor-default">
              THE GV STANDARD
            </div>
          </motion.div>

          <motion.h2
            {...slideLeft(0.1)}
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white uppercase leading-[1.1]"
            style={{ fontFamily: "'Inter', 'Outfit', sans-serif" }}
          >
            <span className="drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">Engineered</span> <br />
            <motion.span 
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="text-brand-primary italic font-serif normal-case tracking-normal drop-shadow-[0_0_15px_rgba(255,140,0,0.4)]"
            >
              for Permanence.
            </motion.span>
          </motion.h2>
        </div>

        {/* Right — paragraph */}
        <div className="overflow-hidden pt-4 xl:pt-10">
          <motion.p
            {...slideRight(0.2)}
            className="text-white/75 text-[15px] lg:text-[17px] max-w-[420px] leading-relaxed drop-shadow-sm"
          >
            We leverage advanced metallurgy and uncompromising standards to execute
            monumental projects with surgical precision and premium reliability.
            Every specification is built to outlast expectations.
          </motion.p>
        </div>
      </div>

      {/* ── Visual Flow Divider ───────────────────────────────────────────── */}
      <motion.div 
        {...fadeUp(0.3)}
        className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-20 lg:mb-24"
      />

      {/* ── Capability cards ──────────────────────────────────────────────── */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } }
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center"
      >
        {capabilities.map((cap, index) => {
          const isCenter = index === 1;

          return (
            <motion.div
              key={cap.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="group relative"
            >
              <div
                className={[
                  'interactive-card relative flex flex-col items-start overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-12',
                  isCenter ? 'z-10 min-h-[320px] sm:min-h-[440px]' : 'min-h-[300px] sm:min-h-[420px]',
                  'bg-black/[0.14] backdrop-blur-[3px] border border-white/[0.06] shadow-[0_10px_40px_rgba(0,0,0,0.5)]',
                  'hover:shadow-[0_0_60px_rgba(255,122,0,0.25)] hover:border-white/[0.12] hover:brightness-110'
                ].join(' ')}
              >
                {/* Mandatory Internal Transparency Gradient (0.05 to 0.2) */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/[0.05] to-black/[0.2] pointer-events-none" />

                {/* Premium Light Reflection Highlight */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
                
                {/* Subtle static edge highlight */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none opacity-20 mix-blend-overlay" />

                {/* Top orange accent line (Static) */}
                <div className="absolute top-0 left-0 h-[3px] w-14 bg-brand-primary rounded-t-[2rem] shadow-[0_0_15px_rgba(255,122,0,0.4)]" />

                {/* Required Background Ghost Number detail */}
                <div
                  className="absolute top-6 right-7 text-[8rem] font-black text-transparent select-none leading-none opacity-[0.04] blur-[1px] group-hover:opacity-[0.07] group-hover:scale-110 group-hover:blur-0 transition-all duration-700"
                  style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}
                >
                  {cap.id}
                </div>

                {/* Card body */}
                <div className="relative z-10 flex flex-col h-full w-full">

                  {/* Orange accent bar + micro arrow */}
                  <div className="flex items-center gap-3 mb-10">
                    <div className="h-[3px] w-10 bg-brand-primary rounded-full shadow-[0_0_10px_rgba(255,140,0,0.5)] group-hover:w-16 transition-all duration-300" />
                    <span className="text-brand-primary/60 text-xs font-black tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase">
                      {cap.id}
                    </span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-black mb-5 uppercase tracking-tight leading-none text-white drop-shadow-md transition-all duration-300">
                    {cap.title}
                  </h3>

                  <p className="text-[15px] lg:text-[16px] leading-[1.8] text-gray-300 transition-all duration-300 flex-grow drop-shadow-sm">
                    {cap.description}
                  </p>

                  {/* Standard Subtle Divider at bottom */}
                  <div className="mt-10 w-full h-px bg-white/[0.06]" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Trust strip ───────────────────────────────────────────────────── */}
      <motion.div
        {...fadeUp(0.5)}
        className="mt-32 md:mt-40 pt-12 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-5 lg:gap-8"
      >
        {trustItems.map(({ icon: Icon, label }) => (
          <div 
            key={label} 
            className={[
              'group flex items-center gap-3.5 px-5 py-3 sm:px-8 sm:py-4',
              'rounded-full', // Pill shape
              'bg-white/[0.03] backdrop-blur-sm', // Glass style pill badge
              'border border-white/[0.08]', // Clean thin border
              'shadow-[0_8px_24px_rgba(0,0,0,0.4)]', 
              'transition-all duration-400 ease-out cursor-default',
              // Hover interactions
              'hover:scale-[1.05] hover:-translate-y-1',
              'hover:bg-white/[0.06] hover:border-brand-primary/40', 
              'hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(255,122,0,0.25)]' 
            ].join(' ')}
          >
            <Icon 
              size={18} 
              className="text-brand-primary transition-all duration-500 group-hover:scale-110 drop-shadow-[0_0_6px_rgba(255,140,0,0.5)] group-hover:drop-shadow-[0_0_14px_rgba(255,140,0,0.8)]" 
              strokeWidth={2.5} 
            />
            <span className="text-[12px] font-black text-white/75 group-hover:text-white uppercase tracking-[0.2em] sm:tracking-[0.25em] transition-colors duration-500 drop-shadow-sm">
              {label}
            </span>
          </div>
        ))}
      </motion.div>

    </motion.div>

    {/* ── Section divider (bottom) ───────────────────────────────────────── */}
    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

  </section>
);

export default Capabilities;

