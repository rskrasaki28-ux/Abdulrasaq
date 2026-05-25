import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import WordsPullUp from './WordsPullUp';

const NAV_ITEMS = ['Our story', 'Collective', 'Workshops', 'Programs', 'Inquiries'];

const CUSTOM_EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8, delay, ease: CUSTOM_EASE },
});

export default function HeroSection() {
  return (
    <section className="h-screen p-4 md:p-6">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Background video */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none z-10" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10" />

        {/* Navbar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <nav className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8">
            <ul className="flex flex-nowrap items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14 list-none m-0 p-0">
              {NAV_ITEMS.map((item) => (
                <li key={item} className="flex-shrink-0">
                  <a
                    href="#"
                    className="text-[10px] sm:text-xs md:text-sm no-underline transition-colors duration-200 whitespace-nowrap"
                    style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-8 lg:p-10">
          <div className="grid grid-cols-12 items-end gap-4">
            {/* Heading */}
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-medium leading-[0.85] tracking-[-0.07em] m-0"
                style={{ color: '#E1E0CC' }}
              >
                <span className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em]">
                  <WordsPullUp text="Prisma" showAsterisk />
                </span>
              </h1>
            </div>

            {/* Right column */}
            <div className="col-span-12 lg:col-span-4 flex flex-col items-start gap-4 pb-2 lg:pb-4">
              <motion.p
                {...fadeUp(0.5)}
                className="m-0 text-xs sm:text-sm md:text-base"
                style={{ lineHeight: 1.2, color: 'rgba(222, 219, 200, 0.7)' }}
              >
                Prisma is a worldwide network of visual artists, filmmakers and storytellers bound
                not by place, status or labels but by passion and hunger to unlock potential through
                our unique perspectives.
              </motion.p>

              <motion.button
                {...fadeUp(0.7)}
                className="group flex items-center gap-2 hover:gap-3 bg-primary rounded-full pl-4 pr-1 py-1 transition-all duration-300 cursor-pointer border-none"
              >
                <span className="text-black font-medium text-sm sm:text-base">Join the lab</span>
                <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                  <ArrowRight size={16} color="#DEDBC8" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
