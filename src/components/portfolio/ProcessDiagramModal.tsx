import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Types ───────────────────────────────────────────────────── */
export type FlowStep = {
  label: string;
  sub?: string;
  pain?: string;   // red warning badge — As-Is pain points
  gain?: string;   // accent-coloured badge — To-Be improvements
};

export type ProcessData = {
  asIs: { summary: string; steps: FlowStep[] };
  toBe:  { summary: string; steps: FlowStep[] };
};

/* ─── Single flow node ────────────────────────────────────────── */
function FlowNode({
  step, index, accent, isLast,
}: { step: FlowStep; index: number; accent: string; isLast: boolean }) {
  return (
    <div className="flex flex-col items-start w-full">
      {/* Card */}
      <div
        className="w-full rounded-xl px-4 py-3.5"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <span
          className="block text-[9px] tracking-[0.18em] uppercase mb-1.5"
          style={{ color: 'rgba(225,224,204,0.22)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <p className="text-sm font-medium m-0 leading-snug" style={{ color: '#E1E0CC' }}>
          {step.label}
        </p>
        {step.sub && (
          <p className="text-xs m-0 mt-1 leading-relaxed" style={{ color: 'rgba(225,224,204,0.38)' }}>
            {step.sub}
          </p>
        )}
      </div>

      {/* Badge */}
      {(step.pain || step.gain) && (
        <div
          className="mt-2 ml-1 px-2.5 py-1 rounded-full text-[10px] leading-none"
          style={{
            background: step.pain ? 'rgba(239,68,68,0.1)' : `${accent}18`,
            color:      step.pain ? '#f87171' : accent,
            border:     `1px solid ${step.pain ? 'rgba(239,68,68,0.2)' : accent + '30'}`,
          }}
        >
          {step.pain ? `⚠ ${step.pain}` : `✦ ${step.gain}`}
        </div>
      )}

      {/* Connector */}
      {!isLast && (
        <div className="flex flex-col items-center self-center my-2" style={{ gap: 0 }}>
          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.08)' }} />
          <div style={{
            width: 0, height: 0,
            borderLeft:  '4px solid transparent',
            borderRight: '4px solid transparent',
            borderTop:   '5px solid rgba(255,255,255,0.12)',
          }} />
        </div>
      )}
    </div>
  );
}

/* ─── Modal ───────────────────────────────────────────────────── */
export function ProcessDiagramModal({
  projectName,
  accentColor,
  processData,
  onClose,
}: {
  projectName: string;
  accentColor: string;
  processData: ProcessData;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<'asis' | 'tobe'>('asis');

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  const current = tab === 'asis' ? processData.asIs : processData.toBe;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6"
      style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0,  opacity: 1 }}
        exit={{ y: 48,   opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:rounded-2xl overflow-hidden flex flex-col"
        style={{
          maxWidth: 580,
          maxHeight: '90vh',
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.09)',
        }}
      >
        {/* ── Header */}
        <div
          className="flex items-start justify-between px-5 sm:px-6 py-5 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div>
            <p className="text-[9px] tracking-[0.22em] uppercase m-0 mb-1.5"
              style={{ color: 'rgba(225,224,204,0.28)' }}>
              Process Diagram
            </p>
            <h3
              className="text-lg sm:text-xl font-medium m-0 leading-tight"
              style={{ color: '#E1E0CC', fontFamily: "'Instrument Serif', serif" }}
            >
              {projectName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center border-none cursor-pointer flex-shrink-0 mt-0.5"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(225,224,204,0.45)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          >
            <X size={14} />
          </button>
        </div>

        {/* ── Tabs */}
        <div className="flex px-5 sm:px-6 pt-4 gap-2 flex-shrink-0">
          {(['asis', 'tobe'] as const).map((t) => {
            const active = tab === t;
            const isToBe = t === 'tobe';
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-4 py-2 rounded-full text-[11px] tracking-wide border-none cursor-pointer transition-all duration-200"
                style={{
                  background: active
                    ? isToBe ? `${accentColor}18` : 'rgba(255,255,255,0.08)'
                    : 'transparent',
                  color: active
                    ? isToBe ? accentColor : '#E1E0CC'
                    : 'rgba(225,224,204,0.3)',
                  border: `1px solid ${active
                    ? isToBe ? accentColor + '35' : 'rgba(255,255,255,0.12)'
                    : 'transparent'}`,
                }}
              >
                {t === 'asis' ? 'As-Is · Before' : 'To-Be · After'}
              </button>
            );
          })}
        </div>

        {/* ── Summary */}
        <p
          className="px-5 sm:px-6 pt-4 pb-0 text-xs sm:text-[13px] leading-relaxed m-0 flex-shrink-0"
          style={{ color: 'rgba(225,224,204,0.42)' }}
        >
          {current.summary}
        </p>

        {/* ── Flow — scrollable */}
        <div
          className="px-5 sm:px-6 pb-7 pt-5 overflow-y-auto flex-1"
          style={{ scrollbarWidth: 'none' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {current.steps.map((step, i) => (
                <FlowNode
                  key={i}
                  step={step}
                  index={i}
                  accent={accentColor}
                  isLast={i === current.steps.length - 1}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
