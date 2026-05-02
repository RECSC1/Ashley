import Link from 'next/link';
import { useState, useEffect } from 'react';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/properties', label: 'Properties' },
  { href: '/buyer-tools', label: 'Buyer Tools' },
  { href: '/ai-tools', label: 'AI Tools' },
  { href: '/resources', label: 'Resources' },
  { href: '/client-portal', label: 'Client Portal' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'Admin' },
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

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ivory/95 backdrop-blur-md shadow-soft' : 'bg-ivory/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-wide flex items-center justify-between py-4">
        <Link href="/" className="flex flex-col leading-tight group">
          <span className="font-serif text-2xl text-navy group-hover:text-gold transition">
            Ashley Smith
          </span>
          <span className="text-[10px] uppercase tracking-widewide text-taupe">
            Realtor® · Compass North Carolina
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm text-navy/80 hover:text-gold transition tracking-wide"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/buyer-tools" className="btn btn-outline text-xs">
            Explore Buyer Tools
          </Link>
          <Link href="/contact" className="btn btn-primary text-xs">
            Schedule a Consultation
          </Link>
        </div>

        <button
          aria-label="Open menu"
          className="lg:hidden p-2 text-navy"
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
        <div className="lg:hidden border-t border-taupe/30 bg-warmwhite">
          <div className="container-wide py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-2 text-navy hover:text-gold transition"
              >
                {n.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-3">
              <Link href="/buyer-tools" onClick={() => setOpen(false)} className="btn btn-outline text-xs flex-1">
                Buyer Tools
              </Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary text-xs flex-1">
                Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
