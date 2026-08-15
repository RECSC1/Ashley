import Link from 'next/link';
import Image from 'next/image';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import LeadForm from '../components/LeadForm';

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
  { name: 'Chapel Hill', slug: 'chapel-hill', desc: 'Historic charm, UNC culture, and refined neighborhoods.' },
  { name: 'Carrboro', slug: 'carrboro', desc: 'Walkable, artistic, and full of independent character.' },
  { name: 'Durham', slug: 'durham', desc: 'Innovation, food culture, and a thriving creative community.' },
  { name: 'Hillsborough', slug: 'hillsborough', desc: 'Storybook downtown with riverside calm and quiet luxury.' },
  { name: 'Pittsboro', slug: 'pittsboro', desc: 'Rolling land, equestrian estates, and a slower pace of life.' },
  { name: 'Cary', slug: 'cary', desc: 'Family-friendly neighborhoods and exceptional schools.' },
  { name: 'Raleigh', slug: 'raleigh', desc: 'Capital-city energy with leafy, established neighborhoods.' },
  { name: 'Greater Triangle', slug: 'greater-triangle', desc: 'Connecting it all — a region of opportunity and beauty.' },
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
  { tag: 'Placeholder', title: '[Listing data pending]', city: 'Chapel Hill, NC', price: '$—' },
  { tag: 'Placeholder', title: '[Sale data pending]', city: 'Carrboro, NC', price: '$—' },
  { tag: 'Placeholder', title: '[Coming soon]', city: 'Durham, NC', price: '$—' },
  { tag: 'Client Story (Pending)', title: '[Approved client story]', city: 'Cary, NC', price: '' },
];

const TESTIMONIALS = [
  {
    quote:
      'It was a pleasure working with Ashley on our recent home buying process. She was attentive, responded quickly, brought ease to the process, and was absolutely wonderful throughout. Not only was she patient while we pondered several properties, she let us guide the home search on our own timeline without pressure while providing expert advice along the way. Without a doubt, we would highly recommend Ashley for all your realtor needs.',
    name: 'Aiyani L.',
    context: 'Buyer Client',
  },
  {
    quote:
      'We were blown away by the level of detail Ashley put into marketing our home. Her multi-phase strategy, from the professional photography to the targeted social media presence, ensured our property stood out immediately. She captured the unique features of our home perfectly and delivered results faster than we imagined. Her expertise in the Chapel Hill market is second to none.',
    name: 'David T.',
    context: 'Seller Client',
  },
  {
    quote:
      'Working with Ashley was an absolute game-changer. From our very first meeting, it was clear that she possesses an unmatched understanding of the market and a genuine commitment to her clients. She made a complex process feel incredibly simple and stress-free. If you want a professional who is responsive, transparent, and truly has your best interests at heart, look no further.',
    name: 'Alex G.',
    context: 'Buyer/Seller Client',
  },
];

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
        description="Thoughtful, refined, people-first real estate guidance for Chapel Hill, Carrboro, and the Triangle. Ashley Smith — Realtor®, Luxury Certified, Relocation Certified — with Compass North Carolina, LLC."
      />

      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero__media">
          <Image
            src="/images/chapel-hill-aerial-hero.jpg"
            alt="Aerial view of the UNC-Chapel Hill campus and surrounding Chapel Hill landscape"
            fill
            priority
            fetchPriority="high"
            quality={80}
            sizes="100vw"
            className="home-hero__image"
          />
        </div>
        <div className="home-hero__overlay" aria-hidden="true" />
        <div className="home-hero__content container-wide">
          <div className="home-hero__copy">
            <p className="home-hero__eyebrow">Chapel Hill · Carrboro · The Triangle</p>
            <h1 className="home-hero__title">
              Luxury-level guidance.
              <br />
              Neighborly care.
            </h1>
            <p className="home-hero__lede">
              Elegant, people-first real estate guidance for Chapel Hill, Carrboro, and the Triangle,
              rooted in local insight, calm confidence, and genuine care.
            </p>
            <div className="home-hero__actions">
              <Link href="/contact" className="home-hero__button home-hero__button--primary">
                Schedule a Consultation
              </Link>
              <Link href="/home-value" className="home-hero__button home-hero__button--secondary">
                Request a Home Value Review
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="hero-tools" aria-label="Featured homebuyer resources">
        <div className="container-wide hero-tools__inner">
          <Link href="/buyer-tools" className="hero-tools__link">
            <span>Explore Buyer Tools</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/relocation-quiz" className="hero-tools__link">
            <span>Take Relocation Quiz</span>
            <span aria-hidden="true">→</span>
          </Link>
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
                <div className="w-10 h-10 rounded-full bg-ivory mb-5 flex items-center justify-center">
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
            subtitle="From the historic streets of Chapel Hill to Pittsboro's rolling estates, Ashley represents buyers and sellers across North Carolina's most loved communities. Compare Chapel Hill, Carrboro, Durham, Hillsborough, Pittsboro, Cary, and Raleigh based on lifestyle, priorities, commute, and local fit."
          />
          <div className="mt-6 rounded-2xl border border-navy/10 bg-ivory p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm md:text-base text-navy/80">
              Not sure where to start? Explore the Triangle Community Guide for side-by-side local insight before you tour.
            </p>
            <Link href="/triangle-community-guide" className="btn btn-outline whitespace-nowrap">
              Explore the Community Guide
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            {AREAS.map((a) => (
              <Link
                key={a.name}
                href={`/triangle-community-guide#${a.slug}`}
                className="group block p-6 rounded-2xl bg-ivory border border-navy/10 hover:border-gold transition shadow-ring"
              >
                <p className="font-serif text-2xl text-navy mb-2 group-hover:text-gold transition">
                  {a.name}
                </p>
                <p className="text-sm text-navy/70 leading-relaxed">{a.desc}</p>
                <p className="mt-4 text-[10px] uppercase tracking-widewide text-taupe">
                  View Community Guide →
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
            title="Listing previews & client stories"
            subtitle="The property cards below are placeholders only and do not represent live MLS or IDX data. Listings and recent sales will be updated once approved property data or IDX integration is available."
          />
          <div className="mt-6 rounded-2xl border border-navy/10 bg-ivory p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm md:text-base text-navy/80">
              Not sure where to start? Explore the Triangle Community Guide for side-by-side local insight before you tour.
            </p>
            <Link href="/triangle-community-guide" className="btn btn-outline whitespace-nowrap">
              Explore the Community Guide
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LISTINGS.map((l, i) => (
              <div key={i} className="card p-0 overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-ivory via-warmwhite to-ivory flex items-center justify-center">
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
            title="Client words that say it best"
            subtitle="Ashley's clients describe her as attentive, responsive, strategic, and deeply committed to making the buying and selling process feel clear, calm, and supported."
            center
          />
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card flex flex-col">
                <span className="font-serif text-5xl text-gold leading-none mb-4">"</span>
                <p className="text-navy/80 italic leading-relaxed flex-1">{t.quote}</p>
                <div className="mt-6 pt-5 border-t border-navy/10">
                  <p className="font-serif text-lg text-navy">{t.name}</p>
                  <p className="text-xs uppercase tracking-widewide text-taupe">{t.context}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-center text-taupe mt-8">
            Trusted guidance, real client results.
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
              The market metrics below are placeholders only and do not represent live market data.
              Live metrics will populate this section once a market data feed is connected.
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
              Explore Properties
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
