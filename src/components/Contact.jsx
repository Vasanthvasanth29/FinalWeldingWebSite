import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ChevronDown, CheckCircle, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

/* ─────────────────────────────────────────────────────────────────────────── */
/* Easing constants                                                            */
/* ─────────────────────────────────────────────────────────────────────────── */
const CINEMATIC = [0.16, 1, 0.3, 1];

/* ─────────────────────────────────────────────────────────────────────────── */
/* FloatingInput — label floats above on focus/fill                           */
/* ─────────────────────────────────────────────────────────────────────────── */
const FloatingInput = ({ label, name, type = 'text', value, onChange, required }) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="form-input rounded-2xl w-full pt-7 pb-3 px-4"
        style={{
          borderColor: focused ? 'rgba(255,122,0,0.65)' : 'rgba(255,255,255,0.1)',
          background:  focused ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
          boxShadow:   focused
            ? '0 0 0 2px rgba(255,122,0,0.12), 0 0 24px rgba(255,122,0,0.12)'
            : 'none',
          transition: 'border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease',
        }}
      />
      {/* Floating label */}
      <label
        className="absolute left-4 pointer-events-none font-black uppercase"
        style={{
          top:        active ? '9px'  : '50%',
          transform:  active ? 'none' : 'translateY(-50%)',
          fontSize:   active ? '9px'  : '11px',
          letterSpacing: '0.2em',
          color: focused
            ? 'rgba(255,122,0,0.85)'
            : active
            ? 'rgba(255,255,255,0.38)'
            : 'rgba(255,255,255,0.32)',
          transition: 'top 0.3s ease, font-size 0.3s ease, color 0.3s ease',
        }}
      >
        {label}
      </label>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────── */
