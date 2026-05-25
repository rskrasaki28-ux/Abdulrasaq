import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { y: 24, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.85, delay, ease: EASE },
});

export default function PortfolioHero() {
  return (
    <section id="home" className="h-screen p-3 md:p-4">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">

        {/* Background video */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0 opacity-[0.65] mix-blend-overlay pointer-events-none z-10" />

        {/* Gradient — heavy at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/85 z-10" />

        {/* Main content — bottom-anchored */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-8 md:p-10 lg:p-14">

          {/* Label */}
          <motion.p
            {...fadeUp(0.1)}
            className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase mb-4 m-0"
            style={{ color: 'rgba(225,224,204,0.45)' }}
          >
            Business Automation Manager &nbsp;·&nbsp; Process Designer &nbsp;·&nbsp; 2025
          </motion.p>

          {/* Name */}
          <div className="mb-5 sm:mb-7">
            <motion.h1
              {...fadeUp(0.2)}
              className="m-0 leading-[0.88] tracking-[-0.04em]"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic',
                color: '#E1E0CC',
                fontSize: 'clamp(3.2rem, 11.5vw, 9.5rem)',
              }}
            >
              Abdulrasaq
            </motion.h1>
            <motion.h1
              {...fadeUp(0.3)}
              className="m-0 leading-[0.82] tracking-[-0.05em] font-bold"
              style={{
                fontFamily: "'Almarai', sans-serif",
                color: '#E1E0CC',
                fontSize: 'clamp(3.2rem, 11.5vw, 9.5rem)',
              }}
            >
              Agboluaje
            </motion.h1>
          </div>

          {/* Tagline + CTAs */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <motion.p
              {...fadeUp(0.45)}
              className="m-0 text-xs sm:text-sm md:text-base max-w-[280px] sm:max-w-xs leading-[1.5]"
              style={{ color: 'rgba(225,224,204,0.6)' }}
            >
              Building automation systems that eliminate manual work and help teams scale smarter.
            </motion.p>

            <div className="flex items-center gap-3">
              <motion.a
                href="#projects"
                {...fadeUp(0.55)}
                className="group flex items-center gap-2 bg-primary rounded-full pl-4 pr-1.5 py-1.5 no-underline transition-all duration-300 hover:gap-3"
              >
                <span className="text-black font-medium text-sm">View My Work</span>
                <span className="bg-black rounded-full w-9 h-9 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <ArrowRight size={15} color="#DEDBC8" />
                </span>
              </motion.a>

              <motion.a
                href="#contact"
                {...fadeUp(0.65)}
                className="liquid-glass rounded-full px-5 py-3 text-sm no-underline transition-transform duration-200 hover:scale-[1.03]"
                style={{ color: '#E1E0CC' }}
              >
                Let's Talk
              </motion.a>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-6 right-6 z-20 flex flex-col items-center gap-1"
          style={{ color: 'rgba(225,224,204,0.25)' }}
        >
          <span className="text-[8px] tracking-[0.18em] uppercase">Scroll</span>
          <ChevronDown size={11} />
        </motion.div>
      </div>
    </section>
  );
}
