import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';

const EASE = [0.22, 1, 0.36, 1] as const;

const FIELD_STYLE: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(225,224,204,0.25)',
  outline: 'none',
  color: '#E1E0CC',
  fontFamily: "'Instrument Serif', serif",
  fontStyle: 'italic',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  padding: '0 6px 4px',
  width: '100%',
  caretColor: '#E1E0CC',
  transition: 'border-color 0.2s',
};

const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderBottomColor = 'rgba(225,224,204,0.75)';
};
const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderBottomColor = 'rgba(225,224,204,0.25)';
};

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Formspree hook — form ID from https://formspree.io/f/mvzywobn
  const [state, handleSubmit, reset] = useForm('mvzywobn');

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 bg-black">
      <div className="max-w-4xl mx-auto">

        {/* Label */}
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-6 m-0"
          style={{ color: 'rgba(225,224,204,0.35)' }}
        >
          Get In Touch
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          className="font-normal m-0 mb-14 sm:mb-20 leading-[0.88]"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            color: '#E1E0CC',
            fontSize: 'clamp(3.5rem, 12vw, 8rem)',
          }}
        >
          reachout
        </motion.h2>

        {/* ── SUCCESS STATE ─────────────────────────────────────── */}
        {state.succeeded ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col gap-4 py-16"
          >
            <span style={{ fontSize: '2.5rem' }}>✉️</span>
            <p
              className="text-2xl sm:text-3xl font-normal m-0"
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#E1E0CC' }}
            >
              Message received.
            </p>
            <p className="text-sm m-0" style={{ color: 'rgba(225,224,204,0.5)' }}>
              I'll get back to you shortly at the email you provided.
            </p>
            <button
              onClick={reset}
              className="mt-6 text-xs bg-transparent border-none cursor-pointer p-0 text-left transition-colors duration-200 w-fit"
              style={{ color: 'rgba(225,224,204,0.4)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225,224,204,0.4)')}
            >
              ← Send another message
            </button>
          </motion.div>

        ) : (
          /* ── FORM ──────────────────────────────────────────────── */
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
            className="flex flex-col gap-10 sm:gap-14"
          >
            {/* Hidden subject line — shows nicely in inbox */}
            <input type="hidden" name="_subject" value="New enquiry via Abdulrasaq Portfolio" />

            {/* ── I'm [name] */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-xs tracking-widest uppercase"
                style={{ color: 'rgba(225,224,204,0.35)' }}
              >
                Your name
              </label>
              <div
                className="flex items-baseline gap-3 text-3xl sm:text-4xl md:text-5xl"
                style={{ color: 'rgba(225,224,204,0.3)', fontFamily: "'Instrument Serif', serif" }}
              >
                <span className="flex-shrink-0">I'm</span>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  placeholder="your name"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  style={FIELD_STYLE}
                />
              </div>
              <ValidationError field="name" prefix="Name" errors={state.errors}
                className="text-xs mt-1" style={{ color: '#f87171' }} />
            </div>

            {/* ── My email [email] */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-xs tracking-widest uppercase"
                style={{ color: 'rgba(225,224,204,0.35)' }}
              >
                Your email
              </label>
              <div
                className="flex items-baseline gap-3 text-3xl sm:text-4xl md:text-5xl"
                style={{ color: 'rgba(225,224,204,0.3)', fontFamily: "'Instrument Serif', serif" }}
              >
                <span className="flex-shrink-0">My email</span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  style={FIELD_STYLE}
                />
              </div>
              <ValidationError field="email" prefix="Email" errors={state.errors}
                className="text-xs mt-1" style={{ color: '#f87171' }} />
            </div>

            {/* ── I need your service for [service] */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="service"
                className="text-xs tracking-widest uppercase"
                style={{ color: 'rgba(225,224,204,0.35)' }}
              >
                Service needed
              </label>
              <div
                className="flex flex-wrap items-baseline gap-3 text-3xl sm:text-4xl md:text-5xl"
                style={{ color: 'rgba(225,224,204,0.3)', fontFamily: "'Instrument Serif', serif" }}
              >
                <span className="flex-shrink-0">I need your service for</span>
                <input
                  id="service"
                  type="text"
                  name="service"
                  required
                  placeholder="workflow automation…"
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                  style={{ ...FIELD_STYLE, minWidth: '200px', flex: 1 }}
                />
              </div>
              <ValidationError field="service" prefix="Service" errors={state.errors}
                className="text-xs mt-1" style={{ color: '#f87171' }} />
            </div>

            {/* ── Here is my project [message] */}
            <div className="flex flex-col gap-4">
              <span
                className="text-3xl sm:text-4xl md:text-5xl"
                style={{ color: 'rgba(225,224,204,0.3)', fontFamily: "'Instrument Serif', serif" }}
              >
                Here is my project
              </span>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Tell me what you're working on, the problem you're trying to solve, and any relevant details…"
                onFocus={inputFocus}
                onBlur={inputBlur}
                style={{
                  ...FIELD_STYLE,
                  border: 'none',
                  borderBottom: '1px solid rgba(225,224,204,0.25)',
                  resize: 'none',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  fontFamily: "'Almarai', sans-serif",
                  fontStyle: 'normal',
                }}
              />
              <ValidationError field="message" prefix="Project" errors={state.errors}
                className="text-xs" style={{ color: '#f87171' }} />
            </div>

            {/* ── Submit */}
            <div className="flex items-center gap-6 pt-2">
              <button
                type="submit"
                disabled={state.submitting}
                className="rounded-full px-8 py-4 text-sm font-medium tracking-[0.12em] uppercase transition-all duration-300 hover:scale-[1.03] cursor-pointer border-none"
                style={{
                  background: '#E1E0CC',
                  color: '#000',
                  opacity: state.submitting ? 0.6 : 1,
                  letterSpacing: '0.12em',
                }}
              >
                {state.submitting ? 'Sending…' : 'Submit'}
              </button>

              {/* Global form error (e.g. network failure) */}
              <ValidationError errors={state.errors}
                className="text-xs m-0" style={{ color: '#f87171' }} />
            </div>
          </motion.form>
        )}

        {/* ── Footer */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-20 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <a
            href="mailto:Abdulrasaq.Agboluaje@gmail.com"
            className="text-xs no-underline transition-colors duration-200"
            style={{ color: 'rgba(225,224,204,0.35)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225,224,204,0.35)')}
          >
            Abdulrasaq.Agboluaje@gmail.com
          </a>
          <p className="text-[10px] m-0" style={{ color: 'rgba(225,224,204,0.2)' }}>
            © 2025 Abdulrasaq Agboluaje
          </p>
        </div>
      </div>
    </section>
  );
}