/* TrustBadge                                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */
const TrustBadge = ({ icon, text }) => (
  <div className="flex items-center gap-2.5 py-1">
    <span className="text-sm leading-none shrink-0">{icon}</span>
    <span
      className="text-[11px] font-medium tracking-wide leading-tight"
      style={{ color: 'rgba(255,255,255,0.38)' }}
    >
      {text}
    </span>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────── */
/* Main Component                                                              */
/* ─────────────────────────────────────────────────────────────────────────── */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', service: '', message: '',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting,   setIsSubmitting]   = useState(false);
  const [isSuccess,      setIsSuccess]      = useState(false);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const services = [
    { value: 'gate',    label: 'Precision Gates' },
    { value: 'window',  label: 'Architectural Windows' },
    { value: 'shelter', label: 'Premium Shelters' },
    { value: 'stair',   label: 'Bespoke Staircases' },
    { value: 'roof',    label: 'Structural Roofing' },
    { value: 'custom',  label: 'Custom Metal Fabrication' },
  ];

  const selectedService = services.find(s => s.value === formData.service);

  const handleChange       = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleServiceSelect = (value) => { setFormData({ ...formData, service: value }); setIsDropdownOpen(false); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.service) return alert('Please select a specialization.');
    setIsSubmitting(true);

    const msg = `*New Inquiry from GV Welding Works*%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Email:* ${formData.email}%0A*Interested In:* ${selectedService.label}%0A%0A_Inquiry logged in official database._`;
    const waUrl = `https://wa.me/916374942172?text=${msg}`;

    try {
      const res = await fetch('http://localhost:8081/api/enquiry', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...formData, service: selectedService.label }),
      });
      if (res.ok) {
        setIsSuccess(true);
        window.open(waUrl, '_blank');
        setFormData({ name: '', phone: '', email: '', service: '', message: '' });
      } else {
        const err = await res.json();
        alert(`Error: ${err.message || 'Submission failed'}`);
      }
    } catch {
      alert('Could not connect to the server. Please ensure the backend is running on port 8081.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Animation variants ─────────────────────────────────────────────────── */
  const containerVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
  };

  const fromLeft = {
    hidden:  { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.0, ease: CINEMATIC } },
  };

  const fromRight = {
    hidden:  { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.0, ease: CINEMATIC } },
  };

  const fadeUp = (delay = 0) => ({
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: 'easeOut' } },
  });

  /* ── Input stagger container ────────────────────────────────────────────── */
  const inputContainer = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const inputItem = {
    hidden:  { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  };

  return (
    <>
      {/* ── Floating WhatsApp Button ─────────────────────────────────────────── */}
      <motion.a
        href="https://wa.me/916374942172"
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6, ease: CINEMATIC }}
        whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-[200] w-14 h-14 rounded-full bg-[#25d366] flex items-center justify-center wa-float cursor-pointer"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp size={26} className="text-white" />
      </motion.a>

      {/* ── Section ──────────────────────────────────────────────────────────── */}
      <section id="contact" className="relative py-24 md:py-32 overflow-hidden">

        {/* Background vignette overlays (slightly reduced darkness) */}
        <motion.div
          style={{
            y: backgroundY,
            background: 'radial-gradient(circle at 28% 42%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.72) 100%)',
          }}
          className="absolute inset-0 z-0 pointer-events-none"
        />
        <motion.div
          style={{
            y: backgroundY,
            background: 'radial-gradient(circle at 16% 36%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 58%)',
          }}
          className="absolute inset-0 z-0 pointer-events-none"
        />

        {/* Decorative text watermark */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.008] tracking-tighter select-none pointer-events-none uppercase">
          Contact
        </div>

        {/* ── Grid ─────────────────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

            {/* ── Left Column ─────────────────────────────────────────────── */}
            <motion.div variants={fromLeft} className="flex flex-col">

              <div className="label-tag border-brand-primary/20 bg-brand-primary/5 text-brand-primary w-max mb-8">
                INQUIRY DESK
              </div>

              {/* Headline */}
              <motion.h2
                variants={fadeUp(0.05)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-8 text-white uppercase leading-[0.9]"
                style={{ textShadow: '0 2px 24px rgba(0,0,0,0.6)' }}
              >
                LET'S FORGE
                <motion.span
                  initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.55, ease: 'easeOut' }}
                  className="text-brand-primary italic font-serif tracking-normal normal-case block mt-2"
                  style={{
                    textShadow: '0 0 36px rgba(255,122,0,0.38), 0 2px 14px rgba(0,0,0,0.7)',
                  }}
                >
                  Your Vision.
                </motion.span>
              </motion.h2>

              <p className="mb-16 max-w-md text-base md:text-lg lg:text-xl leading-relaxed font-medium"
                 style={{ color: 'rgba(255,255,255,0.42)' }}>
                Our engineering consultants are ready to discuss your custom fabrication needs.
                Expect a response within 2 business hours.
              </p>

              {/* Info cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {[
                  { label: 'Hotline',     value: '+91 63749 42172',                      icon: <Phone  size={18} />, link: 'tel:+916374942172' },
                  { label: 'Inquiry',     value: 'vasanthvasanth1945@gmail.com',          icon: <Mail   size={18} />, link: 'mailto:vasanthvasanth1945@gmail.com' },
                  { label: 'Location',    value: 'Thuthurmattam, Coonoor, Nilgiris',      icon: <MapPin size={18} />, link: 'https://maps.google.com/?q=Thuthurmattam,Coonoor,The+Nilgiris' },
                  { label: 'Operational', value: 'Sun – Sat,  8 AM – 7 PM',              icon: <Clock  size={18} /> },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{
                      y: -5,
                      borderColor: 'rgba(255,140,0,0.28)',
                      transition: { duration: 0.35 },
                    }}
                    className="relative bg-white/[0.025] border border-white/[0.055] p-8 rounded-3xl group overflow-hidden"
                  >
                    {item.link && (
                      <a
                        href={item.link}
                        target={item.link.startsWith('http') ? '_blank' : '_self'}
                        rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        className="absolute inset-0 z-10"
                      />
                    )}
                    <div className="text-brand-primary mb-6 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,122,0,0.45)]">
                      {item.icon}
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-2"
                        style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {item.label}
                    </h4>
                    <p className="text-sm font-bold tracking-tight group-hover:text-brand-primary transition-colors duration-400"
                       style={{ color: 'rgba(255,255,255,0.88)' }}>
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <motion.a
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                animate={{
                  boxShadow: [
                    '0 0 18px rgba(0,143,112,0.10)',
                    '0 0 36px rgba(0,143,112,0.28)',
                    '0 0 18px rgba(0,143,112,0.10)',
                  ],
                }}
                transition={{ boxShadow: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } }}
                whileHover={{ scale: 1.05, y: -6, backgroundColor: '#007a60', transition: { duration: 0.35 } }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/916374942172"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 bg-[#008f70] text-white font-black py-5 px-10 rounded-2xl text-[10px] uppercase tracking-[0.3em] w-max shadow-[0_10px_20px_rgba(0,143,112,0.18)]"
              >
                <FaWhatsapp size={20} />
                Launch WhatsApp
              </motion.a>
            </motion.div>

            {/* ── Right Column: Form Card ──────────────────────────────────── */}
            <motion.div
              variants={fromRight}
              whileHover={{
                y: -6,
                boxShadow: '0 28px 70px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,122,0,0.22), 0 0 60px rgba(255,122,0,0.09), inset 0 1px 0 rgba(255,255,255,0.07)',
                transition: { duration: 0.45, ease: CINEMATIC },
              }}
              className="glass-card rounded-[3rem] p-6 sm:p-10 md:p-14 relative"
            >
              {/* Orange edge accent */}
              <div className="absolute top-0 right-14 w-12 h-[3px] rounded-b-full bg-gradient-to-r from-brand-primary to-amber-400 shadow-[0_0_18px_rgba(255,140,0,0.55)]" />

              {/* ── Form ──────────────────────────────────────────────────── */}
              <motion.form
                onSubmit={handleSubmit}
                variants={inputContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col gap-7"
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <motion.div variants={inputItem}>
                    <FloatingInput label="Full Name"     name="name"  value={formData.name}  onChange={handleChange} required />
                  </motion.div>
                  <motion.div variants={inputItem}>
                    <FloatingInput label="Phone Number"  name="phone" value={formData.phone} onChange={handleChange} required type="tel" />
                  </motion.div>
                </div>

                {/* Email */}
                <motion.div variants={inputItem}>
                  <FloatingInput label="Email Address" name="email" value={formData.email} onChange={handleChange} required type="email" />
                </motion.div>

                {/* Service dropdown */}
                <motion.div variants={inputItem} className="flex flex-col gap-2.5">
                  <label
                    className="text-[9px] font-black uppercase tracking-[0.25em] px-1"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    Specialization
                  </label>
                  <div className="relative">
                    {/* Trigger */}
                    <motion.div
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full rounded-2xl px-5 py-[18px] cursor-pointer flex justify-between items-center"
                      style={{
                        background:   isDropdownOpen ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
                        border:       `1px solid ${isDropdownOpen ? 'rgba(255,122,0,0.6)' : 'rgba(255,255,255,0.1)'}`,
                        boxShadow:    isDropdownOpen ? '0 0 0 2px rgba(255,122,0,0.1), 0 0 20px rgba(255,122,0,0.1)' : 'none',
                        transition:   'border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease',
                      }}
                    >
                      <span
                        className="text-sm font-semibold tracking-tight"
                        style={{ color: formData.service ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.35)' }}
                      >
                        {selectedService ? selectedService.label : 'Select Required Expertise'}
                      </span>
                      <motion.span
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        style={{ color: 'rgba(255,255,255,0.35)' }}
                      >
                        <ChevronDown size={17} />
                      </motion.span>
                    </motion.div>

                    {/* Dropdown menu */}
                    <div className="relative z-50">
                      <motion.div
                        initial={false}
                        animate={isDropdownOpen ? 'open' : 'closed'}
                        variants={{
                          open:   { opacity: 1, y: 6, pointerEvents: 'auto',  transition: { duration: 0.3, ease: 'easeOut' } },
                          closed: { opacity: 0, y: -6, pointerEvents: 'none', transition: { duration: 0.2, ease: 'easeIn' } },
                        }}
                        className="absolute top-full left-0 mt-1 w-full rounded-2xl border border-white/[0.07] overflow-hidden"
                        style={{
                          background:   'rgba(14,14,14,0.97)',
                          backdropFilter: 'blur(20px)',
                          boxShadow:    '0 20px 50px rgba(0,0,0,0.7)',
                        }}
                      >
                        <div onWheel={(e) => e.stopPropagation()} className="py-2 max-h-56 overflow-y-auto">
                          {services.map((svc) => (
                            <motion.div
                              key={svc.value}
                              whileHover={{ x: 4, backgroundColor: 'rgba(255,122,0,0.09)', transition: { duration: 0.2 } }}
                              onClick={() => handleServiceSelect(svc.value)}
                              className="px-5 py-3.5 cursor-pointer text-[13px] font-semibold tracking-tight flex items-center justify-between"
                              style={{
                                color: formData.service === svc.value
                                  ? 'rgba(255,122,0,0.9)'
                                  : 'rgba(255,255,255,0.55)',
                              }}
                            >
                              {svc.label}
                              {formData.service === svc.value && (
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div variants={inputItem} className="pt-3">
                  <motion.button
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? {
                      scale: 1.03,
                      filter: 'brightness(1.12)',
                      boxShadow: '0 10px 40px rgba(255,122,0,0.42), 0 0 60px rgba(255,122,0,0.18), inset 0 1px 0 rgba(255,255,255,0.2)',
                      transition: { duration: 0.4, ease: 'easeOut' },
                    } : {}}
                    whileTap={!isSubmitting ? {
                      scale: 0.97,
                      transition: { duration: 0.15 },
                    } : {}}
                    type="submit"
                    className="w-full font-black py-6 rounded-2xl text-[10px] uppercase tracking-[0.45em] flex items-center justify-center gap-3 text-black"
                    style={{
                      background:  isSubmitting
                        ? 'rgba(255,122,0,0.45)'
                        : 'linear-gradient(135deg, #ff9a00 0%, #ff6500 55%, #ff8c00 100%)',
                      boxShadow:   isSubmitting
                        ? 'none'
                        : '0 5px 22px rgba(255,122,0,0.28), inset 0 1px 0 rgba(255,255,255,0.18)',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.65 : 1,
                      transition: 'box-shadow 0.4s ease, opacity 0.3s ease',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
                          className="block w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                        />
                        Forging Request…
                      </>
                    ) : (
                      'Dispatch Request'
                    )}
                  </motion.button>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  variants={inputItem}
                  className="pt-4 mt-1 border-t flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
                  style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                >
                  <TrustBadge icon="⚡" text="Response within 2 hours" />
                  <span className="hidden sm:block w-px h-4 bg-white/[0.07]" />
                  <TrustBadge icon="🏗️" text="100+ projects delivered" />
                  <span className="hidden sm:block w-px h-4 bg-white/[0.07]" />
                  <TrustBadge icon="⭐" text="Trusted fabrication experts" />
                </motion.div>
              </motion.form>

              {/* ── Success overlay ──────────────────────────────────────── */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.5, ease: CINEMATIC }}
                    className="absolute inset-0 rounded-[3rem] p-10 md:p-14 z-[60] flex flex-col items-center justify-center text-center border border-brand-primary/20"
                    style={{
                      background: 'rgba(10,10,10,0.97)',
                      backdropFilter: 'blur(28px)',
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.2 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center text-brand-primary mb-8"
                      style={{ background: 'rgba(255,122,0,0.09)' }}
                    >
                      <CheckCircle size={40} />
                    </motion.div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-black text-white uppercase tracking-wider mb-2">நன்றி!</h3>
                        <p className="text-xs leading-relaxed max-w-xs mx-auto" style={{ color: 'rgba(255,255,255,0.48)' }}>
                          உங்கள் கோரிக்கை வெற்றிகரமாக பெறப்பட்டது. எங்கள் குழு விரைவில் உங்களை தொடர்பு கொள்ளும்.
                        </p>
                      </div>
                      <div className="w-10 h-px mx-auto" style={{ background: 'rgba(255,255,255,0.06)' }} />
                      <div>
                        <h3 className="text-xl font-black text-white uppercase tracking-wider mb-2">Success!</h3>
                        <p className="text-xs leading-relaxed max-w-xs mx-auto" style={{ color: 'rgba(255,255,255,0.48)' }}>
                          Your request has been successfully submitted. Our engineering team will contact you shortly.
                        </p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsSuccess(false)}
                      className="mt-12 flex items-center gap-3 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] group"
                    >
                      Return to Form
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Contact;
