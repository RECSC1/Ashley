import Link from 'next/link';
import Image from 'next/image';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import LeadForm from '../components/LeadForm';

const TRUST_BADGES = [
  'Realtor®',
  'Luxury Certified',
  'Relocation Certified',
  'Compass North Carolina, LLC',
  'Chapel Hill & Triangle Real Estate',
];

const SERVICES = [
  {
    title: 'Buyers',
    blurb:
      'Calm, strategic guidance from first showing to closing — tailored to your lifestyle and long-term goals.',
  },
  {
    title: 'Sellers',
    blurb:
      'Editorial-level listing preparation and marketing that positions your home to sell with confidence.',
  },
  {
    title: 'Luxury Real Estate',
    blurb:
      'Discreet, refined representation for distinctive estates and luxury homes across the Triangle.',
  },
  {
    title: 'Relocation',
    blurb:
      'Personal concierge support for buyers moving to North Carolina from across the country.',
  },
  {
    title: 'Investors',
    blurb:
      'Thoughtful analysis and area expertise for income-producing and long-hold opportunities.',
  },
  {
    title: 'UNC-Related Moves',
    blurb:
      'Specialized guidance for faculty, medical residents, students, and families connected to UNC.',
  },
];

const AREAS = [
  { name: 'Chapel Hill', desc: 'Historic charm, UNC culture, and refined neighborhoods.' },
  { name: 'Carrboro', desc: 'Walkable, artistic, and full of independent character.' },
  { name: 'Durham', desc: 'Innovation, food culture, and a thriving creative community.' },
  { name: 'Hillsborough', desc: 'Storybook downtown with riverside calm and quiet luxury.' },
  { name: 'Pittsboro', desc: 'Rolling land, equestrian estates, and a slower pace of life.' },
  { name: 'Cary', desc: 'Family-friendly neighborhoods and exceptional schools.' },
  { name: 'Raleigh', desc: 'Capital-city energy with leafy, established neighborhoods.' },
  { name: 'Greater Triangle', desc: 'Connecting it all — a region of opportunity and beauty.' },
];

const TOOLS = [
  { title: 'School Rating Search', exclusive: true, href: '/buyer-tools?tab=schools' },
  { title: 'House Direction Finder', exclusive: true, href: '/buyer-tools?tab=direction' },
  { title: 'Community Landmarks Finder', exclusive: true, href: '/buyer-tools?tab=landmarks' },
  { title: 'Area & Neighborhood Comparison', exclusive: true, href: '/buyer-tools?tab=compare' },
  { title: 'Commute Time Finder', exclusive: true, href: '/buyer-tools?tab=commute' },
  { title: 'Mortgage Calculator', exclusive: false, href: '/buyer-tools?tab=mortgage' },
  { title: 'Home Valuation Request', exclusive: false, href: '/buyer-tools?tab=valuation' },
];

const LISTINGS = [
  { tag: 'Active Listing', title: '[Current listing data]', city: 'Chapel Hill, NC', price: '$—' },
  { tag: 'Recently Sold', title: '[Recent sale data]', city: 'Carrboro, NC', price: '$—' },
  { tag: 'Coming Soon', title: '[Coming soon]', city: 'Durham, NC', price: '$—' },
  { tag: 'Buyer Success Story', title: '[Approved client story]', city: 'Cary, NC', price: '' },
];

const TESTIMONIALS = Array.from({ length: 3 }).map((_, i) => ({
  quote:
    '[Approved testimonial — pending Ashley\'s review and consent. Thoughtful client wording will appear here once collected.]',
  name: '[Client name]',
  context: '[Buyer · Chapel Hill]',
}));

const METRICS = [
  { label: 'Median Home Price', value: '$—', sub: 'Triangle market · placeholder' },
  { label: 'Average Days on Market', value: '—', sub: 'Updated when live data is connected' },
  { label: 'Inventory Level', value: '—', sub: 'Months of supply · placeholder' },
  { label: 'Buyer Competition', value: '—', sub: 'Demand index · placeholder' },
  { label: 'Luxury Market Activity', value: '—', sub: '$1M+ segment · placeholder' },
];

