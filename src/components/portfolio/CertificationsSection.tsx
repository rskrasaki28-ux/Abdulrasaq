import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BadgeCheck, Quote, User, X, ZoomIn } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Data ────────────────────────────────────────────────────── */

const CERTIFICATES = [
  {
    id: 'c1',
    name: 'Financial Modelling & Valuation Analyst',
    short: 'FMVA®',
    issuer: 'Corporate Finance Institute',
    year: '2022',
    gradient: 'from-[#0d1f3c] via-[#091528] to-[#040c1a]',
    accent: '#4a8cff',
    image: '/certificates/fmva.jpg',
  },
  {
    id: 'c6',
    name: 'Enterprise Agentic Automation Implementation Methodology',
    short: 'EAI',
    issuer: 'UiPath',
    year: '2026',
    gradient: 'from-[#1a0d00] via-[#120900] to-[#070400]',
    accent: '#fa4616',
    image: '/certificates/uipath-eai.jpg',
  },
  {
    id: 'c7',
    name: 'Introduction to Automation',
    short: 'ITA',
    issuer: 'UiPath',
    year: '2026',
    gradient: 'from-[#1a0d00] via-[#120900] to-[#070400]',
    accent: '#fa4616',
    image: '/certificates/uipath-intro-automation.jpg',
  },
];

const TESTIMONIALS = [
  {
    id: 't1',
    quote: `Abdulrasaq built an automation pipeline that completely transformed how we handle government bids. We went from manually managing every proposal to a fully autonomous system — the results were immediate and the quality never dropped.`,
    name: 'Operations Lead',
    role: 'Senior Director of Operations',
    company: 'Dakdan Worldwide',
    photo: '',            // → public/testimonials/dakdan-ops.jpg
  },
  {
    id: 't2',
    quote: `The intern onboarding workflow Abdulrasaq built saved our HR team hours every single week. What used to take days of back-and-forth now runs itself. That 70% workload reduction was not an estimate — we measured it.`,
    name: 'HR Manager',
    role: 'Head of People & Culture',
    company: 'Sports Media Inc.',
    photo: '',            // → public/testimonials/smi-hr.jpg
  },
  {
    id: 't3',
    quote: `He doesn't just build automations — he maps your entire process first, finds the friction points you didn't even know existed, and then builds something that actually holds up at scale. Rare combination of skills.`,
    name: 'Product Lead',
    role: 'Head of Product',
    company: 'Sports Media Inc.',
    photo: '',            // → public/testimonials/smi-product.jpg
  },
  {
    id: 't4',
    quote: `Connecting our athlete platform to the POD store was a problem we had been putting off for months. Abdulrasaq had it running in a fraction of the time we expected, and it has been flawless since day one.`,
    name: 'Founder',
    role: 'CEO & Co-Founder',
    company: 'Athlete Platform',
    photo: '',            // → public/testimonials/athlete-ceo.jpg
  },
];

/* ─── Lightbox ────────────────────────────────────────────────── */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        style={{ background: 'rgba(0,0,0,0.92)' }}
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center border-none cursor-pointer transition-colors duration-150"
          style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(225,224,204,0.7)' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
        >
          <X size={18} />
        </button>
        <motion.img
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          src={src}
          alt={alt}
          onClick={(e) => e.stopPropagation()}
          className="rounded-xl shadow-2xl"
          style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain' }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Slider hook ─────────────────────────────────────────────── */
function useSlider(total: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    setActive(index);
  }, []);

  const prev = useCallback(() => scrollTo(Math.max(active - 1, 0)), [active, scrollTo]);
  const next = useCallback(() => scrollTo(Math.min(active + 1, total - 1)), [active, total, scrollTo]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const card = track.children[0] as HTMLElement;
      if (!card) return;
      const cardW = card.offsetWidth + 16;
      setActive(Math.round(track.scrollLeft / cardW));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  return { trackRef, active, prev, next, scrollTo };
}

/* ─── Nav arrows ──────────────────────────────────────────────── */
function Arrows({
  onPrev, onNext, atStart, atEnd,
}: { onPrev: () => void; onNext: () => void; atStart: boolean; atEnd: boolean }) {
  const btn = (onClick: () => void, disabled: boolean, children: React.ReactNode) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border-none"
      style={{
        background: disabled ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)',
        color: disabled ? 'rgba(225,224,204,0.2)' : 'rgba(225,224,204,0.7)',
        cursor: disabled ? 'default' : 'pointer',
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = disabled ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)'; }}
    >
      {children}
    </button>
  );
  return (
    <div className="flex items-center gap-2">
      {btn(onPrev, atStart, <ChevronLeft size={16} />)}
      {btn(onNext, atEnd, <ChevronRight size={16} />)}
    </div>
  );
}

