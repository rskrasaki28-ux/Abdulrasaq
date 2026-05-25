import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home', active: true },
  { label: 'Studio' },
  { label: 'About' },
  { label: 'Journal' },
  { label: 'Reach Us' },
];

const DISPLAY_FONT = "'Instrument Serif', serif";

export default function VelorahPage() {
  return (
    <div className="velorah-root relative min-h-screen">

      {/* ── Fullscreen background video ────────────────────── */}
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* ── Page content sits above video ──────────────────── */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── Navigation ─────────────────────────────────────── */}
        <nav className="w-full">
          <div className="flex flex-row items-center justify-between px-8 py-6 max-w-7xl mx-auto">

            {/* Logo */}
            <span
              className="text-3xl tracking-tight select-none"
              style={{ fontFamily: DISPLAY_FONT, color: 'var(--foreground)' }}
            >
              Velorah<sup className="text-xs">®</sup>
            </span>

            {/* Nav links — hidden on mobile */}
            <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
              {NAV_LINKS.map(({ label, active }) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-sm transition-colors duration-200 no-underline"
                    style={{
                      color: active ? 'var(--foreground)' : 'var(--muted-foreground)',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = 'var(--foreground)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = active
                        ? 'var(--foreground)'
                        : 'var(--muted-foreground)')
                    }
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA — nav */}
            <button
              className="liquid-glass rounded-full px-6 py-2.5 text-sm transition-transform duration-200 hover:scale-[1.03] cursor-pointer"
              style={{ color: 'var(--foreground)' }}
            >
              Begin Journey
            </button>
          </div>
        </nav>

        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-40"
          style={{ paddingTop: '90px', paddingBottom: '90px' }}
        >
          {/* H1 */}
          <h1
            className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl font-normal max-w-7xl leading-[0.95] mx-auto"
            style={{
              fontFamily: DISPLAY_FONT,
              letterSpacing: '-2.46px',
              color: 'var(--foreground)',
            }}
          >
            Where{' '}
            <em
              className="not-italic"
              style={{ color: 'var(--muted-foreground)' }}
            >
              dreams
            </em>{' '}
            rise{' '}
            <em
              className="not-italic"
              style={{ color: 'var(--muted-foreground)' }}
            >
              through the silence.
            </em>
          </h1>

          {/* Subtext */}
          <p
            className="animate-fade-rise-delay text-base sm:text-lg max-w-2xl mt-8 leading-relaxed"
            style={{ color: 'var(--muted-foreground)' }}
          >
            We're designing tools for deep thinkers, bold creators, and quiet rebels.
            Amid the chaos, we build digital spaces for sharp focus and inspired work.
          </p>

          {/* CTA — hero */}
          <button
            className="animate-fade-rise-delay-2 liquid-glass rounded-full px-14 py-5 text-base mt-12 transition-transform duration-200 hover:scale-[1.03] cursor-pointer"
            style={{ color: 'var(--foreground)' }}
          >
            Begin Journey
          </button>

          {/* Back link */}
          <Link
            to="/"
            className="mt-16 text-xs transition-colors duration-200 no-underline"
            style={{ color: 'var(--muted-foreground)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted-foreground)')}
          >
            ← Back to Prisma
          </Link>
        </section>
      </div>
    </div>
  );
}
