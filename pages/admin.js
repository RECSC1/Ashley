import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { KEYS, readLog, clearLog } from '../lib/store';

const SECTIONS = [
  { id: 'analytics', label: 'Analytics & Performance' },
  { id: 'settings', label: 'Site Settings & SEO' },
  { id: 'blog', label: 'Blog Posts' },
  { id: 'resources', label: 'Resources Library' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'listings', label: 'Listings' },
  { id: 'valuations', label: 'Valuations' },
  { id: 'messages', label: 'Messages Inbox' },
  { id: 'chats', label: 'AI Chat Log' },
  { id: 'portal', label: 'Client Portal Access' },
  { id: 'writer', label: 'AI Listing Writer' },
  { id: 'tools', label: 'Tool Interactions' },
];

const ANALYTICS = [
  { label: 'Site Visitors', value: '4,287', sub: '+12% MoM' },
  { label: 'Contact Form Submissions', value: '38', sub: 'last 30 days' },
  { label: 'Tool Interactions', value: '162', sub: 'localStorage + mock' },
  { label: 'Valuation Requests', value: '14', sub: '$1.4M avg list value' },
  { label: 'Blog Views', value: '2,143', sub: 'last 30 days' },
  { label: 'Property Alert Signups', value: '46', sub: 'all-time placeholder' },
  { label: 'Commute Searches', value: '—', sub: 'see Tool Interactions' },
];

const INITIAL_BLOG = [
  { id: 1, title: 'Moving to Chapel Hill: What Buyers Should Know', cat: 'Relocation', status: 'Published', date: '[Date]' },
  { id: 2, title: 'How to Prepare Your Triangle Home for Market', cat: 'Selling', status: 'Draft', date: '[Date]' },
  { id: 3, title: 'What UNC-Related Buyers Should Know Before Moving', cat: 'UNC Moves', status: 'Published', date: '[Date]' },
];

const INITIAL_GUIDES = [
  { id: 1, title: 'Chapel Hill Relocation Guide', status: 'Live' },
  { id: 2, title: 'Buyer Guide', status: 'Live' },
  { id: 3, title: 'Seller Guide', status: 'Live' },
  { id: 4, title: 'Luxury Buyer Guide', status: 'Live' },
  { id: 5, title: 'Commute-Friendly Search Guide', status: 'Live' },
];

const INITIAL_TESTIMONIALS = [
  { id: 1, name: '[Client name]', text: '[Approved testimonial 1]', status: 'Pending Review' },
  { id: 2, name: '[Client name]', text: '[Approved testimonial 2]', status: 'Pending Review' },
];

const INITIAL_LISTINGS = [
  { id: 1, address: '[Listing 1]', city: 'Chapel Hill', price: '$—', status: 'Active' },
  { id: 2, address: '[Listing 2]', city: 'Cary', price: '$—', status: 'Sold' },
];

const INITIAL_CLIENTS = [
  { name: '[Client A]', code: 'CHC-001', stage: 'Offer / Negotiation' },
  { name: '[Client B]', code: 'CHC-002', stage: 'Listing Prep' },
  { name: '[Client C]', code: 'CHC-003', stage: 'Closing' },
];

function Login({ onLogin }) {
  const [code, setCode] = useState('');
  const [err, setErr] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    // Demo password — clearly placeholder
    if (code === 'ashley' || code === 'demo') onLogin();
    else setErr(true);
  };
  return (
    <section className="section">
      <div className="container-narrow max-w-md">
        <p className="eyebrow mb-3">Admin</p>
        <h1 className="font-serif text-4xl text-navy">Admin Dashboard</h1>
        <p className="text-navy/70 mt-2">Demo access — replace with real authentication in production.</p>
        <form onSubmit={onSubmit} className="card mt-6">
          <label className="label">Access code</label>
          <input className="input" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Try: demo" />
          {err && <p className="text-xs text-red-600 mt-2">Invalid code. Try "demo".</p>}
          <button className="btn btn-primary mt-4 w-full">Sign In</button>
          <p className="text-[11px] text-taupe mt-3">
            For demo purposes only. Production should use Netlify Identity, Auth0, or similar.
          </p>
        </form>
      </div>
    </section>
  );
}

