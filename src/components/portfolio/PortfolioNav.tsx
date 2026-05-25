import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function PortfolioNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav
        className="flex items-center gap-2 sm:gap-6 md:gap-8 px-4 sm:px-6 py-3 rounded-full transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(225,224,200,0.09)',
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          className="text-base sm:text-lg no-underline select-none flex-shrink-0"
          style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#E1E0CC' }}
        >
          AA
        </a>

        {/* Divider */}
        <span
          className="hidden sm:block flex-shrink-0"
          style={{ width: 1, height: 14, background: 'rgba(225,224,200,0.15)' }}
        />

        {/* Nav links */}
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-[10px] sm:text-xs no-underline transition-colors duration-200 whitespace-nowrap flex-shrink-0"
            style={{ color: 'rgba(225,224,204,0.55)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#E1E0CC')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(225,224,204,0.55)')}
          >
            {label}
          </a>
        ))}

      </nav>
    </header>
  );
}