/* ─── Dots ────────────────────────────────────────────────────── */
function Dots({ total, active, onDot }: { total: number; active: number; onDot: (i: number) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDot(i)}
          className="rounded-full border-none cursor-pointer p-0 transition-all duration-300"
          style={{
            width: i === active ? '18px' : '6px',
            height: '6px',
            background: i === active ? '#E1E0CC' : 'rgba(225,224,204,0.2)',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Certificate card ────────────────────────────────────────── */
function CertCard({ cert }: { cert: typeof CERTIFICATES[0] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div
        className="flex-shrink-0 rounded-2xl overflow-hidden flex flex-col"
        style={{
          width: 'clamp(260px, 72vw, 320px)',
          border: '1px solid rgba(255,255,255,0.07)',
          scrollSnapAlign: 'start',
        }}
      >
        {/* ── Top face */}
        {cert.image ? (
          /* Thumbnail — clickable to open lightbox */
          <div
            className="relative group overflow-hidden cursor-zoom-in"
            style={{ height: '160px' }}
            onClick={() => setLightboxOpen(true)}
          >
            <img
              src={cert.image}
              alt={cert.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover hint */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: 'rgba(0,0,0,0.45)' }}
            >
              <div
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                style={{ background: 'rgba(255,255,255,0.12)', color: '#E1E0CC', fontSize: '11px' }}
              >
                <ZoomIn size={13} /> View
              </div>
            </div>
          </div>
        ) : (
          /* Gradient placeholder */
          <div
            className={`bg-gradient-to-br ${cert.gradient} flex flex-col justify-between p-6`}
            style={{ height: '160px' }}
          >
            <div className="flex items-start justify-between">
              <span
                className="text-3xl font-bold tracking-tight"
                style={{ fontFamily: "'Almarai', sans-serif", color: cert.accent }}
              >
                {cert.short}
              </span>
              <BadgeCheck size={20} style={{ color: cert.accent, opacity: 0.8 }} />
            </div>
            <div
              className="h-px w-full"
              style={{ background: `linear-gradient(90deg, ${cert.accent}44 0%, transparent 100%)` }}
            />
          </div>
        )}

        {/* ── Info panel */}
        <div className="bg-[#111] p-5 flex flex-col gap-1 flex-1">
          <h4
            className="text-base font-medium m-0 leading-snug"
            style={{ color: '#E1E0CC', fontFamily: "'Instrument Serif', serif" }}
          >
            {cert.name}
          </h4>
          <p className="text-xs m-0" style={{ color: 'rgba(225,224,204,0.45)' }}>
            {cert.issuer}
          </p>
          <p className="text-[10px] tracking-widest uppercase mt-2 m-0" style={{ color: 'rgba(225,224,204,0.25)' }}>
            {cert.year}
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          src={cert.image}
          alt={cert.name}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

/* ─── Testimonial card ────────────────────────────────────────── */
function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div
      className="flex-shrink-0 rounded-2xl flex flex-col gap-5 p-6 sm:p-7"
      style={{
        width: 'clamp(280px, 80vw, 400px)',
        background: '#0e0e0e',
        border: '1px solid rgba(255,255,255,0.07)',
        scrollSnapAlign: 'start',
      }}
    >
      <Quote size={20} style={{ color: 'rgba(225,224,204,0.2)' }} />

      <p
        className="text-sm sm:text-base leading-relaxed m-0 flex-1"
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: 'italic',
          color: 'rgba(225,224,204,0.8)',
        }}
      >
        {t.quote}
      </p>

      {/* Footer: avatar + name + role */}
      <div
        className="flex items-center gap-3 pt-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Avatar */}
        <div
          className="flex-shrink-0 rounded-full overflow-hidden"
          style={{
            width: 40,
            height: 40,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {t.photo ? (
            <img
              src={t.photo}
              alt={t.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User size={16} style={{ color: 'rgba(225,224,204,0.3)' }} />
            </div>
          )}
        </div>

        {/* Name + role */}
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <span className="text-sm font-medium" style={{ color: '#E1E0CC' }}>
            {t.name}
          </span>
          <span className="text-xs" style={{ color: 'rgba(225,224,204,0.4)' }}>
            {t.role} · {t.company}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main section ────────────────────────────────────────────── */
export default function CertificationsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const certSlider = useSlider(CERTIFICATES.length);
  const testSlider = useSlider(TESTIMONIALS.length);

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 bg-black overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Certificates ──────────────────────────────────────── */}
        <div className="px-4 sm:px-6 mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-2 m-0"
                style={{ color: 'rgba(225,224,204,0.4)' }}>
                Credentials
              </p>
              <h2
                className="text-4xl sm:text-5xl font-normal m-0 leading-[0.92]"
                style={{ fontFamily: "'Instrument Serif', serif", color: '#E1E0CC' }}
              >
                Certificates
              </h2>
            </div>
            <Arrows
              onPrev={certSlider.prev}
              onNext={certSlider.next}
              atStart={certSlider.active === 0}
              atEnd={certSlider.active === CERTIFICATES.length - 1}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            ref={certSlider.trackRef}
            className="flex gap-4 overflow-x-auto pb-4"
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
              paddingLeft: '1rem',
              paddingRight: '1rem',
            }}
          >
            {CERTIFICATES.map((cert) => (
              <CertCard key={cert.id} cert={cert} />
            ))}
            <div className="flex-shrink-0 w-2" />
          </motion.div>

          <div className="flex justify-center mt-5">
            <Dots
              total={CERTIFICATES.length}
              active={certSlider.active}
              onDot={certSlider.scrollTo}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 sm:mx-6 mb-16 sm:mb-20"
          style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

        {/* ── Testimonials ──────────────────────────────────────── */}
        <div className="px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-2 m-0"
                style={{ color: 'rgba(225,224,204,0.4)' }}>
                What They Say
              </p>
              <h2
                className="text-4xl sm:text-5xl font-normal m-0 leading-[0.92]"
                style={{ fontFamily: "'Instrument Serif', serif", color: '#E1E0CC' }}
              >
                Recognitions
              </h2>
            </div>
            <Arrows
              onPrev={testSlider.prev}
              onNext={testSlider.next}
              atStart={testSlider.active === 0}
              atEnd={testSlider.active === TESTIMONIALS.length - 1}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
            ref={testSlider.trackRef}
            className="flex gap-4 overflow-x-auto pb-4"
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
              paddingLeft: '1rem',
              paddingRight: '1rem',
            }}
          >
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
            <div className="flex-shrink-0 w-2" />
          </motion.div>

          <div className="flex justify-center mt-5">
            <Dots
              total={TESTIMONIALS.length}
              active={testSlider.active}
              onDot={testSlider.scrollTo}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
