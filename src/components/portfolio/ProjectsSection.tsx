import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ProcessDiagramModal, type ProcessData } from './ProcessDiagramModal';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Project {
  id: string;
  name: string;
  company: string;
  tagline: string;
  description: string;
  stack: string[];
  year: string;
  gradient: string;
  accentColor: string;
  badge?: string;
  stat?: { value: string; label: string };
  processData?: ProcessData;
}

const PROJECTS: Project[] = [
  {
    id: '01',
    name: 'Dakdan Bid Pipeline',
    company: 'Dakdan Worldwide',
    tagline: 'Autonomous bid scanning & proposal generation for a 16-division federal contractor.',
    description: `The team was losing winnable government contracts not from lack of capability, but lack of hours. I built a fully serverless pipeline that scans live procurement portals twice daily, scores opportunities against each division's capabilities, generates AI-written proposals, and delivers them for one-click approval — without manual input.`,
    stack: ['Node.js', 'Claude AI', 'Supabase', 'Serverless', 'Vercel'],
    year: '2024',
    gradient: 'from-[#0b1a2e] via-[#091422] to-[#050d18]',
    accentColor: '#4a8cff',
    processData: {
      asIs: {
        summary: 'The team manually monitored portals every morning, wrote proposals from scratch over multiple days, and lost winnable contracts simply because there were not enough hours.',
        steps: [
          {
            label: 'Work day begins — team starts portal checks',
            pain: '1–2 hours of manual portal monitoring every morning',
          },
          {
            label: 'Manually scan each procurement portal for listings',
            pain: 'Opportunities missed or discovered too late to respond',
          },
          {
            label: 'Manually evaluate each listing for division relevance',
            pain: 'Subjective, inconsistent scoring — no shared criteria',
          },
          {
            label: 'Write proposal from scratch for qualified bids',
            pain: '3–5 days per proposal — limited team capacity',
          },
          {
            label: 'Submit draft to manager for review & approval',
            pain: 'Bottlenecks cause missed submission deadlines',
          },
          {
            label: 'Contracts won — or lost due to capacity limits',
            pain: 'Winnable bids missed, not from lack of skill',
          },
        ],
      },
      toBe: {
        summary: 'A fully serverless pipeline now scans every portal twice daily, scores bids with AI, generates full proposals automatically, and delivers them for one-click approval — zero manual input.',
        steps: [
          {
            label: 'Scheduled trigger fires at 6 AM and 6 PM',
            gain: 'Zero manual effort — cycle starts automatically',
          },
          {
            label: 'Pipeline auto-scans all procurement portals',
            gain: '100% portal coverage — every listing captured',
          },
          {
            label: 'AI scores each bid against division capabilities',
            gain: 'Consistent, objective scoring in seconds',
          },
          {
            label: 'Low-scoring opportunities filtered out automatically',
          },
          {
            label: 'Claude AI generates a full proposal draft',
            gain: 'Proposal ready in minutes — not days',
          },
          {
            label: 'Manager receives one-click review notification',
            gain: 'Sees only pre-qualified, fully drafted bids',
          },
          {
            label: 'Approved proposal auto-submitted to portal',
            gain: 'More contracts won — zero manual input',
          },
        ],
      },
    },
  },
  {
    id: '02',
    name: 'Intern Onboarding Workflow',
    company: 'Sports Media Inc.',
    tagline: 'End-to-end applicant onboarding automation — from first application to final stage.',
    description: `HR was manually managing every step of the onboarding pipeline: collecting applications, chasing documents, scheduling interviews, and triggering stage progressions. I designed and built a workflow automation solution that handled each stage automatically, removing the need for manual intervention and freeing the HR team to focus on people, not paperwork.`,
    stack: ['Workflow Automation', 'CRM Integration', 'Process Design', 'Salesforce'],
    year: '2023',
    gradient: 'from-[#1a1200] via-[#120d00] to-[#080600]',
    accentColor: '#f59e0b',
    stat: { value: '70%', label: 'HR workload reduced' },
    processData: {
      asIs: {
        summary: 'HR manually managed every touchpoint — chasing documents, scheduling interviews, updating records — consuming the majority of the team\'s time on admin instead of people.',
        steps: [
          {
            label: 'Applicant submits application via email or form',
            pain: 'No central intake — applications get lost or delayed',
          },
          {
            label: 'HR manually reviews and acknowledges receipt',
            pain: 'Slow responses cause qualified candidates to drop off',
          },
          {
            label: 'HR emails applicant requesting required documents',
            pain: 'Days of back-and-forth chasing per applicant',
          },
          {
            label: 'HR manually schedules interview',
            pain: 'Calendar conflicts and double-bookings common',
          },
          {
            label: 'HR manually sends outcome notification',
            pain: 'Inconsistent messaging, prone to human error',
          },
          {
            label: 'HR manually creates record in Salesforce',
            pain: 'Hours of data entry — repeated for every applicant',
          },
          {
            label: 'New intern manually set up in internal systems',
            pain: '70% of HR time consumed by admin, not people',
          },
        ],
      },
      toBe: {
        summary: 'Every stage from intake to onboarding now runs automatically — the system chases documents, books interviews, and updates records without a single manual step.',
        steps: [
          {
            label: 'Applicant submits application',
          },
          {
            label: 'CRM auto-creates and categorises applicant record',
            gain: 'Centralised intake — nothing slips through',
          },
          {
            label: 'Automated document request sequence triggered',
            gain: 'System follows up automatically — no chasing needed',
          },
          {
            label: 'Interview auto-scheduled via calendar integration',
            gain: 'Conflict-free booking with instant confirmation',
          },
          {
            label: 'Outcome auto-triggered based on pipeline stage',
            gain: 'Consistent, professional communication every time',
          },
          {
            label: 'Salesforce record auto-updated at each stage',
            gain: 'Real-time pipeline visibility — zero data entry',
          },
          {
            label: 'Onboarding access and tasks auto-provisioned',
            gain: '70% workload reduced — HR focuses on people',
          },
        ],
      },
    },
  },
  {
    id: '03',
    name: 'Marketing Lead Engine',
    company: 'Sports Media Inc.',
    tagline: 'Automated marketing workflows that doubled engagement and grew the lead pipeline.',
    description: `Marketing was running manual email campaigns with no segmentation, no nurture logic, and no consistent follow-up. I implemented and managed a full marketing automation platform — building automated workflows, integrating the CRM for audience sync, and building test plans to validate data accuracy across every stage of the funnel.`,
    stack: ['Marketing Automation', 'Email Campaigns', 'Audience Segmentation', 'CRM', 'Python'],
    year: '2022',
    gradient: 'from-[#1a0a0e] via-[#120007] to-[#080003]',
    accentColor: '#f43f5e',
    stat: { value: '42%', label: 'increase in lead generation' },
    processData: {
      asIs: {
        summary: 'Marketing sent identical blasts to the full list with no segmentation, no nurture, and no insight — leads went cold after the first email and campaigns repeated regardless of results.',
        steps: [
          {
            label: 'Marketing team manually builds campaign',
            pain: 'Hours of manual setup — repeated from scratch each time',
          },
          {
            label: 'Single email blast sent to full contact list',
            pain: 'No segmentation — irrelevant to the majority of recipients',
          },
          {
            label: 'No follow-up or nurture sequence',
            pain: 'Leads go cold after the first touchpoint',
          },
          {
            label: 'Responses manually logged in CRM',
            pain: 'Delayed, inaccurate data entry — pipeline data unreliable',
          },
          {
            label: 'No A/B testing or performance analysis',
            pain: 'Same underperforming approach repeated every campaign',
          },
          {
            label: 'Pipeline stagnates — leads fail to convert',
            pain: '42% below lead generation potential',
          },
        ],
      },
      toBe: {
        summary: 'A full marketing automation platform now segments leads, runs multi-stage nurture flows, syncs the CRM in real time, and continuously optimises — delivering a 42% lift in qualified lead generation.',
        steps: [
          {
            label: 'Lead enters the system',
          },
          {
            label: 'Auto-segmented by behaviour, interest & profile',
            gain: 'Hyper-relevant content delivered to each segment',
          },
          {
            label: 'Automated nurture workflow triggered',
            gain: 'Consistent follow-up at the right cadence — automatically',
          },
          {
            label: 'CRM auto-synced at every interaction point',
            gain: 'Real-time lead intelligence — zero manual data entry',
          },
          {
            label: 'A/B test results auto-analysed after each cycle',
            gain: 'Every iteration improves on the last',
          },
          {
            label: 'High-intent leads auto-flagged for sales outreach',
            gain: 'Sales reaches the right lead at the right moment',
          },
          {
            label: '42% increase in qualified lead generation',
            gain: 'Compounding returns with every campaign cycle',
          },
        ],
      },
    },
  },
  {
    id: '04',
    name: 'Athlete App × POD Store',
    company: 'Independent',
    tagline: 'Zero-touch merchandise fulfilment between an athlete platform and a POD store.',
    description: `Every order previously required manual data entry across two disconnected platforms. I built an automation layer that fires purchase triggers from the athlete app directly into the POD store workflow, carrying the correct product, size, and shipping data — with status updates syncing back automatically.`,
    stack: ['API Integration', 'Workflow Automation', 'E-Commerce', 'Webhooks'],
    year: '2024',
    gradient: 'from-[#0a1f18] via-[#071510] to-[#040e09]',
    accentColor: '#2acd8a',
    processData: {
      asIs: {
        summary: 'Every merchandise order required staff to manually copy data between two disconnected platforms — a process prone to errors, missed orders, and customer delays.',
        steps: [
          {
            label: 'Customer places merchandise order in athlete app',
          },
          {
            label: 'Order sits unprocessed until staff check in',
            pain: 'Orders missed entirely outside working hours',
          },
          {
            label: 'Staff manually copies order details by hand',
            pain: 'Copy errors — wrong size, product or shipping address',
          },
          {
            label: 'Staff manually enters data into POD store system',
            pain: '~10 minutes of duplicate effort per order',
          },
          {
            label: 'POD store processes and fulfils the order',
          },
          {
            label: 'Staff manually checks fulfilment status in POD',
            pain: 'No real-time visibility — customers left waiting',
          },
          {
            label: 'Status manually updated in athlete app',
            pain: 'Delays, errors, and frustrated customers',
          },
        ],
      },
      toBe: {
        summary: 'A webhook-based automation layer now connects both platforms — purchase triggers fire instantly, order data transfers error-free, and fulfilment status syncs back automatically to the athlete app.',
        steps: [
          {
            label: 'Customer places merchandise order in athlete app',
          },
          {
            label: 'Purchase trigger fires instantly via webhook',
            gain: 'Zero human involvement — instant processing',
          },
          {
            label: 'Product, size & shipping data passed to POD store',
            gain: 'Error-free data transfer every single time',
          },
          {
            label: 'POD store processes & fulfils order automatically',
            gain: 'No manual steps anywhere in the fulfilment flow',
          },
          {
            label: 'Order status syncs back to athlete app in real time',
            gain: 'Live tracking visible to customer immediately',
          },
          {
            label: 'Zero-touch fulfilment complete',
            gain: 'Flawless every time — at any hour, without staff',
          },
        ],
      },
    },
  },
  {
    id: '05',
    name: 'Team Travel Booking App',
    company: 'Independent',
    tagline: 'A mobile platform purpose-built for coordinating sports team travel.',
    description: `Group bookings, rosters, budgets, and match schedules — managed across tools that were never built for teams. Currently building a mobile-first app that centralises travel logistics, from flights and hotels to itinerary generation and budget tracking.`,
    stack: ['React Native', 'Mobile Design', 'Travel API', 'Automation'],
    year: '2025',
    gradient: 'from-[#160e2a] via-[#0f0a1e] to-[#090613]',
    accentColor: '#9b6dff',
    badge: 'In Progress',
  },
];

