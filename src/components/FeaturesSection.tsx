import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';

const CARD_EASE = [0.22, 1, 0.36, 1] as const;

interface FeatureCardProps {
  index: number;
  children: React.ReactNode;
  className?: string;
}

function FeatureCard({ index, children, className = '' }: FeatureCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: CARD_EASE }}
      className={`rounded-2xl overflow-hidden relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <Check size={14} className="text-primary mt-0.5 flex-shrink-0" color="#DEDBC8" />
      <span className="text-gray-400 text-xs sm:text-sm leading-snug">{text}</span>
    </li>
  );
}

function LearnMore() {
  return (
    <a
      href="#"
      className="inline-flex items-center gap-1.5 text-primary/70 text-xs sm:text-sm hover:text-primary transition-colors duration-200 no-underline mt-auto"
      style={{ color: 'rgba(222, 219, 200, 0.7)' }}
    >
      Learn more
      <ArrowRight
        size={14}
        style={{ transform: 'rotate(-45deg)' }}
        color="currentColor"
      />
    </a>
  );
}

export default function FeaturesSection() {
  return (
    <section className="min-h-screen bg-black py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Noise background */}
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16 max-w-4xl mx-auto">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-snug">
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: 'Studio-grade workflows for visionary creators.',
                  className: 'text-primary',
                },
              ]}
            />
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-snug mt-1">
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: 'Built for pure vision. Powered by art.',
                  className: 'text-gray-500',
                },
              ]}
              delay={0.2}
            />
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          {/* Card 1 — Video */}
          <FeatureCard index={0} className="lg:col-span-1">
            <div className="relative w-full h-64 md:h-72 lg:h-full">
              <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p className="text-sm sm:text-base font-medium" style={{ color: '#E1E0CC' }}>
                  Your creative canvas.
                </p>
              </div>
            </div>
          </FeatureCard>

          {/* Card 2 — Project Storyboard */}
          <FeatureCard index={1} className="bg-[#212121] lg:col-span-1">
            <div className="h-full p-5 sm:p-6 flex flex-col gap-4 min-h-[240px] lg:min-h-0">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
                alt=""
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
              />
              <div>
                <p className="text-gray-500 text-[10px] sm:text-xs mb-1">01</p>
                <h3 className="text-primary text-base sm:text-lg font-medium leading-tight" style={{ color: '#E1E0CC' }}>
                  Project Storyboard.
                </h3>
              </div>
              <ul className="list-none m-0 p-0 flex flex-col gap-2 flex-1">
                <CheckItem text="Organize shots and sequences visually" />
                <CheckItem text="Drag-and-drop scene reordering" />
                <CheckItem text="Attach references, notes and timing" />
                <CheckItem text="Export to PDF or share with your team" />
              </ul>
              <LearnMore />
            </div>
          </FeatureCard>

          {/* Card 3 — Smart Critiques */}
          <FeatureCard index={2} className="bg-[#212121] lg:col-span-1">
            <div className="h-full p-5 sm:p-6 flex flex-col gap-4 min-h-[240px] lg:min-h-0">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
                alt=""
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
              />
              <div>
                <p className="text-gray-500 text-[10px] sm:text-xs mb-1">02</p>
                <h3 className="text-primary text-base sm:text-lg font-medium leading-tight" style={{ color: '#E1E0CC' }}>
                  Smart Critiques.
                </h3>
              </div>
              <ul className="list-none m-0 p-0 flex flex-col gap-2 flex-1">
                <CheckItem text="AI-driven analysis of composition and tone" />
                <CheckItem text="Timestamped creative notes from collaborators" />
                <CheckItem text="Integrate with your editing tools seamlessly" />
              </ul>
              <LearnMore />
            </div>
          </FeatureCard>

          {/* Card 4 — Immersion Capsule */}
          <FeatureCard index={3} className="bg-[#212121] lg:col-span-1">
            <div className="h-full p-5 sm:p-6 flex flex-col gap-4 min-h-[240px] lg:min-h-0">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
                alt=""
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
              />
              <div>
                <p className="text-gray-500 text-[10px] sm:text-xs mb-1">03</p>
                <h3 className="text-primary text-base sm:text-lg font-medium leading-tight" style={{ color: '#E1E0CC' }}>
                  Immersion Capsule.
                </h3>
              </div>
              <ul className="list-none m-0 p-0 flex flex-col gap-2 flex-1">
                <CheckItem text="Silence notifications during deep work sessions" />
                <CheckItem text="Ambient soundscapes tuned for creative flow" />
                <CheckItem text="Sync with your calendar to protect focus time" />
              </ul>
              <LearnMore />
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}
