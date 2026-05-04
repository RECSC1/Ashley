import Link from 'next/link';
import { useState } from 'react';
import SEO from '../components/SEO';
import { logEvent, KEYS } from '../lib/store';

const REVIEW_ITEMS = [
  'Recent comparable sales',
  'Current active competition',
  'Neighborhood demand',
  'Home condition and updates',
  'Pricing strategy',
  'Buyer positioning',
  'Timing considerations',
];

const SELLING_TIMELINE_OPTIONS = [
  'Just curious',
  'In the next 6 months',
  'This year',
  'Not sure yet',
];

export default function HomeValuePage() {
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
        logEvent(KEYS.VALUATION, data);
        setSubmitted(true);
      })
      .catch(() => {
        setError('We could not submit your request right now. Please try again.');
      });
  };

  return (
    <>
      <SEO
        title="Home Value Review | Chapel Hill & Triangle Real Estate | Ashley Smith"
        description="Request a thoughtful home value review from Ashley Smith, a Chapel Hill-based Compass Realtor serving Chapel Hill, Carrboro, Durham, Hillsborough, Pittsboro, Cary, Raleigh, and the Triangle."
        path="/home-value"
      />

      <section className="relative overflow-hidden section">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ivory via-warmwhite to-blush/20" />
        <div className="container-wide grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-3">Home Value Review · Chapel Hill & The Triangle</p>
            <h1 className="font-serif text-5xl md:text-6xl text-navy leading-tight">What Is Your Triangle Home Really Worth?</h1>
            <p className="mt-5 text-lg text-navy/75 leading-relaxed max-w-2xl">
              Get a thoughtful, local home value review from Ashley Smith, a Chapel Hill-based Compass Realtor who understands pricing, positioning, and what today&apos;s buyers are actually responding to.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 btn-stack-sm">
              <a href="#home-value-form" className="btn btn-primary">Request My Home Value Review</a>
              <Link href="/contact" className="btn btn-outline">Prefer to Talk First?</Link>
            </div>
            <p className="mt-4 text-sm text-navy/70">No pressure. No automated guesswork. Just clear guidance so you can make an informed decision.</p>
          </div>
        </div>
      </section>

      <section className="section bg-warmwhite">
        <div className="container-wide grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-3">Why this matters</p>
            <h2 className="font-serif text-4xl text-navy leading-tight">Online estimates miss the local story.</h2>
          </div>
          <div className="lg:col-span-7 prose-luxe">
            <p>
              Online home value tools can be useful for a rough glance, but they often miss the details that shape real buyer behavior in Chapel Hill and across the Triangle.
            </p>
            <p>
              Condition, updates, street-level location, school assignment, competing inventory, presentation, and timing all influence value. Ashley&apos;s review is designed to account for those real-world factors so you can plan with confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <p className="eyebrow mb-3">What Ashley reviews</p>
          <h2 className="font-serif text-4xl text-navy">A strategic, Realtor-guided value picture.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {REVIEW_ITEMS.map((item) => (
              <div key={item} className="card border border-taupe/20">
                <p className="font-serif text-xl text-navy">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="home-value-form" className="section bg-warmwhite">
        <div className="container-narrow">
          {submitted ? (
            <div className="card text-center py-10">
              <p className="font-serif text-3xl text-navy">Thank you.</p>
              <p className="mt-3 text-navy/70 max-w-xl mx-auto">
                Your request has been sent. Ashley will follow up with a thoughtful, local review and practical next steps.
              </p>
            </div>
          ) : (
            <form
              name="home-value-request"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={onSubmit}
              className="card p-8 md:p-10"
            >
              <input type="hidden" name="form-name" value="home-value-request" />
              <input type="hidden" name="page_name" value="home-value" />
              <input type="hidden" name="form_type" value="home-value-review-request" />
              <input type="hidden" name="lead_source" value="website-home-value-page" />
              <input type="hidden" name="client_name" value="Ashley Smith" />
              <p className="hidden">
                <label>
                  Don&apos;t fill this out: <input name="bot-field" onChange={onChange} />
                </label>
              </p>

              <div className="mb-6">
                <p className="eyebrow mb-2">Request</p>
                <h2 className="font-serif text-3xl text-navy">Request My Home Value Review</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Name</label>
                  <input name="name" required onChange={onChange} className="input" />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input name="email" required type="email" onChange={onChange} className="input" />
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input name="phone" onChange={onChange} className="input" />
                </div>
                <div>
                  <label className="label">Property Address</label>
                  <input name="property_address" required onChange={onChange} className="input" />
                </div>
                <div>
                  <label className="label">City</label>
                  <input name="city" required onChange={onChange} className="input" placeholder="Chapel Hill, Carrboro, Durham, etc." />
                </div>
                <div>
                  <label className="label">Are you thinking about selling?</label>
                  <select name="selling_timeline" required onChange={onChange} className="input">
                    <option value="">Select one</option>
                    {SELLING_TIMELINE_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Anything Ashley should know?</label>
                  <textarea name="notes" rows={4} onChange={onChange} className="input" />
                </div>
              </div>

              <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto">Send My Request</button>
              {error && <p className="text-sm text-red-700 mt-4">{error}</p>}
              <p className="text-[11px] text-taupe mt-4">
                Most homeowners are surprised by how much their home value can shift in 12–18 months based on buyer demand, nearby competition, updates, presentation, and timing.
              </p>
            </form>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="card border border-taupe/25 bg-ivory">
            <p className="text-lg text-navy/80 leading-relaxed">
              You do not need to be ready to list your home to ask smart questions. Whether you are planning now, exploring options, or simply want a clearer picture of your equity, this review is designed to give you useful information without pressure.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-navy text-ivory">
        <div className="container-wide text-center">
          <h2 className="font-serif text-4xl md:text-5xl">Start with clarity.</h2>
          <a href="#home-value-form" className="btn btn-gold mt-6">Request My Home Value Review</a>
        </div>
      </section>
    </>
  );
}
