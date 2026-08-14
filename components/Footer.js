import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white mt-20">
      <div className="container-wide py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <p className="font-serif text-3xl mb-3">Ashley Smith</p>
          <p className="text-xs uppercase tracking-widewide text-gold mb-4">
            Realtor&reg; | Luxury Certified | Relocation Certified
          </p>
          <p className="text-sm text-white/80 mb-1">Compass</p>
          <p className="text-sm text-white/70 max-w-md leading-relaxed">
            Serving Chapel Hill, Carrboro, Durham, Hillsborough, Pittsboro, Cary, Raleigh,
            and the greater Triangle.
          </p>
          <div className="mt-6 space-y-1 text-sm text-white/80">
            <p><a href="tel:+19196362098" className="hover:text-gold transition">(919) 636-2098</a></p>
            <p><a href="mailto:ashley.m.smith@compass.com" className="hover:text-gold transition">ashley.m.smith@compass.com</a></p>
          </div>
          <div className="mt-6">
            <img
              src="/images/compass-logo-white.png"
              alt="Compass"
              loading="lazy"
              className="h-6 w-auto opacity-80"
            />
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widewide text-gold mb-4">Explore</p>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/about" className="hover:text-gold transition">About Ashley</Link></li>
            <li><Link href="/properties" className="hover:text-gold transition">Properties</Link></li>
            <li><Link href="/buyer-tools" className="hover:text-gold transition">Buyer Tools</Link></li>
            <li><Link href="/ai-tools" className="hover:text-gold transition">AI Tools</Link></li>
            <li><Link href="/resources" className="hover:text-gold transition">Resources</Link></li>
            <li><Link href="/blog" className="hover:text-gold transition">Blog</Link></li>
            <li><Link href="/triangle-community-guide" className="hover:text-gold transition">Community Guide</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widewide text-gold mb-4">Connect</p>
          <ul className="space-y-2 text-sm text-white/80">
            <li><a href="https://www.instagram.com/ashley_m_smith26" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">Instagram</a></li>
            <li><a href="https://facebook.com/ashleym.smith28" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">Facebook</a></li>
            <li><a href="https://www.compass.com/agents/ashley-smith/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">Compass Profile</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide py-8">
          <p className="text-[11px] text-white/50 leading-relaxed max-w-4xl">
            This website does not currently display live MLS or IDX data. All property listing cards, recent sales sections, and market metrics shown on this site are placeholders only and do not represent real active listings, completed sales, or live market data. Listings and recent sales will be updated once approved property data or IDX integration is available. Information provided through website tools is for general guidance only and should be independently verified.
          </p>
          <p className="text-[11px] text-white/50 leading-relaxed max-w-4xl mt-3">
            Ashley Smith is a licensed real estate agent affiliated with Compass, a licensed real estate broker and abides by Equal Housing Opportunity laws. All material presented herein is intended for informational purposes only. Information is compiled from sources deemed reliable but is subject to errors, omissions, changes in price, condition, sale, or withdrawal without notice. This is not intended to solicit property already listed. Photos may be virtually staged or digitally enhanced and may not reflect actual property conditions.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-white/60">
          <p>&copy; {new Date().getFullYear()} Ashley Smith &middot; Compass</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-gold transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold transition">Terms</Link>
          </div>
          <div className="flex items-center gap-2 opacity-70">
            <img
              src="/images/equal-housing-opportunity.svg"
              alt="Equal Housing Opportunity"
              width="28"
              height="28"
              loading="lazy"
              className="h-7 w-7 invert"
            />
            <p>Equal Housing Opportunity</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
