import { useState } from 'react';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import { logEvent, KEYS } from '../lib/store';
import { BLOG_CATEGORIES as BLOG_CATS, toArticleCard } from '../lib/content/articles';
import { toGuideCard } from '../lib/content/guides';
import { getAllBlogPosts, getAllNeighborhoods } from '../lib/content/server';

const TABS = [
  { id: 'blog', label: 'Blog' },
  { id: 'guides', label: 'Guides' },
  { id: 'market', label: 'Market Updates' },
];

function GuideCard({ guide }) {
  return (
    <div className="card flex flex-col">
      <img src={guide.featuredImage} alt={guide.featuredImageAlt} className="aspect-[5/3] rounded-xl object-cover mb-5" loading="lazy" />
      <p className="font-serif text-2xl text-navy">{guide.title}</p>
      <p className="text-sm text-navy/70 mt-2 flex-1">{guide.desc}</p>
      <a href={guide.path} className="btn btn-outline mt-5">Read Neighborhood Guide</a>
    </div>
  );
}

function MarketSignup() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setError('');
    fetch('/netlify-forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Netlify form submission failed');
        logEvent(KEYS.GUIDES, { intent: 'market_updates', email });
        setSubmitted(true);
      })
      .catch(() => {
        setError('We could not submit your signup right now. Please try again.');
      });
  };
  return (
    <form name="market-update-signup" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className="card">
      <input type="hidden" name="form-name" value="market-update-signup" />
      <input type="hidden" name="page_name" value="resources" />
      <input type="hidden" name="form_type" value="market-update-subscription" />
      <input type="hidden" name="lead_source" value="website-resources-page" />
      <input type="hidden" name="client_name" value="Ashley Smith" />
      <p className="hidden"><label>Don't fill this out: <input name="bot-field" onChange={(e) => setEmail(e.target.value)} /></label></p>
      <p className="font-serif text-2xl text-navy">Get Market Updates</p>
      <p className="text-sm text-navy/70 mt-2">A monthly snapshot of the Chapel Hill and Triangle market — thoughtful, never noisy.</p>
      {error && <p className="mt-4 text-sm text-red-700">{error}</p>}
      {submitted ? (
        <p className="mt-4 text-gold">You're on the list.</p>
      ) : (
        <div className="flex gap-2 mt-4">
          <input required name="email" type="email" className="input flex-1" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn btn-primary">Subscribe</button>
        </div>
      )}
    </form>
  );
}

export default function Resources({ articles, guides }) {
  const [tab, setTab] = useState('blog');
  const [cat, setCat] = useState('All');

  const filtered = cat === 'All' ? articles : articles.filter((article) => article.cat === cat);

  return (
    <>
      <SEO
        title="Chapel Hill Real Estate Resources | Ashley Smith"
        description="Articles, guides, and market updates for Chapel Hill, Carrboro, Durham, and the broader Triangle. Insights for buyers, sellers, relocation clients, luxury buyers, and UNC-related moves."
        path="/resources"
      />
      <section className="section">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Resources"
            title="Editorial-quality real estate guidance"
            subtitle="Articles, guides, and market updates — written for thoughtful Triangle buyers and sellers."
          />

          <div className="card bg-warmwhite border border-navy/10 mb-8">
            <p className="font-serif text-2xl text-navy">Moving to Chapel Hill or the Triangle?</p>
            <p className="text-sm text-navy/70 mt-2">Not sure where to start? Take the Triangle Relocation Match Quiz and Ashley will follow up with personalized neighborhood and next-step guidance.</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a href="/relocation-quiz" className="btn btn-primary">Start the Relocation Quiz</a>
              <a href="/triangle-community-guide" className="btn btn-outline">Explore the Community Guide</a>
            </div>
          </div>

          <div className="flex gap-2 border-b border-navy/10 mb-8">
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`px-5 py-3 text-sm border-b-2 transition ${tab === t.id ? 'border-gold text-navy font-medium' : 'border-transparent text-navy/60 hover:text-navy'}`}>
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'blog' && (
            <>
              <div className="flex flex-wrap gap-2 mb-8">
                {BLOG_CATS.map((c) => (
                  <button key={c} onClick={() => setCat(c)} className={`badge border transition ${cat === c ? 'bg-navy text-ivory border-navy' : 'bg-warmwhite text-navy/70 border-taupe/40'}`}>{c}</button>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((a, i) => (
                  <article key={i} className="card flex flex-col">
                    <div className="aspect-video rounded-xl bg-gradient-to-br from-ivory via-warmwhite to-ivory mb-5 flex items-center justify-center">
                      <span className="text-[10px] uppercase tracking-widewide text-taupe">[Article image]</span>
                    </div>
                    <span className="badge bg-gold/10 text-gold self-start mb-3">{a.cat}</span>
                    <p className="font-serif text-xl text-navy">{a.title}</p>
                    <p className="text-sm text-navy/70 mt-2 flex-1">{a.excerpt}</p>
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-navy/10 text-[11px] uppercase tracking-widewide text-taupe">
                      <span>{a.date}</span><span>{a.read} read</span>
                    </div>
                    <a href={a.path} className="btn btn-outline mt-4 text-xs">Read Article</a>
                  </article>
                ))}
              </div>
            </>
          )}

          {tab === 'guides' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.length ? guides.map((guide) => <GuideCard key={guide.slug} guide={guide} />) : (
                <div className="card sm:col-span-2 lg:col-span-3">
                  <p className="font-serif text-2xl text-navy">Neighborhood guides are being prepared.</p>
                  <p className="text-navy/70 mt-2">Use the comparison guide now, then check back as individual community guides are published.</p>
                  <a href="/triangle-community-guide" className="btn btn-primary mt-5">Open the Triangle Community Guide</a>
                </div>
              )}
            </div>
          )}

          {tab === 'market' && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 card">
                <p className="eyebrow mb-3">Triangle Market</p>
                <p className="font-serif text-3xl text-navy">A thoughtful look at where the market is headed.</p>
                <p className="text-navy/70 mt-3">The market metrics below are placeholders only and do not represent live market data or MLS/IDX information. Live market metrics will populate this section once a market data feed is connected.</p>
                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  {['Median Price', 'Days on Market', 'Inventory'].map((m) => (
                    <div key={m} className="rounded-xl bg-ivory p-5 border border-navy/10">
                      <p className="font-serif text-3xl text-gold">$—</p>
                      <p className="text-xs uppercase tracking-widewide text-taupe mt-2">{m}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <MarketSignup />
                <div className="card bg-navy text-ivory">
                  <p className="font-serif text-2xl">Talk to Ashley</p>
                  <p className="text-ivory/70 text-sm mt-2">A personal market briefing tailored to your goals.</p>
                  <a href="/contact" className="btn btn-gold mt-4">Schedule a Consultation</a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      articles: getAllBlogPosts().map(toArticleCard),
      guides: getAllNeighborhoods().map(toGuideCard),
    },
  };
}