/* ─── Project card ────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  onViewProject,
}: {
  project: Project;
  index: number;
  onViewProject: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 32, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: EASE }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Gradient header */}
      <div className={`relative bg-gradient-to-br ${project.gradient} h-36 sm:h-44 flex flex-col justify-between p-5`}>
        <div className="flex items-start justify-between">
          {project.badge ? (
            <span
              className="text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: project.accentColor,
              }}
            >
              {project.badge}
            </span>
          ) : (
            <span className="text-[9px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {project.company}
            </span>
          )}
          <span className="w-2 h-2 rounded-full opacity-80" style={{ background: project.accentColor }} />
        </div>

        {project.stat && (
          <div className="flex flex-col gap-0.5">
            <span className="text-3xl font-bold" style={{ color: project.accentColor, fontFamily: "'Almarai', sans-serif" }}>
              {project.stat.value}
            </span>
            <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {project.stat.label}
            </span>
          </div>
        )}

        {!project.stat && (
          <span className="text-xs font-medium tracking-wider self-end" style={{ color: 'rgba(255,255,255,0.2)' }}>
            {project.id}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="bg-[#111] p-5 sm:p-6 flex flex-col gap-3 flex-1">
        <div>
          <h3
            className="text-xl sm:text-2xl font-medium m-0 mb-1 leading-tight"
            style={{ color: '#E1E0CC', fontFamily: "'Instrument Serif', serif" }}
          >
            {project.name}
          </h3>
          <p className="text-xs sm:text-sm m-0" style={{ color: 'rgba(225,224,204,0.5)' }}>
            {project.tagline}
          </p>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed m-0" style={{ color: 'rgba(225,224,204,0.6)' }}>
          {project.description}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(225,224,204,0.55)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between mt-auto pt-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span className="text-[10px] tracking-widest" style={{ color: 'rgba(225,224,204,0.3)' }}>
            {project.year}
          </span>

          {project.processData ? (
            <button
              onClick={onViewProject}
              className="flex items-center gap-1.5 text-[11px] transition-all duration-200 group-hover:gap-2.5 bg-transparent border-none cursor-pointer p-0"
              style={{ color: 'rgba(225,224,204,0.45)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225,224,204,0.45)')}
            >
              View project
              <ArrowRight size={11} style={{ transform: 'rotate(-45deg)' }} />
            </button>
          ) : (
            <span className="text-[10px] tracking-widest italic" style={{ color: 'rgba(225,224,204,0.2)' }}>
              In progress
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────────────── */
export default function ProjectsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="bg-black py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div ref={headerRef} className="mb-12 sm:mb-16">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-3 m-0"
              style={{ color: 'rgba(225,224,204,0.4)' }}
            >
              Selected Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
              className="text-4xl sm:text-5xl md:text-6xl font-normal m-0 leading-[0.92]"
              style={{ fontFamily: "'Instrument Serif', serif", color: '#E1E0CC' }}
            >
              Projects
            </motion.h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onViewProject={() => setActiveProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process diagram modal — rendered outside section to avoid transform clipping */}
      <AnimatePresence>
        {activeProject?.processData && (
          <ProcessDiagramModal
            projectName={activeProject.name}
            accentColor={activeProject.accentColor}
            processData={activeProject.processData}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