export default function Home() {
  return (
    <>
      <SEO
        title="Ashley Smith | Chapel Hill Realtor® | Compass North Carolina"
        description="Elegant, people-first real estate guidance for Chapel Hill, Carrboro, and the Triangle. Ashley Smith — Realtor®, Luxury Certified, Relocation Certified — with Compass North Carolina, LLC."
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-ivory via-warmwhite to-blush/30" />
          <div className="absolute -top-32 -right-32 w-[40rem] h-[40rem] rounded-full bg-blush/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 w-[40rem] h-[40rem] rounded-full bg-sage/30 blur-3xl" />
        </div>
        <div className="container-wide pt-10 md:pt-28 pb-14 md:pb-32 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <p className="eyebrow mb-4">Chapel Hill · Carrboro · The Triangle</p>
            <h1 className="font-serif text-navy leading-[1.08] text-[clamp(2.1rem,8.5vw,4.5rem)] md:text-7xl">
              Luxury-level guidance.
              <br />
              <span className="italic text-gold">Neighborly care.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl text-navy/75 leading-relaxed max-w-xl">
              Elegant, people-first real estate guidance for Chapel Hill, Carrboro, and the
              Triangle, rooted in local insight, calm confidence, and genuine care.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row sm:flex-wrap gap-3 btn-stack-sm">
              <Link href="/contact" className="btn btn-primary">
                Schedule a Consultation
              </Link>
              <Link href="/buyer-tools" className="btn btn-outline">
                Explore Buyer Tools
              </Link>
              <Link href="/relocation-quiz" className="btn btn-outline">
                Take Relocation Quiz
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {TRUST_BADGES.map((b) => (
                <span key={b} className="badge bg-warmwhite border border-taupe/30 text-navy/80">
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div
              className="relative rounded-3xl overflow-hidden shadow-soft border border-taupe/20 bg-warmwhite mx-auto w-full max-w-sm md:max-w-md"
              style={{ aspectRatio: '4 / 5' }}
            >
              <Image
                src="/images/ashley-smith-headshot.png"
                alt="Ashley Smith, Realtor® with Compass North Carolina"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 90vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 via-navy/40 to-transparent p-5 md:p-8 text-center pointer-events-none">
                <p className="font-serif text-xl md:text-3xl text-ivory">Ashley Smith</p>
                <p className="text-[10px] md:text-xs uppercase tracking-widewide text-gold mt-1">
                  Realtor® · Compass NC
                </p>
                <p className="mt-2 md:mt-4 text-[11px] md:text-sm text-ivory/90 italic leading-snug">
                  "A people-first realtor, shaped by years in social work — calm, advocate-minded, and deeply local."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section bg-warmwhite">
        <div className="container-wide grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">About Ashley</p>
            <h2 className="font-serif text-4xl md:text-5xl text-navy leading-tight">
              From social work to real estate — the same heart, a new chapter.
            </h2>
            <div className="divider-thin mt-6" />
          </div>
          <div className="lg:col-span-7 prose-luxe">
            <p>
              Before real estate, Ashley spent many years in social work — listening carefully,
              advocating fiercely, and helping families navigate the most important moments of
              their lives. That training never left her.
            </p>
            <p>
              For nearly six years now, she has brought the same emotional intelligence and
              service-driven mindset to real estate, guiding clients through Chapel Hill,
              Carrboro, Durham, and the broader Triangle with calm strategy and genuine warmth.
            </p>
            <p>
              The result is a quietly elevated experience — luxury-level marketing, polished
              representation, and a deeply human touch.
            </p>
            <Link href="/about" className="btn btn-outline mt-6 inline-flex">
              Read Ashley's full story
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container-wide">
          <SectionHeader
            eyebrow="How Ashley Helps"
            title="Service tailored to your next chapter"
            subtitle="Every transaction is personal. Each client receives a strategy built around their goals, timeline, and lifestyle."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className="card hover:shadow-soft transition group">
                <div className="w-10 h-10 rounded-full bg-blush/40 mb-5 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                </div>
                <h3 className="font-serif text-2xl text-navy mb-2">{s.title}</h3>
                <p className="text-navy/70 leading-relaxed">{s.blurb}</p>
                <Link href="/contact" className="mt-5 inline-flex text-xs uppercase tracking-widewide text-gold group-hover:text-navy transition">
                  Connect →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="section bg-warmwhite">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Service Areas"
            title="Local expertise across the Triangle"
            subtitle="From the historic streets of Chapel Hill to Pittsboro's rolling estates, Ashley represents buyers and sellers across North Carolina's most loved communities."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AREAS.map((a) => (
              <Link
                key={a.name}
                href="#service-area-grid"
                className="group block p-6 rounded-2xl bg-ivory border border-taupe/20 hover:border-gold transition shadow-ring"
              >
                <p className="font-serif text-2xl text-navy mb-2 group-hover:text-gold transition">
                  {a.name}
                </p>
                <p className="text-sm text-navy/70 leading-relaxed">{a.desc}</p>
                <p className="mt-4 text-[10px] uppercase tracking-widewide text-taupe">
                  Explore neighborhood →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BUYER TOOLS PREVIEW */}
      <section className="section">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Exclusive Tools"
            title="Interactive buyer tools, designed for Triangle buyers"
            subtitle="Search schools, study commutes, compare neighborhoods, and run financial scenarios — all in one calm, polished workspace."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOLS.map((t) => (
              <Link
                key={t.title}
                href={t.href}
                className="card flex flex-col justify-between hover:shadow-soft transition group"
              >
                <div>
                  {t.exclusive && (
                    <span className="badge bg-gold/15 text-gold mb-4">Exclusive</span>
                  )}
                  <h3 className="font-serif text-2xl text-navy">{t.title}</h3>
                </div>
                <p className="mt-6 text-xs uppercase tracking-widewide text-gold group-hover:text-navy transition">
                  Open tool →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LISTINGS */}
      <section className="section bg-warmwhite">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Properties"
            title="Active listings & recent stories"
            subtitle="Listings and recent sales will be updated as Ashley's approved data or IDX connection becomes available."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LISTINGS.map((l, i) => (
              <div key={i} className="card p-0 overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-blush/30 via-warmwhite to-sage/30 flex items-center justify-center">
                  <span className="text-[10px] uppercase tracking-widewide text-taupe">
                    [Property image]
                  </span>
                </div>
                <div className="p-5">
                  <span className="badge bg-navy/5 text-navy/80 mb-3">{l.tag}</span>
                  <p className="font-serif text-xl text-navy">{l.title}</p>
                  <p className="text-sm text-taupe">{l.city}</p>
                  {l.price && (
                    <p className="mt-3 text-navy/80 text-sm font-medium">{l.price}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/properties" className="btn btn-outline">
              View all properties
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Testimonials"
            title="Words from clients"
            subtitle="Approved client testimonials will be added once Ashley collects and confirms each one."
            center
          />
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card flex flex-col">
                <span className="font-serif text-5xl text-gold leading-none mb-4">"</span>
                <p className="text-navy/80 italic leading-relaxed flex-1">{t.quote}</p>
                <div className="mt-6 pt-5 border-t border-taupe/30">
                  <p className="font-serif text-lg text-navy">{t.name}</p>
                  <p className="text-xs uppercase tracking-widewide text-taupe">{t.context}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-center text-taupe mt-8">
            [Placeholder — replace with approved testimonials.]
          </p>
        </div>
      </section>

      {/* MARKET SNAPSHOT */}
      <section className="section bg-navy text-ivory">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="eyebrow mb-3">Market Snapshot</p>
            <h2 className="font-serif text-4xl md:text-5xl">Chapel Hill & Triangle market pulse</h2>
            <div className="divider-thin mt-6 mx-auto" />
            <p className="mt-4 text-ivory/70">
              Live metrics will populate this section once a market data feed is connected.
              Numbers below are placeholders.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {METRICS.map((m) => (
              <div key={m.label} className="rounded-2xl bg-ivory/5 border border-ivory/10 p-6 text-center">
                <p className="font-serif text-4xl text-gold">{m.value}</p>
                <p className="mt-2 text-xs uppercase tracking-widewide text-ivory/70">{m.label}</p>
                <p className="mt-3 text-[11px] text-ivory/50">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE */}
      <section className="section">
        <div className="container-narrow grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="eyebrow mb-3">Connect</p>
            <h2 className="font-serif text-4xl md:text-5xl text-navy leading-tight">
              Begin a calm, considered conversation.
            </h2>
            <div className="divider-thin mt-6" />
            <p className="mt-6 text-navy/75 text-lg leading-relaxed">
              Whether you're considering a move, beginning a search, or simply gathering
              information, Ashley is here to listen and offer thoughtful, no-pressure guidance.
            </p>
            <div className="mt-8 space-y-3 text-navy/80 text-sm">
              <p>
                <span className="text-gold uppercase tracking-widewide text-xs mr-2">Phone</span>
                <a href="tel:+19196362098" className="hover:text-gold transition">(919) 636-2098</a>
              </p>
              <p>
                <span className="text-gold uppercase tracking-widewide text-xs mr-2">Email</span>
                <a href="mailto:ashley.m.smith@compass.com" className="hover:text-gold transition">ashley.m.smith@compass.com</a>
              </p>
              <p>
                <span className="text-gold uppercase tracking-widewide text-xs mr-2">Office</span>
                Compass North Carolina, LLC
              </p>
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section bg-warmwhite">
        <div className="container-narrow text-center">
          <p className="eyebrow mb-3">Your Next Chapter</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-navy leading-tight max-w-3xl mx-auto">
            Your next chapter deserves thoughtful guidance.
          </h2>
          <div className="divider-thin mt-6 mx-auto" />
          <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:justify-center btn-stack-sm">
            <Link href="/contact" className="btn btn-primary">
              Schedule a Consultation
            </Link>
            <Link href="/properties" className="btn btn-outline">
              Start Your Home Search
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
