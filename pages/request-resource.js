import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import { logEvent, KEYS } from '../lib/store';

const INTEREST_OPTIONS = [
  'Buying',
  'Selling',
  'Relocating',
  'Luxury Real Estate',
  'Investing',
  'UNC-related Move',
  'General Market Education',
  'Just Researching',
];

const TIMELINE_OPTIONS = [
  'As soon as possible',
  'In the next 1 to 3 months',
  'In the next 3 to 6 months',
  'In 6 to 12 months',
  'Just researching for now',
];

export default function RequestResourcePage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({});
  const [article, setArticle] = useState('');
  const [pageUrl, setPageUrl] = useState('');

  // Read the requested article title from the query string and capture the
  // current URL so Ashley and Emily can see exactly what was requested.
  useEffect(() => {
    if (!router.isReady) return;
    const fromQuery = router.query.article;
    if (typeof fromQuery === 'string') setArticle(fromQuery);
    if (typeof window !== 'undefined') setPageUrl(window.location.href);
  }, [router.isReady, router.query.article]);

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
        logEvent(KEYS.GUIDES, { requested_article: article, ...data });
        setSubmitted(true);
      })
      .catch(() => {
        setError('We could not submit your request right now. Please try again.');
      });
  };

  return (
    <>
      <SEO
        title="Request a Resource | Chapel Hill & Triangle Real Estate | Ashley Smith"
        description="Request an article or resource from Ashley Smith, a Chapel Hill-based Compass Realtor serving Chapel Hill, Carrboro, Durham, Hillsborough, Pittsboro, Cary, Raleigh, and the Triangle."
        path="/request-resource"
        noindex
      />

      <section className="section bg-warmwhite">
        <div className="container-narrow">
          <div className="mb-8">
            <p className="eyebrow mb-3">Resource Request</p>
            <h1 className="font-serif text-4xl md:text-5xl text-navy leading-tight">
              Request This Resource
            </h1>
            <p className="mt-4 text-navy/75 leading-relaxed max-w-2xl">
              This resource is available by request. Share your information below and Ashley will
              follow up with the article and any helpful guidance for your move, sale, or home
              search.
            </p>
          </div>

          {submitted ? (
            <div className="card text-center py-12">
              <p className="font-serif text-3xl text-navy">Thank you.</p>
              <p className="mt-3 text-navy/70 max-w-xl mx-auto">
                Your article request has been sent. Ashley will follow up with the resource and any
                helpful next steps.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center btn-stack-sm">
                <Link href="/resources" className="btn btn-outline">Back to Resources</Link>
                <Link href="/contact" className="btn btn-primary">Contact Ashley</Link>
              </div>
            </div>
          ) : (
            <form
              name="resource-article-request"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={onSubmit}
              className="card p-8 md:p-10"
            >
              <input type="hidden" name="form-name" value="resource-article-request" />
              <input type="hidden" name="requested_article" value={article} />
              <input type="hidden" name="page_source" value="resources" />
              <input type="hidden" name="page_url" value={pageUrl} />
              <input type="hidden" name="lead_source" value="Resource Article Request" />
              <input type="hidden" name="client_name" value="Ashley Smith" />
              <p className="hidden">
                <label>
                  Don&apos;t fill this out: <input name="bot-field" onChange={onChange} />
                </label>
              </p>

              <div className="mb-6 rounded-xl bg-ivory border border-navy/10 p-5">
                <p className="text-[11px] uppercase tracking-widewide text-taupe">
                  You are requesting
                </p>
                <p className="font-serif text-2xl text-navy mt-1">
                  {article || 'A resource from Ashley Smith'}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">First name</label>
                  <input name="first_name" required onChange={onChange} className="input" />
                </div>
                <div>
                  <label className="label">Last name</label>
                  <input name="last_name" required onChange={onChange} className="input" />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input name="email" required type="email" onChange={onChange} className="input" />
                </div>
                <div>
                  <label className="label">Phone (optional)</label>
                  <input name="phone" type="tel" onChange={onChange} className="input" />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">I am interested in</label>
                  <select name="interest" required onChange={onChange} className="input" defaultValue="">
                    <option value="" disabled>Select one</option>
                    {INTEREST_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Timeline (optional)</label>
                  <select name="timeline" onChange={onChange} className="input" defaultValue="">
                    <option value="">Select one</option>
                    {TIMELINE_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Message or notes (optional)</label>
                  <textarea name="message" rows={4} onChange={onChange} className="input" />
                </div>
              </div>

              <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto">
                Request This Article
              </button>
              {error && <p className="text-sm text-red-700 mt-4">{error}</p>}
              <p className="text-[11px] text-taupe mt-4">
                Ashley will follow up personally. Your information is used only to share the
                resource and offer relevant guidance, never sold or shared.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