function Card({ title, value, sub }) {
  return (
    <div className="card">
      <p className="text-[10px] uppercase tracking-widewide text-taupe">{title}</p>
      <p className="font-serif text-4xl text-navy mt-2">{value}</p>
      <p className="text-xs text-taupe mt-1">{sub}</p>
    </div>
  );
}

function Settings() {
  const [s, setS] = useState({
    title: 'Ashley Smith | Chapel Hill Realtor® | Compass North Carolina',
    description: 'Elegant, people-first real estate guidance for Chapel Hill, Carrboro, and the Triangle.',
    area: 'Chapel Hill, NC',
    email: '[Ashley\'s email]',
    phone: '[Ashley\'s phone number]',
    instagram: '[Instagram URL]',
    facebook: '[Facebook URL]',
    linkedin: '[LinkedIn URL]',
    keywords: 'Chapel Hill Realtor, Carrboro real estate, Triangle relocation, luxury Chapel Hill',
  });
  return (
    <div className="card">
      <p className="font-serif text-2xl text-navy mb-5">Site Settings & SEO Controls</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          ['title', 'Site title'],
          ['description', 'Meta description'],
          ['area', 'Primary service area'],
          ['email', 'Contact email'],
          ['phone', 'Contact phone'],
          ['instagram', 'Instagram'],
          ['facebook', 'Facebook'],
          ['linkedin', 'LinkedIn'],
          ['keywords', 'SEO keywords'],
        ].map(([k, l]) => (
          <div key={k} className={k === 'description' || k === 'keywords' ? 'sm:col-span-2' : ''}>
            <label className="label">{l}</label>
            {k === 'description' || k === 'keywords' ? (
              <textarea className="input" rows={2} value={s[k]} onChange={(e) => setS({ ...s, [k]: e.target.value })} />
            ) : (
              <input className="input" value={s[k]} onChange={(e) => setS({ ...s, [k]: e.target.value })} />
            )}
          </div>
        ))}
      </div>
      <button className="btn btn-primary mt-5">Save Settings</button>
      <p className="text-[11px] text-taupe mt-3">Demo only — wire to your CMS or API in production.</p>
    </div>
  );
}

