import { useState } from 'react';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import { logEvent, KEYS } from '../lib/store';

const TABS = [
  { id: 'active', label: 'Active Listings' },
  { id: 'sold', label: 'Recently Sold' },
  { id: 'communities', label: 'Featured Communities' },
  { id: 'alerts', label: 'Property Alerts' },
];

const PLACEHOLDER_LISTINGS = [
  { status: 'Active', address: '[Listing address 1]', city: 'Chapel Hill, NC', price: '$—', beds: '—', baths: '—', sqft: '—' },
  { status: 'Active', address: '[Listing address 2]', city: 'Carrboro, NC', price: '$—', beds: '—', baths: '—', sqft: '—' },
  { status: 'Active', address: '[Listing address 3]', city: 'Durham, NC', price: '$—', beds: '—', baths: '—', sqft: '—' },
];

const PLACEHOLDER_SOLD = [
  { status: 'Sold', address: '[Recent sale 1]', city: 'Chapel Hill, NC', price: '$—', beds: '—', baths: '—', sqft: '—' },
  { status: 'Sold', address: '[Recent sale 2]', city: 'Cary, NC', price: '$—', beds: '—', baths: '—', sqft: '—' },
  { status: 'Sold', address: '[Recent sale 3]', city: 'Raleigh, NC', price: '$—', beds: '—', baths: '—', sqft: '—' },
];

const COMMUNITIES = [
  { name: 'Chapel Hill', blurb: 'Historic charm, leafy streets, and proximity to UNC.' },
  { name: 'Carrboro', blurb: 'Walkable, artistic, and rich with independent shops.' },
  { name: 'Durham', blurb: 'Innovation, food culture, and creative neighborhoods.' },
  { name: 'Hillsborough', blurb: 'Quiet luxury and storybook downtown character.' },
  { name: 'Cary', blurb: 'Family-centered communities and exceptional schools.' },
  { name: 'Raleigh', blurb: 'Capital-city energy with established, leafy enclaves.' },
];

function ListingCard({ l }) {
  return (
    <div className="card p-0 overflow-hidden flex flex-col">
      <div className="aspect-[4/3] bg-gradient-to-br from-blush/30 via-warmwhite to-sage/30 flex items-center justify-center">
        <span className="text-[10px] uppercase tracking-widewide text-taupe">[Property image]</span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <span className="badge bg-navy/5 text-navy/80 mb-3 self-start">{l.status}</span>
        <p className="font-serif text-xl text-navy">{l.address}</p>
        <p className="text-sm text-taupe">{l.city}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-navy/70">
          <div><span className="block text-[10px] uppercase tracking-widewide text-taupe">Beds</span>{l.beds}</div>
          <div><span className="block text-[10px] uppercase tracking-widewide text-taupe">Baths</span>{l.baths}</div>
          <div><span className="block text-[10px] uppercase tracking-widewide text-taupe">Sq Ft</span>{l.sqft}</div>
        </div>
        <p className="mt-4 font-medium text-navy">{l.price}</p>
        <a href="/contact" className="btn btn-outline mt-5 text-xs self-start">Request Details</a>
      </div>
    </div>
  );
}

function PropertyAlerts() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({});
  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
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
        logEvent(KEYS.ALERTS, data);
        setSubmitted(true);
      })
      .catch(() => {
        setError('We could not submit your request right now. Please try again.');
      });
  };
  if (submitted) {
    return (
      <div className="card text-center py-12">
        <p className="font-serif text-3xl text-navy">You're on the list.</p>
        <p className="mt-3 text-navy/70">
          Ashley will personally curate matching opportunities and send them as they become available.
        </p>
      </div>
    );
  }
  return (
    <form name="property-alert-interest" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className="card p-8">
      <input type="hidden" name="form-name" value="property-alert-interest" />
      <input type="hidden" name="page_name" value="properties" />
      <input type="hidden" name="form_type" value="property-interest-request" />
      <input type="hidden" name="lead_source" value="website-properties-page" />
      <input type="hidden" name="client_name" value="Ashley Smith" />
      <p className="hidden"><label>Don't fill this out: <input name="bot-field" onChange={onChange} /></label></p>
      <h3 className="font-serif text-3xl text-navy">Create a Property Alert</h3>
      <p className="text-navy/70 mt-2">
        Tell Ashley what you're looking for and she'll send individually curated matches as they hit the market.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <div><label className="label">Name</label><input name="name" required className="input" onChange={onChange} /></div>
        <div><label className="label">Email</label><input name="email" required type="email" className="input" onChange={onChange} /></div>
        <div><label className="label">Desired city / area</label><input name="area" className="input" onChange={onChange} placeholder="e.g. Chapel Hill, Cary" /></div>
        <div><label className="label">Price range</label><input name="price" className="input" onChange={onChange} placeholder="e.g. $750k–$1.2M" /></div>
        <div><label className="label">Beds</label><input name="beds" className="input" onChange={onChange} /></div>
        <div><label className="label">Baths</label><input name="baths" className="input" onChange={onChange} /></div>
        <div className="sm:col-span-2"><label className="label">Timeline</label>
          <select name="timeline" className="input" onChange={onChange}>
            <option value="">Select</option><option>Within 30 days</option><option>1–3 months</option><option>3–6 months</option><option>6–12 months</option><option>Just exploring</option>
          </select>
        </div>
        <div className="sm:col-span-2"><label className="label">Notes</label><textarea name="notes" rows={3} className="input" onChange={onChange} /></div>
      </div>
      {error && <p className="text-sm text-red-700 mt-4">{error}</p>}
      <button className="btn btn-primary mt-6">Set Up My Alerts</button>
    </form>
  );
}

export default function Properties() {
  const [tab, setTab] = useState('active');

  return (
    <>
      <SEO
        title="Chapel Hill & Triangle Homes | Ashley Smith Realtor®"
        description="Browse Chapel Hill, Carrboro, Durham, Cary, and Raleigh homes for sale. Active listings, recent sales, featured Triangle communities, and personalized property alerts from Ashley Smith, Realtor® with Compass North Carolina."
        path="/properties"
      />

      <section className="section">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Properties"
            title="Active listings, recent sales & featured Triangle communities"
            subtitle="Listings and recent sales are concierge previews. Ashley will share current availability and next steps directly after you reach out."
          />

          {/* TABS */}
          <div className="flex flex-wrap gap-2 border-b border-taupe/30 mb-10">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-3 text-sm tracking-wide transition border-b-2 ${
                  tab === t.id
                    ? 'border-gold text-navy font-medium'
                    : 'border-transparent text-navy/60 hover:text-navy'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'active' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PLACEHOLDER_LISTINGS.map((l, i) => <ListingCard l={l} key={i} />)}
            </div>
          )}
          {tab === 'sold' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PLACEHOLDER_SOLD.map((l, i) => <ListingCard l={l} key={i} />)}
            </div>
          )}
          {tab === 'communities' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {COMMUNITIES.map((c) => (
                <div key={c.name} className="card">
                  <p className="font-serif text-2xl text-navy">{c.name}</p>
                  <p className="mt-2 text-navy/70">{c.blurb}</p>
                  <a href="/contact" className="btn btn-outline mt-5 text-xs">Request Community Details</a>
                </div>
              ))}
            </div>
          )}
          {tab === 'alerts' && (
            <div className="max-w-2xl mx-auto"><PropertyAlerts /></div>
          )}
        </div>
      </section>
    </>
  );
}
