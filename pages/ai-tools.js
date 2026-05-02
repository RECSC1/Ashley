import { useState } from 'react';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import { logEvent, KEYS } from '../lib/store';

const TABS = [
  { id: 'concierge', label: 'AI Home Concierge' },
  { id: 'writer', label: 'AI Listing Description Generator' },
];

const PROMPTS = [
  'What should I know before moving to Chapel Hill?',
  'Is Chapel Hill or Carrboro better for my lifestyle?',
  'What should UNC-related buyers know?',
  'How do I prepare my home to sell in the Triangle?',
  'What does luxury real estate look like in Chapel Hill?',
  'How much do I need for a down payment?',
  'What should relocation buyers know about the Triangle?',
  'Can Ashley help me compare neighborhoods?',
  'Can Ashley help me find a home with a reasonable commute?',
];

const ANSWERS = {
  default:
    'Great question. Here is a thoughtful overview to get you started — and Ashley would love to walk through the specifics with you personally.',
  'What should I know before moving to Chapel Hill?':
    'Chapel Hill blends UNC-driven culture, top-rated CHCCS schools, and quietly elegant historic neighborhoods. Lifestyle is leafy, walkable in pockets, and deeply community-oriented. Ashley can pair you with the right pocket of town based on your routine.',
  'Is Chapel Hill or Carrboro better for my lifestyle?':
    'Chapel Hill leans historic and refined; Carrboro is independent, walkable, and creative. Many buyers fall in love with both — the right answer depends on your daily life and the home itself.',
  'What should UNC-related buyers know?':
    'Faculty, residents, and graduate students often need flexible timelines and proximity to UNC Hospital. Ashley specializes in this group — she understands medical resident match timing, sabbatical relocations, and short-window moves.',
  'How do I prepare my home to sell in the Triangle?':
    'Editorial-level preparation matters: thoughtful staging, professional photography, and pre-list polish. Ashley\'s seller process is designed to position your home as a calm, confident purchase decision.',
  'What does luxury real estate look like in Chapel Hill?':
    'Luxury in Chapel Hill spans historic estates, custom new builds, and quietly distinctive properties. Discretion, presentation, and trusted networks matter more than splashy marketing.',
  'How much do I need for a down payment?':
    'Most conventional loans land between 5%–20% down, with luxury and jumbo programs varying. Use Ashley\'s mortgage calculator and she can connect you with vetted local lenders.',
  'What should relocation buyers know about the Triangle?':
    'The Triangle is many cities in one — Chapel Hill, Durham, Raleigh, and Cary all feel different day to day. Ashley\'s relocation certification means structured discovery, virtual tours, and concierge-level coordination.',
  'Can Ashley help me compare neighborhoods?':
    'Yes — try the Area & Neighborhood Comparison tool under Buyer Tools, then book a consultation. Ashley will tailor the comparison to your priorities (schools, commute, lifestyle, luxury).',
  'Can Ashley help me find a home with a reasonable commute?':
    'Absolutely. Try the Commute Time Finder under Buyer Tools. From there, Ashley can build a curated home search shaped around your daily route to UNC, Duke, RTP, or Raleigh.',
};

