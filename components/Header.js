import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';

/*
 * Navigation: 4 top-level items plus two buttons.
 * Items with `children` render as a dropdown (desktop) or accordion (mobile).
 * Home is the logo. Contact is the "Schedule a Consultation" button.
 */
const NAV = [
  { href: '/about', label: 'About' },
  { href: '/properties', label: 'Properties' },
  {
    label: 'Neighborhoods',
    children: [
      { href: '/neighborhoods', label: 'Neighborhood Guides' },
      { href: '/triangle-community-guide', label: 'Triangle Community Guide' },
      { href: '/relocation-quiz', label: 'Relocation Quiz' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { href: '/blog', label: 'Blog' },
      { href: '/buyer-tools', label: 'Buyer Tools' },
      { href: '/ai-tools', label: 'AI Tools' },
      { href: '/resources', label: 'Guides & Market Updates' },
    ],
  },
];

function Chevron({ open }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function DesktopDropdown({ item, isActive }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 whitespace-nowrap text-sm tracking-wide transition py-2 ${
          isActive ? 'text-gold' : 'text-navy/80 hover:text-gold'
        }`}
      >
        {item.label}
        <Chevron open={open} />
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50">
          <div className="min-w-[230px] rounded-xl bg-white shadow-soft border border-navy/10 py-2">
            {item.children.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                onClick={() => setOpen(false)}
                className="block px-5 py-2.5 text-sm text-navy/80 hover:text-gold hover:bg-ivory transition"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const router = useRouter();
  const path = router?.pathname || '';
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (item) =>
    item.children
      ? item.children.some((c) => path === c.href || path.startsWith(`${c.href}/`))
      : path === item.href || path.startsWith(`${item.href}/`);

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

  const close = () => {
    setOpen(false);
    setExpanded(null);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-soft' : 'bg-white/85 backdrop-blur-sm'
      }`}
    >
      <div className="container-wide flex items-center justify-between gap-3 py-3 md:py-4">
        <Link href="/" onClick={close} className="flex flex-col leading-tight group min-w-0">
          <span className="font-serif text-xl sm:text-2xl text-navy group-hover:text-gold transition truncate">
            Ashley Smith
          </span>
          <span className="text-[10px] uppercase tracking-widewide text-navy/60 truncate">
            Realtor® · Compass North Carolina
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:flex items-center gap-5 xl:gap-7 shrink-0">
          {NAV.map((n) =>
            n.children ? (
              <DesktopDropdown key={n.label} item={n} isActive={isActive(n)} />
            ) : (
              <Link
                key={n.href}
                href={n.href}
                className={`whitespace-nowrap text-sm tracking-wide transition py-2 ${
                  isActive(n) ? 'text-gold' : 'text-navy/80 hover:text-gold'
                }`}
              >
                {n.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link href="/home-value" className="btn btn-outline text-xs whitespace-nowrap hidden xl:inline-flex">
            Home Value
          </Link>
          <Link href="/contact" className="btn btn-primary text-xs whitespace-nowrap">
            Schedule a Consultation
          </Link>
        </div>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="lg:hidden p-2 -mr-2 text-navy shrink-0"
          onClick={() => (open ? close() : setOpen(true))}
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
        <div className="lg:hidden border-t border-navy/10 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav aria-label="Mobile" className="container-wide py-4 flex flex-col">
            <Link href="/" onClick={close} className="py-3 text-navy hover:text-gold transition border-b border-navy/10">
              Home
            </Link>
            {NAV.map((n) =>
              n.children ? (
                <div key={n.label} className="border-b border-navy/10">
                  <button
                    type="button"
                    aria-expanded={expanded === n.label}
                    onClick={() => setExpanded(expanded === n.label ? null : n.label)}
                    className="w-full flex items-center justify-between py-3 text-navy hover:text-gold transition"
                  >
                    {n.label}
                    <Chevron open={expanded === n.label} />
                  </button>
                  {expanded === n.label && (
                    <div className="pb-3 pl-4 flex flex-col">
                      {n.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={close}
                          className="py-2.5 text-sm text-navy/80 hover:text-gold transition"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={close}
                  className="py-3 text-navy hover:text-gold transition border-b border-navy/10"
                >
                  {n.label}
                </Link>
              )
            )}
            <Link href="/contact" onClick={close} className="py-3 text-navy hover:text-gold transition">
              Contact
            </Link>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Link href="/home-value" onClick={close} className="btn btn-outline text-xs flex-1">
                Home Value
              </Link>
              <Link href="/contact" onClick={close} className="btn btn-primary text-xs flex-1">
                Schedule a Consultation
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
