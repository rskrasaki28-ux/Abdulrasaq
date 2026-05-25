import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

interface CaseStudy {
  number: string;
  title: string;
  subtitle: string;
  problem: string;
  process: string;
  outcome: string;
  tags: string[];
  inProgress?: boolean;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    number: '01',
    title: 'From Missed Bids to a Fully Autonomous Government Contracting Pipeline',
    subtitle: 'Architecture, AI, and a pipeline that never sleeps.',
    problem: `Dakdan Worldwide is a 16-division SDVOSB holding company competing for federal government contracts. Winning bids requires scanning live portals daily, matching each opportunity to the right division, writing tailored 900-1,400 word proposals, and managing approvals across an entire portfolio on tight timelines. The team was losing winnable contracts not from lack of capability, but from lack of hours. Manual processing simply could not keep up with the volume.`,
    process: `I designed and built a fully serverless automation platform on Node.js and Vercel that runs the entire pipeline twice daily, without human intervention until a proposal is ready for review. Six stages run in sequence: a Bid Scanner pulls solicitations from BidMatch across all 16 division accounts in parallel; an AI Scoring Engine evaluates each opportunity against division-specific NAICS codes and capability tags; a Proposal Generator uses Claude AI to write a fully formatted proposal tailored to the solicitation; a PDF Packager bundles it with the correct capability statement; a Review Dashboard lets the team approve or reject with one click; and a Submission Engine delivers approved proposals directly to the agency contact. Parallelising with Promise.allSettled cut processing from over an hour to minutes. A knowledge layer architecture separates static division configs from user-editable overrides, so the team can update profiles without a redeploy.`,
    outcome: `All 16 divisions are now monitored simultaneously, twice every weekday. The team no longer scans a single portal — they only see pre-scored, pre-drafted proposals ready for a decision. Each is sent from the correct division's email with its own branding, SMTP credentials, and capability statement. What previously consumed most of a workday now happens invisibly, every morning.`,
    tags: ['Full-Stack Automation', 'AI', 'Node.js', 'Serverless', 'Claude AI', 'Supabase'],
  },
  {
    number: '02',
    title: 'Automating a Print-on-Demand Storefront for an Athlete Platform',
    subtitle: 'Connecting two systems so no one has to.',
    problem: `An athlete-facing app needed a seamless connection between its platform and a print-on-demand store — so merchandise could be ordered, fulfilled, and tracked without any manual back-and-forth. Without automation, every order required manual data entry across two platforms, creating delays, mismatches, and room for error at every step.`,
    process: `I mapped the full order lifecycle — from purchase trigger in the athlete app through to fulfilment confirmation in the POD store — and built an automation layer connecting the two systems via their APIs. Triggers from the app fired automatically into the POD store workflow, carrying the correct product, size, shipping, and customer data. Status updates flowed back in the opposite direction, keeping the athlete app records in sync without manual reconciliation.`,
    outcome: `Orders move from placement to fulfilment initiation automatically, with no manual handoff required. The team reclaimed time previously spent on order management and eliminated the data-entry errors that came with running two systems independently.`,
    tags: ['E-Commerce Automation', 'API Integration', 'Workflow Design', 'Webhooks'],
  },
  {
    number: '03',
    title: 'Building a Mobile Travel Booking Platform for Sports Teams',
    subtitle: 'Purpose-built logistics for rosters, budgets, and match schedules.',
    problem: `Coordinating travel for a sports team — flights, hotels, ground transport, itineraries — across a full roster is a logistical challenge that generic booking platforms are not built for. Group bookings, budget tracking, and schedule alignment typically require a coordinator manually stitching together multiple tools, which is slow, error-prone, and does not scale.`,
    process: `Currently designing and building a mobile-first travel booking application purpose-built for sports teams. The platform centralises group booking, automates itinerary assembly, and aligns travel logistics with match and training schedules — removing the coordination overhead that typically falls on team staff.`,
    outcome: `In progress — results and metrics to be published on launch.`,
    tags: ['Mobile App', 'Travel Automation', 'Process Design', 'React Native'],
    inProgress: true,
  },
];

function PillTag({ label }: { label: string }) {
  return (
    <span
      className="text-[10px] px-2.5 py-1 rounded-full"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: 'rgba(225,224,204,0.5)',
      }}
    >
      {label}
    </span>
  );
}

function CaseStudyCard({ cs, index }: { cs: CaseStudy; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.article
      ref={ref}
      initial={{ y: 36, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: EASE }}
      className="rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col gap-8"
      style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Top */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs tracking-widest" style={{ color: 'rgba(225,224,204,0.3)' }}>
            {cs.number}
          </span>
          {cs.inProgress && (
            <span
              className="text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(155,109,255,0.12)',
                border: '1px solid rgba(155,109,255,0.25)',
                color: '#9b6dff',
              }}
            >
              In Progress
            </span>
          )}
        </div>

        <h3
          className="text-2xl sm:text-3xl md:text-4xl font-normal m-0 leading-[1.05]"
          style={{ fontFamily: "'Instrument Serif', serif", color: '#E1E0CC', maxWidth: '36rem' }}
        >
          {cs.title}
        </h3>
        <p className="text-sm m-0" style={{ color: 'rgba(225,224,204,0.45)' }}>
          {cs.subtitle}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {cs.tags.map((t) => <PillTag key={t} label={t} />)}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

      {/* Three-part breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {([
          { label: 'Problem', body: cs.problem },
          { label: 'Process', body: cs.process },
          { label: 'Outcome', body: cs.outcome },
        ] as const).map(({ label, body }) => (
          <div key={label} className="flex flex-col gap-2">
            <span
              className="text-[9px] tracking-[0.18em] uppercase"
              style={{ color: 'rgba(225,224,204,0.35)' }}
            >
              {label}
            </span>
            <p
              className="text-xs sm:text-sm leading-relaxed m-0"
              style={{
                color: cs.inProgress && label === 'Outcome'
                  ? 'rgba(225,224,204,0.35)'
                  : 'rgba(225,224,204,0.65)',
                fontStyle: cs.inProgress && label === 'Outcome' ? 'italic' : 'normal',
              }}
            >
              {body}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      {!cs.inProgress && (
        <button
          className="flex items-center gap-2 text-xs transition-all duration-200 hover:gap-3 bg-transparent border-none cursor-pointer p-0 w-fit"
          style={{ color: 'rgba(225,224,204,0.45)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225,224,204,0.45)')}
        >
          Read full case study
          <ArrowRight size={12} style={{ transform: 'rotate(-45deg)' }} />
        </button>
      )}
    </motion.article>
  );
}

export default function CaseStudiesSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="case-studies" className="py-20 sm:py-28 px-4 sm:px-6" style={{ background: '#050505' }}>
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-3 m-0"
            style={{ color: 'rgba(225,224,204,0.4)' }}
          >
            Deep Dives
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="text-4xl sm:text-5xl md:text-6xl font-normal m-0 leading-[0.92]"
            style={{ fontFamily: "'Instrument Serif', serif", color: '#E1E0CC' }}
          >
            Case Studies
          </motion.h2>
        </div>

        <div className="flex flex-col gap-4">
          {CASE_STUDIES.map((cs, i) => (
            <CaseStudyCard key={cs.number} cs={cs} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
