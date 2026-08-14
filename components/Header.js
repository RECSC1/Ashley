import Link from 'next/link';
import { useState, useEffect } from 'react';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/properties', label: 'Properties' },
  { href: '/buyer-tools', label: 'Buyer Tools' },
  { href: '/ai-tools', label: 'AI Tools' },
  { href: '/resources', label: 'Resources' },
  { href: '/blog', label: 'Blog' },
  { href: '/triangle-community-guide', label: 'Community Guide' },
  { href: '/home-value', label: 'Home Value' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handle);
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // Lock background scroll when the mobile nav is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft'
          : 'bg-white/85 backdrop-blur-sm'
      }`}
    >
      <div className="container-wide flex items-center justify-between gap-3 py-3 md:py-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex flex-col leading-tight group min-w-0"
        >
          <span className="font-serif text-xl sm:text-2xl text-navy group-hover:text-gold transition truncate">
            Ashley Smith
          </span>
          <span className="text-[10px] uppercase tracking-widewide text-navy/60 truncate">
            Realtor® · Compass North Carolina
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-4 2xl:gap-6">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-xs 2xl:text-sm text-navy/80 hover:text-gold transition tracking-wide"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex xl:hidden 2xl:flex items-center gap-3">
          <Link href="/home-value" className="btn btn-outline text-xs">
            Home Value
          </Link>
          <Link href="/contact" className="btn btn-primary text-xs">
            Schedule a Consultation
          </Link>
        </div>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="xl:hidden p-2 -mr-2 text-navy shrink-0"
          onClick={() => setOpen(!open)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="xl:hidden border-t border-navy/10 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="container-wide py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 text-navy hover:text-gold transition border-b border-navy/10 last:border-b-0"
              >
                {n.label}
              </Link>
            ))}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Link
                href="/home-value"
                onClick={() => setOpen(false)}
                className="btn btn-outline text-xs flex-1"
              >
                Home Value
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn btn-primary text-xs flex-1"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
