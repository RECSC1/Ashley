import { useState } from 'react';
import Link from 'next/link';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import PropertyCard from '../components/PropertyCard';
import { getVisibleProperties } from '../lib/properties';
import { logEvent, KEYS } from '../lib/store';

/*
 * IDX NOTE (developer reference):
 * This site does NOT display live MLS or IDX data. The listings and sales on
 * this page are Ashley's own transactions, entered by hand in
 * lib/properties.js. If a Doorify MLS IDX feed is connected in the future,
 * add the required MLS attribution, brokerage branding, update-frequency
 * disclosure, and approved IDX disclaimers. Do not display Doorify MLS
 * copyright or IDX attribution language until an approved feed is live.
 */

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
      <h3 className="font-serif text-3xl text-navy">Get first look at Ashley's next listings</h3>
      <p className="text-navy/70 mt-2">
        Tell Ashley what you're looking for. She'll personally send matches, including her own listings before they hit the public market. This is a personal service from Ashley, not an automated MLS alert.
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
      <button className="btn btn-primary mt-6">Send My Preferences to Ashley</button>
    </form>
  );
}

export default function Properties({ listings, sold }) {
  return (
    <>
      <SEO
        title="Listings & Recent Sales in Chapel Hill, Durham & Raleigh | Ashley Smith, Compass"
        description="See Ashley Smith's current and coming soon listings plus homes she recently sold for buyers and sellers in Chapel Hill, Durham, Raleigh, and the Triangle."
        path="/properties"
      />

      <section className="section">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Properties"
            title="Listings & Recent Sales"
            subtitle="Ashley's current listings, what's coming next, and the homes she's recently helped buyers and sellers close across Chapel Hill, Durham, Raleigh, and the Triangle. New listings show up here first."
          />

          {listings.length > 0 && (
            <div className="mb-20">
              <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
                <h2 className="font-serif text-3xl md:text-4xl text-navy">Current &amp; Coming Soon</h2>
                <p className="text-sm text-taupe">Listed by Ashley Smith, Compass</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((p, i) => <PropertyCard key={p.id} p={p} priority={i === 0} />)}
              </div>
            </div>
          )}

          {sold.length > 0 && (
            <div>
              <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
                <h2 className="font-serif text-3xl md:text-4xl text-navy">Recently Sold</h2>
                <p className="text-sm text-taupe">Buyers and sellers Ashley represented</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sold.map((p) => <PropertyCard key={p.id} p={p} />)}
              </div>
            </div>
          )}

          <p className="mt-10 text-xs text-taupe max-w-3xl">
            Sold information reflects transactions in which Ashley represented a buyer and/or seller. Photos are used with permission. This site does not display live MLS or IDX data. Information is deemed reliable but not guaranteed.
          </p>
        </div>
      </section>

      {/* SELLER CTA */}
      <section className="section bg-navy text-ivory">
        <div className="container-narrow text-center">
          <p className="eyebrow mb-3">Thinking About Selling?</p>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight">Your home could be the next one on this page.</h2>
          <div className="divider-thin mt-6 mx-auto" />
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-center btn-stack-sm">
            <Link href="/home-value" className="btn btn-gold">See What Your Home Is Worth</Link>
            <Link href="/contact" className="btn border border-ivory/50 text-ivory hover:bg-ivory hover:text-navy">Schedule a Consultation</Link>
          </div>
        </div>
      </section>

      {/* ALERTS */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto"><PropertyAlerts /></div>
        </div>
      </section>
    </>
  );
}

// Rebuilds hourly so dated listings (publishFrom / activeFrom) flip on their own.
export function getStaticProps() {
  return { props: getVisibleProperties(), revalidate: 3600 };
}