function CrudList({ title, initial, columns, addPlaceholder }) {
  const [items, setItems] = useState(initial);
  const [draft, setDraft] = useState({});
  const add = () => {
    if (!Object.values(draft).some(Boolean)) return;
    setItems([{ id: Date.now(), ...draft }, ...items]);
    setDraft({});
  };
  return (
    <div className="card">
      <p className="font-serif text-2xl text-navy mb-5">{title}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {columns.map((c) => (
          <input key={c.key} placeholder={c.label} className="input"
            value={draft[c.key] || ''}
            onChange={(e) => setDraft({ ...draft, [c.key]: e.target.value })} />
        ))}
      </div>
      <button onClick={add} className="btn btn-outline text-xs">{addPlaceholder || 'Add'}</button>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              {columns.map((c) => <th key={c.key} className="py-2 text-[10px] uppercase tracking-widewide text-taupe">{c.label}</th>)}
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id} className="border-t border-taupe/30">
                {columns.map((c) => <td key={c.key} className="py-3 pr-4 text-navy/80">{i[c.key]}</td>)}
                <td className="py-3 text-right">
                  <button onClick={() => setItems(items.filter((x) => x.id !== i.id))} className="text-xs text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LogTable({ title, storageKey, columns, emptyHint }) {
  const [items, setItems] = useState([]);
  useEffect(() => { setItems(readLog(storageKey)); }, [storageKey]);
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <p className="font-serif text-2xl text-navy">{title}</p>
        <button
          onClick={() => { clearLog(storageKey); setItems([]); }}
          className="text-xs text-taupe hover:text-navy"
        >Clear log</button>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-taupe">{emptyHint || 'No entries yet — try the corresponding tool.'}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left">
              {columns.map((c) => <th key={c} className="py-2 text-[10px] uppercase tracking-widewide text-taupe">{c}</th>)}
            </tr></thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={i} className="border-t border-taupe/30 align-top">
                  {columns.map((c) => (
                    <td key={c} className="py-3 pr-4 text-navy/80">
                      {c === 'Time' ? new Date(it.ts).toLocaleString() : (it[c.toLowerCase().replace(/\s+/g, '_')] ?? it[c.toLowerCase()] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function CommuteLog() {
  const [items, setItems] = useState([]);
  useEffect(() => { setItems(readLog(KEYS.COMMUTE)); }, []);
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <p className="font-serif text-2xl text-navy">Commute Time Finder Searches</p>
        <button onClick={() => { clearLog(KEYS.COMMUTE); setItems([]); }} className="text-xs text-taupe hover:text-navy">Clear log</button>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-taupe">No commute searches yet — try the Commute Time Finder under Buyer Tools.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-[10px] uppercase tracking-widewide text-taupe">
              <th className="py-2 pr-4">Time</th>
              <th className="py-2 pr-4">From</th>
              <th className="py-2 pr-4">To</th>
              <th className="py-2 pr-4">Mode</th>
              <th className="py-2 pr-4">Departure</th>
              <th className="py-2 pr-4">Estimate</th>
              <th className="py-2 pr-4">Lead</th>
            </tr></thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={i} className="border-t border-taupe/30">
                  <td className="py-3 pr-4 text-navy/80 whitespace-nowrap">{new Date(it.ts).toLocaleString()}</td>
                  <td className="py-3 pr-4 text-navy/80">{it.origin || '—'}</td>
                  <td className="py-3 pr-4 text-navy/80">{it.dest || '—'}</td>
                  <td className="py-3 pr-4 text-navy/80">{it.mode || '—'}</td>
                  <td className="py-3 pr-4 text-navy/80">{it.depart || '—'}</td>
                  <td className="py-3 pr-4 text-navy/80">
                    {it.estimated_minutes ? `${it.estimated_minutes} min · ${it.estimated_distance_miles} mi` : '—'}
                  </td>
                  <td className="py-3 pr-4 text-navy/80">{it.lead ? `${it.name || ''} ${it.email || ''}` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ToolInteractions() {
  return (
    <div className="space-y-6">
      <CommuteLog />
      <LogTable title="School Searches" storageKey={KEYS.SCHOOLS} columns={['Time', 'Address', 'Type']} />
      <LogTable title="Direction Searches" storageKey={KEYS.DIRECTION} columns={['Time', 'Address']} />
      <LogTable title="Landmark Searches" storageKey={KEYS.LANDMARKS} columns={['Time', 'Address', 'Filter']} />
      <LogTable title="Neighborhood Comparisons" storageKey={KEYS.COMPARE} columns={['Time', 'A1', 'A2']} />
      <LogTable title="Mortgage Calculator Sessions" storageKey={KEYS.MORTGAGE} columns={['Time', 'Price', 'Down', 'Rate']} />
      <LogTable title="Home Valuation Requests" storageKey={KEYS.VALUATION} columns={['Time', 'Name', 'Email', 'Address']} />
    </div>
  );
}

export default function Admin() {
  const [signedIn, setSignedIn] = useState(false);
  const [tab, setTab] = useState('analytics');

  return (
    <>
      <SEO
        title="Admin Dashboard | Ashley Smith Real Estate"
        description="Admin dashboard for Ashley Smith's Chapel Hill real estate website. Manage analytics, listings, testimonials, valuations, AI conversations, and tool interactions including commute searches."
        path="/admin"
      />
      {!signedIn ? (
        <Login onLogin={() => setSignedIn(true)} />
      ) : (
        <section className="section">
          <div className="container-wide">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
              <div>
                <p className="eyebrow mb-2">Admin</p>
                <h1 className="font-serif text-4xl text-navy">Dashboard</h1>
              </div>
              <button onClick={() => setSignedIn(false)} className="btn btn-outline text-xs">Sign Out</button>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              <aside className="lg:col-span-3">
                <div className="card p-2">
                  {SECTIONS.map((s) => (
                    <button key={s.id} onClick={() => setTab(s.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition ${
                        tab === s.id ? 'bg-navy text-ivory' : 'text-navy/80 hover:bg-ivory'
                      }`}>{s.label}</button>
                  ))}
                </div>
              </aside>

              <main className="lg:col-span-9 space-y-6">
                {tab === 'analytics' && (
                  <>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {ANALYTICS.map((a) => <Card key={a.label} title={a.label} value={a.value} sub={a.sub} />)}
                    </div>
                    <div className="card">
                      <p className="font-serif text-xl text-navy">Recent Tool Interactions</p>
                      <p className="text-sm text-navy/70 mt-1">A live count of localStorage-backed tool sessions appears under Tool Interactions.</p>
                    </div>
                  </>
                )}
                {tab === 'settings' && <Settings />}
                {tab === 'blog' && (
                  <CrudList title="Blog Posts" initial={INITIAL_BLOG}
                    columns={[
                      { key: 'title', label: 'Title' },
                      { key: 'cat', label: 'Category' },
                      { key: 'status', label: 'Status' },
                      { key: 'date', label: 'Date' },
                    ]} />
                )}
                {tab === 'resources' && (
                  <CrudList title="Resources Library" initial={INITIAL_GUIDES}
                    columns={[
                      { key: 'title', label: 'Guide title' },
                      { key: 'status', label: 'Status' },
                    ]} addPlaceholder="Upload Guide" />
                )}
                {tab === 'testimonials' && (
                  <CrudList title="Testimonials" initial={INITIAL_TESTIMONIALS}
                    columns={[
                      { key: 'name', label: 'Client name' },
                      { key: 'text', label: 'Testimonial' },
                      { key: 'status', label: 'Status' },
                    ]} />
                )}
                {tab === 'listings' && (
                  <CrudList title="Listings" initial={INITIAL_LISTINGS}
                    columns={[
                      { key: 'address', label: 'Address' },
                      { key: 'city', label: 'City' },
                      { key: 'price', label: 'Price' },
                      { key: 'status', label: 'Status' },
                    ]} />
                )}
                {tab === 'valuations' && (
                  <LogTable title="Valuation Submissions" storageKey={KEYS.VALUATION} columns={['Time', 'Name', 'Email', 'Address']} emptyHint="No valuation submissions yet — placeholder list below." />
                )}
                {tab === 'messages' && (
                  <LogTable title="Messages Inbox" storageKey={KEYS.CONTACT} columns={['Time', 'First_name', 'Last_name', 'Email', 'Interest']} emptyHint="No messages yet — submit the Contact form to see entries appear here." />
                )}
                {tab === 'chats' && (
                  <LogTable title="AI Chat Conversations Log" storageKey={KEYS.CHAT} columns={['Time', 'Question']} emptyHint="No chat sessions yet." />
                )}
                {tab === 'portal' && (
                  <div className="card">
                    <p className="font-serif text-2xl text-navy mb-4">Client Portal Access</p>
                    <table className="w-full text-sm">
                      <thead><tr className="text-left text-[10px] uppercase tracking-widewide text-taupe">
                        <th className="py-2">Client</th><th className="py-2">Access Code</th><th className="py-2">Stage</th>
                      </tr></thead>
                      <tbody>
                        {INITIAL_CLIENTS.map((c) => (
                          <tr key={c.code} className="border-t border-taupe/30">
                            <td className="py-3 text-navy/80">{c.name}</td>
                            <td className="py-3 text-navy/80 font-mono">{c.code}</td>
                            <td className="py-3 text-navy/80">{c.stage}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-[11px] text-taupe mt-4">Production should use Netlify Identity, Auth0, or similar.</p>
                  </div>
                )}
                {tab === 'writer' && (
                  <div className="card">
                    <p className="font-serif text-2xl text-navy mb-2">AI Listing Writer</p>
                    <p className="text-sm text-navy/70">Use the full listing description generator on the AI Tools page. Generated drafts are logged for your reference under Tool Interactions.</p>
                    <a href="/ai-tools" className="btn btn-primary mt-4">Open Listing Writer</a>
                  </div>
                )}
                {tab === 'tools' && <ToolInteractions />}
              </main>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
