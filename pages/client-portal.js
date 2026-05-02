import { useState } from 'react';
import SEO from '../components/SEO';

const TIMELINE = [
  { label: 'Consultation', done: true },
  { label: 'Pre-approval / Listing prep', done: true },
  { label: 'Search / Launch', done: true },
  { label: 'Offer / Negotiation', done: false, current: true },
  { label: 'Under Contract', done: false },
  { label: 'Inspections', done: false },
  { label: 'Appraisal', done: false },
  { label: 'Closing', done: false },
];

const DOCS = [
  'Buyer consultation packet',
  'Seller prep checklist',
  '[Listing agreement placeholder]',
  '[Offer documents placeholder]',
  '[Inspection notes placeholder]',
];

const HOME_MATCHES = [
  { addr: '[Curated match 1]', city: 'Chapel Hill, NC', price: '$—' },
  { addr: '[Curated match 2]', city: 'Carrboro, NC', price: '$—' },
  { addr: '[Curated match 3]', city: 'Cary, NC', price: '$—' },
];

const SAMPLE_MESSAGES = [
  { from: 'ashley', text: 'Welcome to your private portal. I\'ve added the buyer consultation packet for review.', at: 'Today, 9:14 AM' },
  { from: 'client', text: 'Thank you! I\'ll review tonight and send questions tomorrow.', at: 'Today, 11:42 AM' },
  { from: 'ashley', text: 'Take your time. I\'ll have curated home matches ready by Friday.', at: 'Today, 11:50 AM' },
];

function PortalView() {
  const [tab, setTab] = useState('overview');
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);
  const [draft, setDraft] = useState('');

  const send = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setMessages([...messages, { from: 'client', text: draft, at: 'Just now' }]);
    setDraft('');
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-taupe/30 mb-8">
        {[
          ['overview', 'Overview'],
          ['documents', 'Documents'],
          ['timeline', 'Timeline'],
          ['matches', 'Home Matches'],
          ['messages', 'Messages'],
        ].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-5 py-3 text-sm border-b-2 transition ${tab === id ? 'border-gold text-navy font-medium' : 'border-transparent text-navy/60 hover:text-navy'}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            ['Client', '[Client name]'],
            ['Transaction', 'Buyer Representation'],
            ['Current stage', 'Offer / Negotiation'],
            ['Next milestone', 'Submit offer & negotiate'],
            ['Important dates', 'Inspection window opens [date]'],
            ['Ashley', 'Active · responding within hours'],
          ].map(([k, v]) => (
            <div key={k} className="card">
              <p className="text-[10px] uppercase tracking-widewide text-taupe">{k}</p>
              <p className="font-serif text-2xl text-navy mt-1">{v}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'documents' && (
        <div className="card">
          <p className="font-serif text-2xl text-navy mb-5">Shared Documents</p>
          <ul className="divide-y divide-taupe/30">
            {DOCS.map((d) => (
              <li key={d} className="py-4 flex items-center justify-between">
                <span className="text-navy/80">{d}</span>
                <button className="btn btn-outline text-xs">View</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === 'timeline' && (
        <div className="card">
          <p className="font-serif text-2xl text-navy mb-5">Your Transaction Timeline</p>
          <ol className="relative pl-6">
            <span className="absolute left-2 top-1 bottom-1 w-px bg-taupe/40" />
            {TIMELINE.map((t, i) => (
              <li key={i} className="mb-6 last:mb-0 relative">
                <span className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full ${t.done ? 'bg-gold' : t.current ? 'bg-blush border-2 border-gold' : 'bg-taupe/40'}`} />
                <p className={`font-serif text-xl ${t.current ? 'text-navy' : t.done ? 'text-navy/80' : 'text-taupe'}`}>{t.label}</p>
                {t.current && <p className="text-xs text-gold uppercase tracking-widewide mt-1">In progress</p>}
              </li>
            ))}
          </ol>
        </div>
      )}

      {tab === 'matches' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HOME_MATCHES.map((m, i) => (
            <div key={i} className="card p-0 overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-blush/30 via-warmwhite to-sage/30 flex items-center justify-center">
                <span className="text-[10px] uppercase tracking-widewide text-taupe">[Property image]</span>
              </div>
              <div className="p-5">
                <p className="font-serif text-xl text-navy">{m.addr}</p>
                <p className="text-sm text-taupe">{m.city}</p>
                <p className="mt-2 font-medium text-navy">{m.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'messages' && (
        <div className="card">
          <p className="font-serif text-2xl text-navy mb-5">Messages with Ashley</p>
          <div className="space-y-3 mb-5 max-h-80 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'client' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${m.from === 'client' ? 'bg-navy text-ivory' : 'bg-ivory border border-taupe/30 text-navy'}`}>
                  <p>{m.text}</p>
                  <p className="text-[10px] uppercase tracking-widewide opacity-60 mt-2">{m.at}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={send} className="flex gap-2">
            <input value={draft} onChange={(e) => setDraft(e.target.value)} className="input flex-1" placeholder="Write a message…" />
            <button className="btn btn-primary">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function ClientPortal() {
  const [signedIn, setSignedIn] = useState(false);
  const [creds, setCreds] = useState({ email: '', code: '' });

  return (
    <>
      <SEO
        title="Client Portal | Ashley Smith Real Estate"
        description="Private client portal for buyers and sellers working with Ashley Smith, Realtor® at Compass North Carolina. Track your timeline, documents, curated home matches, and messages."
        path="/client-portal"
      />
      <section className="section">
        <div className="container-wide">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-3">Client Portal</p>
            <h1 className="font-serif text-5xl text-navy">A private workspace for your transaction.</h1>
            <div className="divider-thin mt-6" />
            <p className="mt-4 text-navy/70 leading-relaxed text-lg">
              Track milestones, review documents, and message Ashley securely. Full backend authentication
              will be wired in for production — for now, the portal includes a polished demo experience.
            </p>
          </div>

          {!signedIn ? (
            <div className="grid lg:grid-cols-2 gap-8">
              <form onSubmit={(e) => { e.preventDefault(); setSignedIn(true); }} className="card max-w-md">
                <p className="font-serif text-2xl text-navy">Client Sign-In</p>
                <p className="text-sm text-navy/70 mt-1">Enter the access code Ashley provided.</p>
                <div className="space-y-4 mt-5">
                  <div><label className="label">Email</label><input required type="email" className="input" value={creds.email} onChange={(e) => setCreds({ ...creds, email: e.target.value })} /></div>
                  <div><label className="label">Access code</label><input required className="input" value={creds.code} onChange={(e) => setCreds({ ...creds, code: e.target.value })} /></div>
                </div>
                <button className="btn btn-primary mt-5 w-full">Login</button>
                <button type="button" onClick={() => setSignedIn(true)} className="btn btn-outline mt-3 w-full">View Demo Portal</button>
              </form>

              <div className="card bg-navy text-ivory">
                <p className="font-serif text-2xl">A calmer way to navigate your transaction.</p>
                <ul className="mt-5 space-y-3 text-sm text-ivory/80">
                  <li>· Real-time milestone tracking</li>
                  <li>· Secure document sharing</li>
                  <li>· Curated home matches</li>
                  <li>· Direct messaging with Ashley</li>
                </ul>
                <p className="text-[11px] text-ivory/60 mt-6">Full authentication and storage will be wired into the production deployment.</p>
              </div>
            </div>
          ) : (
            <PortalView />
          )}
        </div>
      </section>
    </>
  );
}