function Concierge() {
  const [messages, setMessages] = useState([
    { from: 'ai', text: "Hello — I'm Ashley's AI Home Concierge. Ask me anything about Chapel Hill, the Triangle, buying, selling, or relocation." },
  ]);
  const [input, setInput] = useState('');
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState({});
  const [leadSent, setLeadSent] = useState(false);

  const send = (text) => {
    const userMsg = text || input;
    if (!userMsg.trim()) return;
    const reply = ANSWERS[userMsg] || ANSWERS.default;
    setMessages((m) => [...m, { from: 'user', text: userMsg }, { from: 'ai', text: reply }]);
    setInput('');
    logEvent(KEYS.CHAT, { question: userMsg });
    if (messages.filter((m) => m.from === 'user').length >= 1) setShowLead(true);
  };

  const submitLead = (e) => {
    e.preventDefault();
    logEvent(KEYS.CHAT, { lead: true, ...lead });
    setLeadSent(true);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8">
        <div className="card p-0 overflow-hidden">
          <div className="px-6 py-4 border-b border-taupe/30 bg-warmwhite flex items-center justify-between">
            <div>
              <p className="font-serif text-xl text-navy">Ashley's AI Home Concierge</p>
              <p className="text-[11px] uppercase tracking-widewide text-taupe">Powered by Ashley Smith · Compass North Carolina, LLC</p>
            </div>
            <span className="badge bg-sage/30 text-navy">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-pulse" /> Online now
            </span>
          </div>

          <div className="px-6 py-5 max-h-[440px] overflow-y-auto space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                  m.from === 'user' ? 'bg-navy text-ivory' : 'bg-ivory text-navy border border-taupe/30'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 border-t border-taupe/30 bg-warmwhite">
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
              <input className="input flex-1" placeholder="Ask about Chapel Hill, the Triangle, or your goals…" value={input} onChange={(e) => setInput(e.target.value)} />
              <button className="btn btn-primary">Send</button>
            </form>
          </div>
        </div>

        <p className="text-[11px] text-taupe mt-3">
          Ashley's AI Home Concierge provides general real estate guidance. For personalized advice, connect directly with Ashley.
        </p>
      </div>

      <div className="lg:col-span-4 space-y-4">
        <div className="card">
          <p className="eyebrow mb-3">Try a question</p>
          <div className="space-y-2">
            {PROMPTS.map((p) => (
              <button key={p} onClick={() => send(p)} className="w-full text-left text-sm text-navy/80 hover:text-navy hover:bg-ivory rounded-lg p-3 border border-taupe/30 transition">
                {p}
              </button>
            ))}
          </div>
        </div>

        {showLead && !leadSent && (
          <form onSubmit={submitLead} className="card">
            <p className="font-serif text-xl text-navy">Want to keep going?</p>
            <p className="text-sm text-navy/70 mt-1">Share your contact and Ashley will follow up with deeper guidance.</p>
            <div className="space-y-3 mt-4">
              <input required placeholder="Name" className="input" onChange={(e) => setLead({ ...lead, name: e.target.value })} />
              <input required type="email" placeholder="Email" className="input" onChange={(e) => setLead({ ...lead, email: e.target.value })} />
              <input placeholder="Phone (optional)" className="input" onChange={(e) => setLead({ ...lead, phone: e.target.value })} />
              <input placeholder="Intent (e.g. relocating)" className="input" onChange={(e) => setLead({ ...lead, intent: e.target.value })} />
            </div>
            <button className="btn btn-primary mt-4 w-full">Connect with Ashley</button>
          </form>
        )}
        {leadSent && (
          <div className="card text-center"><p className="font-serif text-xl text-navy">Sent — Ashley will reach out personally.</p></div>
        )}

        <a href="/contact" className="btn btn-outline w-full">Talk to Ashley Directly</a>
      </div>
    </div>
  );
}

const FEATURES = [
  'Renovated Kitchen', 'Hardwood Floors', 'Open Floor Plan', 'Primary Suite', 'Finished Basement',
  'Screened Porch', 'Deck/Patio', '2-Car Garage', 'Cul-de-sac', 'Fireplace', 'Vaulted Ceilings',
  'Quartz Counters', 'Stainless Appliances', 'Walk-in Closets', 'New Roof', 'Updated HVAC',
  'Fenced Yard', 'HOA Community', 'Pool', 'Lake/Water View', 'Smart Home', 'Solar Panels',
  'Historic Charm', 'Walkable Location',
];

