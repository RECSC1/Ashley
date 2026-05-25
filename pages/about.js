import Link from 'next/link';
import Image from 'next/image';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';

const PILLARS = [
  {
    title: 'Service-Driven',
    body:
      'Years of social work taught Ashley to lead with empathy and attention. Every client receives unhurried care.',
  },
  {
    title: 'Calm Strategy',
    body:
      'Real estate moves quickly. Ashley brings clarity, structure, and steady decision-making to each transaction.',
  },
  {
    title: 'High-Touch Guidance',
    body:
      'From the first showing to the final walkthrough, Ashley personally manages the experience — never outsourced.',
  },
  {
    title: 'Locally Rooted',
    body:
      'Chapel Hill, Carrboro, Durham, Cary, Raleigh — Ashley knows the neighborhoods, the schools, and the rhythms.',
  },
];

const CREDENTIALS = [
  { label: 'Realtor®', detail: 'Licensed in North Carolina · Compass North Carolina, LLC' },
  { label: 'Luxury Certified', detail: 'Specialized representation for distinctive estates' },
  { label: 'Relocation Certified', detail: 'Concierge support for buyers moving to NC' },
  { label: 'Nearly 6 Years', detail: 'In real estate · plus prior career in social work' },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Ashley Smith | Chapel Hill Realtor® with Compass"
        description="Meet Ashley Smith, a Chapel Hill Realtor® with Compass North Carolina. With a background in social work, Ashley brings emotional intelligence, calm strategy, and locally-rooted expertise to buyers, sellers, and relocation clients across the Triangle."
        path="/about"
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-warmwhite via-ivory to-ivory" />
        <div className="container-wide pt-10 md:pt-20 pb-12 md:pb-16 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <p className="eyebrow mb-4">About Ashley</p>
            <h1 className="font-serif text-navy leading-[1.08] text-[clamp(2rem,8vw,4.25rem)] md:text-7xl">
              The same heart for people, <span className="italic text-gold">a new way to serve them.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl text-navy/75 leading-relaxed max-w-xl">
              Ashley Smith is a Realtor® with Compass North Carolina, LLC, serving Chapel Hill,
              Carrboro, Durham, and the broader Triangle. Her work is shaped by years in social
              work — and a lifelong belief that real estate, done well, is deeply personal.
            </p>
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-soft border border-navy/10 mx-auto w-full max-w-sm md:max-w-md bg-warmwhite">
              <Image
                src="/images/ashley-smith-headshot.png"
                alt="Ashley Smith, Compass real estate agent in Chapel Hill, North Carolina."
                fill
                sizes="(max-width: 768px) 85vw, (max-width: 1200px) 40vw, 420px"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="section">
        <div className="container-narrow grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-3">Her Story</p>
            <h2 className="font-serif text-4xl text-navy">A career rooted in care.</h2>
            <div className="divider-thin mt-6" />
          </div>
          <div className="lg:col-span-8 prose-luxe text-lg">
            <p>
              Ashley spent many years in social work before transitioning to real estate. That
              chapter shaped how she listens, advocates, and carries clients through the most
              important transitions of their lives.
            </p>
            <p>
              When she stepped into real estate nearly six years ago, the heart of the work
              didn't change — only the medium did. She still helps people navigate change with
              calm, intention, and warmth. The difference is the keys at the end.
            </p>
            <p>
              Today, as a Realtor® with Compass North Carolina, LLC, Ashley represents buyers,
              sellers, luxury clients, and relocation families across Chapel Hill, Carrboro,
              Durham, Hillsborough, Pittsboro, Cary, Raleigh, and the broader Triangle. Her
              clients describe the experience as steady, thoughtful, and quietly elevated.
            </p>
            <p>
              She believes the right home is more than a transaction — it is a chapter in your
              story. Her job is to make that chapter unfold with grace.
            </p>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="section bg-warmwhite">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Approach"
            title="What working with Ashley feels like"
            subtitle="A people-first philosophy paired with luxury-level execution."
            center
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((p) => (
              <div key={p.title} className="card">
                <div className="w-8 h-8 rounded-full bg-gold/30 mb-5 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                </div>
                <h3 className="font-serif text-2xl text-navy mb-2">{p.title}</h3>
                <p className="text-navy/70 leading-relaxed text-sm">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="section">
        <div className="container-narrow">
          <SectionHeader eyebrow="Credentials" title="Designations & experience" />
          <div className="grid sm:grid-cols-2 gap-5">
            {CREDENTIALS.map((c) => (
              <div key={c.label} className="flex items-start gap-4 p-6 rounded-2xl border border-navy/10 bg-warmwhite">
                <div className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center mt-1">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                </div>
                <div>
                  <p className="font-serif text-2xl text-navy">{c.label}</p>
                  <p className="text-sm text-navy/70 mt-1">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-navy text-ivory">
        <div className="container-narrow text-center">
          <p className="eyebrow mb-3">Begin the Conversation</p>
          <h2 className="font-serif text-4xl md:text-5xl">
            A no-pressure consultation, whenever you're ready.
          </h2>
          <p className="mt-5 text-ivory/70 max-w-xl mx-auto">
            Ashley meets clients where they are — exploring, planning a future move, or ready to
            begin. The first conversation is always thoughtful and unrushed.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:justify-center btn-stack-sm">
            <Link href="/contact" className="btn btn-gold">
              Schedule a Consultation
            </Link>
            <Link href="/buyer-tools" className="btn btn-outline border-ivory text-ivory hover:bg-ivory hover:text-navy">
              Explore Buyer Tools
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
