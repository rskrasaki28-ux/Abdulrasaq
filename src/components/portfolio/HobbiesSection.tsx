import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Settings } from 'lucide-react';
import { BsController, BsTvFill, BsBookshelf } from 'react-icons/bs';
import { GiSoccerKick, GiPerfumeBottle } from 'react-icons/gi';
import type { IconType } from 'react-icons';

const EASE = [0.22, 1, 0.36, 1] as const;

type Hobby = {
  icon: IconType | React.ElementType;
  name: string;
  desc: string;
};

const HOBBIES: Hobby[] = [
  {
    icon: Settings,
    name: 'Systems Thinking',
    desc: 'Mapping how processes connect — and finding the one change that fixes ten problems.',
  },
  {
    icon: BsController,
    name: 'Video Games',
    desc: 'Strategy, open-world exploration, and competitive play — always looking for the optimal path.',
  },
  {
    icon: BsTvFill,
    name: 'Vintage Movies',
    desc: 'Classic cinema, old-school storytelling, and the kind of films they simply do not make anymore.',
  },
  {
    icon: BsBookshelf,
    name: 'Reading',
    desc: 'Business strategy, systems design, and the occasional deep dive into cognitive science.',
  },
  {
    icon: GiSoccerKick,
    name: 'Football',
    desc: 'I play as a Number 10 — reading the game, finding pockets of space, and distributing passes with precision.',
  },
  {
    icon: GiPerfumeBottle,
    name: 'Perfumes',
    desc: 'Fragrance is invisible design. I appreciate the craft behind a well-composed scent.',
  },
];

function HobbyCard({ hobby, index }: { hobby: Hobby; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = hobby.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ y: 24, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: EASE }}
      className="rounded-xl p-5 flex flex-col gap-2 transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <Icon size={24} style={{ color: 'rgba(225,224,204,0.7)' }} />
      <h4 className="text-sm font-medium m-0" style={{ color: '#E1E0CC' }}>
        {hobby.name}
      </h4>
      <p className="text-xs leading-relaxed m-0" style={{ color: 'rgba(225,224,204,0.5)' }}>
        {hobby.desc}
      </p>
    </motion.div>
  );
}

export default function HobbiesSection() {
  const bioRef = useRef(null);
  const bioInView = useInView(bioRef, { once: true });

  return (
    <section id="about" className="bg-black py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Bio column */}
          <div ref={bioRef} className="flex flex-col gap-6">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={bioInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-3 m-0"
                style={{ color: 'rgba(225,224,204,0.4)' }}
              >
                About Me
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={bioInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
                className="text-4xl sm:text-5xl md:text-6xl font-normal m-0 leading-[0.92]"
                style={{ fontFamily: "'Instrument Serif', serif", color: '#E1E0CC' }}
              >
                Beyond the&nbsp;
                <em style={{ fontStyle: 'italic' }}>screen</em>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={bioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
              className="flex flex-col gap-4"
            >
              <p className="text-sm sm:text-base leading-[1.75] m-0" style={{ color: 'rgba(225,224,204,0.65)' }}>
                I'm <strong style={{ color: '#E1E0CC', fontWeight: 600 }}>Abdulrasaq Agboluaje</strong> — a Business Automation Manager based in Lagos. I design and manage workflow automation solutions that eliminate manual work and free teams to focus on higher-value tasks.
              </p>
              <p className="text-sm sm:text-base leading-[1.75] m-0" style={{ color: 'rgba(225,224,204,0.65)' }}>
                I specialise in process analysis, systems integration, and end-to-end automation — bridging the gap between how teams work today and how they should work tomorrow.
              </p>
              <p className="text-sm sm:text-base leading-[1.75] m-0" style={{ color: 'rgba(225,224,204,0.65)' }}>
                When I'm not redesigning a workflow, I'm studying systems — whether that's in sport, business, or everyday life. I believe the best automation is invisible: the work gets done, and no one has to think about how.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={bioInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.32, ease: EASE }}
              className="grid grid-cols-3 gap-4 pt-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              {[
                { value: '3+', label: 'Years of automation experience' },
                { value: '70%', label: 'Average HR workload reduction' },
                { value: '42%', label: 'Lead generation increase' },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span
                    className="text-2xl sm:text-3xl font-bold"
                    style={{ fontFamily: "'Almarai', sans-serif", color: '#E1E0CC' }}
                  >
                    {value}
                  </span>
                  <span className="text-[10px] sm:text-xs leading-tight" style={{ color: 'rgba(225,224,204,0.4)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hobbies grid */}
          <div className="flex flex-col gap-3">
            <p
              className="text-[10px] sm:text-xs tracking-[0.2em] uppercase m-0 mb-2"
              style={{ color: 'rgba(225,224,204,0.4)' }}
            >
              What I Do for Fun
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HOBBIES.map((hobby, i) => (
                <HobbyCard key={hobby.name} hobby={hobby} index={i} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
