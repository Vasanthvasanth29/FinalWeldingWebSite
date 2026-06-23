import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Hero = () => {
  const containerRef = useRef(null);

  // Scroll progress for this section only (0 → 1 as user scrolls through hero)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth spring for buttery motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // ── Layer 1: Background (slowest, deepest) ─────────────────────────────────
  const bgScale      = useTransform(smoothProgress, [0, 1], [1.0, 1.12]);
  const bgY          = useTransform(smoothProgress, [0, 1], ['0%', '20%']);
  const bgBlur       = useTransform(smoothProgress, [0, 0.6], [0, 5]);
  const bgBrightness = useTransform(smoothProgress, [0, 0.6], [0.85, 0.55]);
  // Combine blur + brightness into a single MotionValue string (avoids hook-in-JSX)
  const bgFilter = useTransform(
    [bgBrightness, bgBlur],
    ([b, bl]) => `brightness(${b}) contrast(1.2) blur(${bl}px)`
  );

  // ── Layer 2: Label chip (medium speed) ────────────────────────────────────
  const labelY      = useTransform(smoothProgress, [0, 0.6], ['0%', '-18%']);
  const labelOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0]);

  // ── Layer 3: Main headline (slightly faster) ────────────────────────────────
  const headlineY       = useTransform(smoothProgress, [0, 0.6], ['0%', '-26%']);
  const headlineScale   = useTransform(smoothProgress, [0, 0.6], [1, 0.9]);
  const headlineOpacity = useTransform(smoothProgress, [0, 0.45], [1, 0]);

  // ── Layer 4: Subtext (faster than headline) ────────────────────────────────
  const subY       = useTransform(smoothProgress, [0, 0.5], ['0%', '-32%']);
  const subOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0]);

  // ── Layer 5: Buttons (fastest, first to disappear) ────────────────────────
  const btnY       = useTransform(smoothProgress, [0, 0.4], ['0%', '-40%']);
  const btnOpacity = useTransform(smoothProgress, [0, 0.28], [1, 0]);

  // ── Scroll indicator ──────────────────────────────────────────────────────
  const hintOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
      id="hero"
    >
      {/* ── Background: Parallax + Slow Zoom ─────────────────────────────── */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <motion.img
          src="/images/hero_new.png"
          alt="GV Welding Works — Master Metal Fabrication Workshop"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 12, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: bgFilter }}
          className="w-full h-full object-cover"
        />

        {/* Warm orange spark glow — centre-right radial */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_65%_55%,rgba(255,120,0,0.18)_0%,transparent_70%)]" />
        {/* Edge vignette — keeps edges dark for theatrical contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_45%,rgba(0,0,0,0.65)_100%)]" />
      </motion.div>

      {/* ── Atmospheric overlays ─────────────────────────────────────────── */}
      {/* Gradient overlay ~60% — background clearly visible, text stays sharp */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/65 z-[1]" />

      {/* Deep bottom fade — blends into next section */}
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/55 to-transparent z-[2]" />

      {/* ── Content Layer ────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">

        {/* Label chip */}
        <motion.div
          style={{ y: labelY, opacity: labelOpacity }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 label-tag border-brand-primary/25 bg-brand-primary/8 text-brand-primary/90 tracking-[0.35em]">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse shadow-[0_0_6px_#ff8c00]" />
            ULTRA-PREMIUM FABRICATION
          </span>
        </motion.div>

        {/* Main headline with per-layer scroll depth */}
        <motion.div
          style={{ y: headlineY, scale: headlineScale, opacity: headlineOpacity }}
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mb-8"
        >
          <h1
            className="text-[14vw] sm:text-6xl md:text-8xl lg:text-[8.5rem] font-black tracking-tighter uppercase text-white leading-[0.85]"
            style={{ textShadow: '0 4px 32px rgba(0,0,0,0.7), 0 1px 0 rgba(0,0,0,0.9)' }}
          >
            GV{' '}
            <motion.span
              initial={{ opacity: 0, y: 20, textShadow: '0 0 0px rgba(255,140,0,0)' }}
              animate={{ opacity: 1, y: 0, textShadow: '0 0 60px rgba(255,140,0,0.45), 0 0 120px rgba(255,140,0,0.15)' }}
              transition={{ duration: 0.8, delay: 0.55, ease: 'easeOut' }}
              className="text-brand-primary"
            >
              WELDING
            </motion.span>
            <br className="hidden md:block" />
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: 'easeOut' }}
              className="inline-block"
            >
              WORKS
            </motion.span>
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          style={{ y: subY, opacity: subOpacity }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 0.75, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
          className="text-gray-300 text-lg md:text-xl font-medium mb-14 max-w-2xl mx-auto leading-relaxed"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
        >
          Precision engineering and custom fabrication.
          <br />
          Building modern legacies in metal.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          style={{ y: btnY, opacity: btnOpacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a href="/gallery" className="btn-primary h-16 px-8 md:px-14 text-sm tracking-widest shadow-[0_10px_40px_rgba(255,140,0,0.25)] active:scale-95 w-full sm:w-auto text-center">
            Explore Projects
          </a>
          <a href="/contact" className="btn-secondary h-16 px-8 md:px-14 text-sm border-white/8 tracking-widest w-full sm:w-auto text-center">
            Contact Us
          </a>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: hintOpacity }}
        animate={{ y: [0, 9, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <div className="w-6 h-10 border border-white/15 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-brand-primary rounded-full shadow-[0_0_8px_#ff8c00]" />
        </div>
        <span className="text-[9px] uppercase tracking-[0.55em] text-white/25 font-bold">
          Scroll to Discover
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;