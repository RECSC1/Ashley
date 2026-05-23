import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy text-ivory mt-20">
      <div className="container-wide py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <p className="font-serif text-3xl mb-3">Ashley Smith</p>
          <p className="text-xs uppercase tracking-widewide text-gold mb-4">
            Realtor® · Luxury Certified · Relocation Certified
          </p>
          <p className="text-sm text-ivory/80 mb-2">Compass North Carolina, LLC</p>
          <p className="text-sm text-ivory/70 max-w-md leading-relaxed">
            Serving Chapel Hill, Carrboro, Durham, Hillsborough, Pittsboro, Cary, Raleigh,
            and the Greater Triangle area of North Carolina.
          </p>
          <div className="mt-6 space-y-1 text-sm text-ivory/80">
            <p><a href="tel:+19196362098" className="hover:text-gold">(919) 636-2098</a></p>
            <p><a href="mailto:ashley.m.smith@compass.com" className="hover:text-gold">ashley.m.smith@compass.com</a></p>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widewide text-gold mb-4">Explore</p>
          <ul className="space-y-2 text-sm text-ivory/80">
            <li><Link href="/about" className="hover:text-gold">About Ashley</Link></li>
            <li><Link href="/properties" className="hover:text-gold">Properties</Link></li>
            <li><Link href="/buyer-tools" className="hover:text-gold">Buyer Tools</Link></li>
            <li><Link href="/ai-tools" className="hover:text-gold">AI Tools</Link></li>
            <li><Link href="/resources" className="hover:text-gold">Resources</Link></li>
            <li><Link href="/triangle-community-guide" className="hover:text-gold">Community Guide</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widewide text-gold mb-4">Connect</p>
          <ul className="space-y-2 text-sm text-ivory/80">
            <li><a href="https://www.instagram.com/ashley_m_smith26" target="_blank" rel="noopener noreferrer" className="hover:text-gold">Instagram</a></li>
            <li><a href="https://facebook.com/ashleym.smith28" target="_blank" rel="noopener noreferrer" className="hover:text-gold">Facebook</a></li>
            <li><a href="https://www.compass.com/agents/ashley-smith/" target="_blank" rel="noopener noreferrer" className="hover:text-gold">Compass Profile</a></li>
          </ul>
          <p className="text-xs text-ivory/50 mt-6 leading-relaxed">
            Compass and Doorify MLS compliance language pending final approval. This website does not currently display live MLS or IDX data. Information provided through website tools is for general guidance only and should be independently verified.
          </p>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-wide py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-ivory/60">
          <p>© {new Date().getFullYear()} Ashley Smith · Compass North Carolina, LLC</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-gold">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold">Terms</Link>
          </div>
          <p className="opacity-70">Equal Housing Opportunity · Compass and Doorify MLS compliance language pending final approval.</p>
        </div>
      </div>
    </footer>
  );
}
