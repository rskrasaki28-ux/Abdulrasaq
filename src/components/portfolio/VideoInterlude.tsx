import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function VideoInterlude() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef(null);
  const textInView = useInView(textRef, { once: true, margin: '-100px' });

  // Parallax: video moves slower than scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: 'clamp(420px, 75vh, 820px)' }}
    >
      {/* ── Parallax video container */}
      <motion.div
        ref={videoRef}
        className="absolute inset-0 w-full"
        style={{ y: videoY, height: '116%', top: '-8%' }}
      >
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* ── Top gradient fade from black */}
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: '30%',
          background: 'linear-gradient(to bottom, #000 0%, transparent 100%)',
        }}
      />

      {/* ── Bottom gradient fade to black */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: '35%',
          background: 'linear-gradient(to top, #000 0%, transparent 100%)',
        }}
      />

      {/* ── Subtle dark overlay for legibility */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'rgba(0,0,0,0.28)' }} />

      {/* ── Centred text */}
      <div
        ref={textRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={textInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-4 m-0"
          style={{ color: 'rgba(225,224,204,0.45)' }}
        >
          The work behind the work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={textInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="font-normal m-0 leading-[0.9] max-w-4xl"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            color: '#E1E0CC',
            fontSize: 'clamp(2.4rem, 7vw, 5.5rem)',
          }}
        >
          Where dreams rise
          <br />
          <span style={{ color: 'rgba(225,224,204,0.45)' }}>through the silence.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={textInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.22, ease: EASE }}
          className="text-sm sm:text-base max-w-lg mt-6 m-0 leading-relaxed"
          style={{ color: 'rgba(225,224,204,0.5)' }}
        >
          Building automation systems that eliminate manual work
          and help teams scale smarter.
        </motion.p>
      </div>
    </section>
  );
}