function ListingWriter() {
  const [v, setV] = useState({
    address: '', type: 'Single Family Home', price: '', beds: '', baths: '', sqft: '', year: '',
    lot: '', neighborhood: '', notes: '', tone: 'Warm & Inviting', length: 'Standard MLS', target: 'Families',
    features: [],
  });
  const [out, setOut] = useState(null);
  const onChange = (e) => setV({ ...v, [e.target.name]: e.target.value });
  const toggleFeature = (f) =>
    setV((s) => ({ ...s, features: s.features.includes(f) ? s.features.filter((x) => x !== f) : [...s.features, f] }));

  const generate = (e) => {
    e.preventDefault();
    const featStr = v.features.length ? v.features.join(', ').toLowerCase() : 'thoughtful upgrades';
    const toneOpener = {
      'Warm & Inviting': 'Welcome home to',
      'Luxury & Refined': 'A distinguished offering at',
      'Clear & Professional': 'Now available:',
      'Storytelling': 'Step inside a home that tells its own story at',
      'Investor-Focused': 'A compelling investment opportunity at',
    }[v.tone] || 'Welcome to';

    const mls = `${toneOpener} ${v.address || '[address]'}, a ${v.beds || '—'}-bed, ${v.baths || '—'}-bath ${v.type.toLowerCase()} offering approximately ${v.sqft || '—'} sq ft of refined living. Highlights include ${featStr}. Set in ${v.neighborhood || 'a sought-after Triangle neighborhood'} and tailored for ${v.target.toLowerCase()}. ${v.notes || ''}`.trim();

    const social = `✨ ${v.neighborhood || 'Triangle'} ${v.type} just listed at ${v.address || '[address]'}. ${v.beds || '—'} bd / ${v.baths || '—'} ba · ${v.sqft || '—'} sq ft · Featuring ${v.features.slice(0, 3).join(', ').toLowerCase() || 'beautiful details throughout'}. DM for a private tour. — Ashley Smith, Compass NC`;

    const teaser = `Subject: A New ${v.neighborhood || 'Triangle'} Listing You'll Want to See\n\nA refined ${v.type.toLowerCase()} has just come to market at ${v.address || '[address]'} — ${v.beds || '—'} bedrooms, ${v.baths || '—'} bathrooms, and ${v.sqft || '—'} sq ft, beautifully positioned for ${v.target.toLowerCase()}. Featuring ${featStr}. Reply to schedule a private showing.\n\n— Ashley Smith, Compass North Carolina, LLC`;

    setOut({ mls, social, teaser });
    logEvent(KEYS.LISTINGS_GEN, { address: v.address, type: v.type, neighborhood: v.neighborhood });
  };

  const copy = (text) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) navigator.clipboard.writeText(text);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <form onSubmit={generate} className="card lg:col-span-7">
        <h3 className="font-serif text-2xl text-navy mb-1">AI Listing Description Generator</h3>
        <p className="text-navy/70 text-sm mb-5">Generate refined MLS, social, and email copy instantly. Front-end mock — ready to wire to a live AI API.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><label className="label">Property address</label><input name="address" className="input" onChange={onChange} /></div>
          <div><label className="label">Property type</label>
            <select name="type" className="input" value={v.type} onChange={onChange}>
              {['Single Family Home', 'Townhome', 'Condo', 'Luxury Estate', 'Ranch', 'New Construction', 'Investment Property'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div><label className="label">List price</label><input name="price" className="input" onChange={onChange} /></div>
          <div><label className="label">Beds</label><input name="beds" className="input" onChange={onChange} /></div>
          <div><label className="label">Baths</label><input name="baths" className="input" onChange={onChange} /></div>
          <div><label className="label">Square footage</label><input name="sqft" className="input" onChange={onChange} /></div>
          <div><label className="label">Year built</label><input name="year" className="input" onChange={onChange} /></div>
          <div><label className="label">Lot size</label><input name="lot" className="input" onChange={onChange} /></div>
          <div className="sm:col-span-2"><label className="label">Neighborhood</label><input name="neighborhood" className="input" onChange={onChange} /></div>
        </div>
        <div className="mt-4">
          <label className="label">Key features</label>
          <div className="flex flex-wrap gap-2">
            {FEATURES.map((f) => (
              <button type="button" key={f} onClick={() => toggleFeature(f)} className={`badge border transition ${v.features.includes(f) ? 'bg-navy text-ivory border-navy' : 'bg-warmwhite text-navy/70 border-taupe/40'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div><label className="label">Tone</label>
            <select name="tone" className="input" value={v.tone} onChange={onChange}>
              {['Warm & Inviting', 'Luxury & Refined', 'Clear & Professional', 'Storytelling', 'Investor-Focused'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div><label className="label">Length</label>
            <select name="length" className="input" value={v.length} onChange={onChange}>
              {['Short MLS', 'Standard MLS', 'Full Website/Marketing'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div><label className="label">Target buyer</label>
            <select name="target" className="input" value={v.target} onChange={onChange}>
              {['Families', 'First-Time Buyers', 'Move-Up Buyers', 'Investors', 'Retirees/Downsizers', 'Luxury Buyers', 'Relocation Buyers'].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-4"><label className="label">Additional notes</label><textarea name="notes" rows={3} className="input" onChange={onChange} /></div>
        <button className="btn btn-primary mt-5">Generate Descriptions</button>
      </form>

      <div className="lg:col-span-5 space-y-4">
        {out ? (
          [
            ['MLS Description', out.mls],
            ['Social Caption', out.social],
            ['Email Teaser', out.teaser],
          ].map(([t, c]) => (
            <div key={t} className="card">
              <div className="flex items-center justify-between">
                <p className="eyebrow">{t}</p>
                <button onClick={() => copy(c)} className="text-xs text-gold hover:text-navy">Copy</button>
              </div>
              <p className="mt-3 whitespace-pre-line text-navy/80 text-sm leading-relaxed">{c}</p>
            </div>
          ))
        ) : (
          <div className="card h-full flex items-center justify-center text-center text-navy/60 min-h-[260px]">
            <p>Fill in the form to generate three polished descriptions.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AITools() {
  const [tab, setTab] = useState('concierge');
  return (
    <>
      <SEO
        title="AI Real Estate Tools | Ashley Smith Realtor® Chapel Hill"
        description="AI-powered real estate tools for Chapel Hill and the Triangle, including the AI Home Concierge and AI Listing Description Generator. Crafted for buyers, sellers, and Realtors with Compass North Carolina."
        path="/ai-tools"
      />
      <section className="section">
        <div className="container-wide">
          <SectionHeader
            eyebrow="AI Tools"
            title="Refined intelligence — at your service"
            subtitle="Two thoughtful AI experiences: a Chapel Hill home concierge and a luxury-tone listing writer."
          />
          <div className="flex gap-2 border-b border-taupe/30 mb-8">
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`px-5 py-3 text-sm border-b-2 transition ${
                  tab === t.id ? 'border-gold text-navy font-medium' : 'border-transparent text-navy/60 hover:text-navy'
                }`}>{t.label}</button>
            ))}
          </div>
          {tab === 'concierge' ? <Concierge /> : <ListingWriter />}
        </div>
      </section>
    </>
  );
}
