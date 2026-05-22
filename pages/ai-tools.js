import { useState } from 'react';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import { logEvent, KEYS } from '../lib/store';

const TABS = [
  { id: 'concierge', label: "Ashley's Guided Home Concierge" },
  { id: 'writer', label: 'AI Listing Description Generator' },
];

const PROMPTS = [
  'What should I know before moving to Chapel Hill?',
  'Is Chapel Hill or Carrboro better for my lifestyle?',
  'Can Ashley help me compare cities across the Triangle?',
  'What should I know about Durham vs. Chapel Hill?',
  'What should I know about Cary or Raleigh compared with Chapel Hill?',
  'What should UNC-related buyers know?',
  'How do I prepare my home to sell in the Triangle?',
  'What does luxury real estate look like in Chapel Hill and the Triangle?',
  'How much do I need for a down payment?',
  'What should relocation buyers know about the Triangle?',
  'Can Ashley help me find a home with a reasonable commute?',
];

const ANSWERS = {
  'What should I know before moving to Chapel Hill?':
    "Chapel Hill is a vibrant university town anchored by UNC, with a strong sense of community, tree-lined neighborhoods, and a culture shaped by education, healthcare, and the arts. The housing market tends to be competitive, especially near campus, downtown, and top-rated schools in the Chapel Hill-Carrboro City Schools district.\n\nNeighborhoods range from walkable streets near Franklin Street to quieter, wooded lots on the outskirts, and pricing varies significantly depending on location, lot size, and age of the home. Commute patterns matter too: many residents work in Durham, RTP, or Raleigh, so your location within the area can affect your daily drive.\n\nSchool assignments are district-based, and boundaries can shift, so verifying your address with the school district directly is essential before making a buying decision. Chapel Hill rewards buyers who do their homework, and working with someone who knows the nuances of the local market makes a real difference.\n\nAshley would love to walk you through the neighborhoods, pricing, and timing that fit your situation. Reach out to start a conversation.\n\n(This is general guidance, not legal, financial, lending, school assignment, or real estate advice.)",

  'Is Chapel Hill or Carrboro better for my lifestyle?':
    "Chapel Hill has a classic, university-connected feel: polished, residential, with strong ties to UNC, established neighborhoods, and a quieter pace in many areas. You will find a mix of historic homes, newer developments, and proximity to campus culture, dining, and healthcare.\n\nCarrboro has a more independent, artsy, walkable energy. It is community-driven, creative, and compact, with local shops, a co-op grocery, music venues, and a strong sense of place. Many residents walk or bike as part of their daily routine.\n\nBoth towns are close, and some buyers explore both before deciding. The right fit depends on your commute, budget, school preferences, and the kind of daily rhythm you want. Some buyers end up surprised by which one feels like home.\n\nAshley can help you compare both side by side based on what matters most to you. Reach out to start the conversation.\n\n(This is general guidance, not legal, financial, lending, school assignment, or real estate advice.)",

  'Can Ashley help me compare cities across the Triangle?':
    "Yes. Ashley works with buyers across Chapel Hill, Carrboro, Durham, Hillsborough, Pittsboro, Cary, Raleigh, and surrounding Triangle communities. Each area has a different lifestyle, price point, commute pattern, housing style, and pace, and comparing them takes more than browsing listings online.\n\nBuyers who are new to the area often benefit from understanding the day-to-day differences: how a morning commute to RTP feels from Cary versus Chapel Hill, how school districts compare, what kind of neighborhood culture fits their family, and where their budget goes furthest.\n\nThe best approach is to compare daily life, not just home prices. Ashley can help narrow your search based on lifestyle, commute, schools, budget, and long-term goals so you are not just finding a house but choosing the right community.\n\nReach out to start a personalized comparison with Ashley.\n\n(This is general guidance, not legal, financial, lending, school assignment, or real estate advice.)",

  'What should I know about Durham vs. Chapel Hill?':
    "Chapel Hill is strongly tied to UNC, with established neighborhoods, a polished university-town feel, and a quieter pace. It is known for walkable downtown areas, top-rated schools, and a close-knit community centered around education and healthcare.\n\nDurham has a stronger urban, creative, and research-driven energy. With Duke University, a growing downtown, a nationally recognized food scene, and a culture rooted in arts and innovation, Durham attracts buyers who want more city energy and diversity in their daily life.\n\nBoth can work well depending on your commute, budget, school priorities, and lifestyle preferences. Some buyers start focused on one and end up choosing the other after visiting both. The key is not to assume one is better, but to figure out which fits your day-to-day reality.\n\nAshley can help you compare both honestly, without forcing a one-size-fits-all answer. Reach out to start the conversation.\n\n(This is general guidance, not legal, financial, lending, school assignment, or real estate advice.)",

  'What should I know about Cary or Raleigh compared with Chapel Hill?':
    "Cary is often attractive for its planned communities, strong schools, convenience, and family-friendly neighborhoods. It tends to offer newer construction, well-maintained HOA communities, and easy access to shopping, dining, and RTP commutes.\n\nRaleigh offers capital-city energy with broader inventory, job access, established neighborhoods ranging from historic to new development, and a wider range of price points. Buyers looking for urban amenities, cultural institutions, and variety often find Raleigh compelling.\n\nChapel Hill offers a university-town character, UNC proximity, a more intimate housing market, and a community shaped by education and healthcare. The pace is different from Raleigh or Cary, and that is often what draws buyers in or steers them elsewhere.\n\nAshley can help you decide based on your commute, lifestyle, budget, and daily routine. Reach out to start a comparison.\n\n(This is general guidance, not legal, financial, lending, school assignment, or real estate advice.)",

  'What should UNC-related buyers know?':
    "Proximity to UNC, the hospital, and campus matters for faculty, medical residents, graduate students, and staff, and the best options depend on whether you prioritize a short commute, walkability, or a specific school district.\n\nHousing demand near campus can be competitive, especially for well-located homes that also fall within desirable school zones. Timing is important: medical resident match cycles, academic calendars, and sabbatical timelines can compress your buying window significantly.\n\nSome buyers also consider rental or investment potential, especially if they plan to stay for a defined period. Understanding the difference between a long-term home purchase and a short-term hold changes the strategy.\n\nAshley specializes in working with UNC-related buyers and understands the timing, access, and lifestyle priorities that matter. Reach out to start a focused search.\n\n(This is general guidance, not legal, financial, lending, school assignment, or real estate advice.)",

  'How do I prepare my home to sell in the Triangle?':
    "Start with pricing strategy. The right list price, informed by recent comparable sales, local demand, and your home's condition, sets the tone for everything that follows. Overpricing costs more time and money than most sellers expect.\n\nPresentation matters: decluttering, targeted repairs, fresh paint, landscaping, and professional staging help buyers see the home's potential. Professional photography is non-negotiable in today's market. Buyers form opinions online before they ever walk through the door.\n\nNot every update is worth the investment. Some improvements offer strong returns while others do not move the needle. Local buyer expectations vary by neighborhood and price point, and market timing can influence how aggressively you prepare.\n\nAshley can help you prioritize what matters, avoid overspending, and position your home to attract the right buyer. Reach out to start your seller consultation.\n\n(This is general guidance, not legal, financial, lending, school assignment, or real estate advice.)",

  'What does luxury real estate look like in Chapel Hill and the Triangle?':
    "Luxury in the Triangle spans a wide range: private estates on acreage, architecturally distinctive homes, established golf and lifestyle communities, and properties with proximity to UNC, Duke, and RTP. What qualifies as luxury varies by area, with different expectations in Chapel Hill, Raleigh, Cary, Durham, and Pittsboro.\n\nIn Chapel Hill, luxury often means historic character, wooded lots, custom builds, and quiet distinction. In Raleigh and Cary, it may lean toward newer construction, resort-style amenities, and planned communities. Pittsboro offers land, privacy, and a more rural luxury feel. Durham's luxury market often emphasizes design, walkability, and proximity to Duke.\n\nBuyers in this segment expect discretion, strong presentation, and trusted networks. Sellers benefit from strategic positioning that reaches qualified buyers without overexposing the property.\n\nAshley is Luxury Certified and can help you navigate the Triangle's luxury market with the care and professionalism it requires. Reach out to start a confidential conversation.\n\n(This is general guidance, not legal, financial, lending, school assignment, or real estate advice.)",

  'How much do I need for a down payment?':
    "It depends on your loan type, purchase price, and buyer profile. Conventional loans typically range from 5% to 20% down. FHA loans may allow less, while jumbo or investment loans often require more. VA and USDA loans may offer zero-down options for qualifying buyers.\n\nThe right down payment is not always the highest one. Some buyers benefit from preserving cash for renovations, moving costs, or reserves, while others prefer to put more down to reduce monthly payments. Your lender can help model different scenarios based on your financial picture.\n\nThis is not lending advice, and every buyer's situation is different. The best first step is a conversation with a qualified lender who can walk through your specific options.\n\nAshley can connect you with trusted local lenders who work with buyers across a range of price points and loan types. Reach out to get started.\n\n(This is general guidance, not legal, financial, or lending advice.)",

  'What should relocation buyers know about the Triangle?':
    "The Triangle is not one place. Chapel Hill, Carrboro, Durham, Raleigh, Cary, Hillsborough, and Pittsboro all offer different lifestyles, price points, commute patterns, and community cultures. Choosing the right area is as important as choosing the right home.\n\nCommute, schools, healthcare access, university proximity, and daily routine should all factor into your decision. A home that looks perfect online may not fit your life if the commute is draining or the neighborhood culture is not what you expected. Relocation buyers benefit from structured discovery: virtual tours, neighborhood comparisons, school research, and honest local guidance.\n\nLifestyle comparison matters more than price comparison alone. Two homes at the same price in different parts of the Triangle can feel like entirely different lives.\n\nAshley is Relocation Certified and specializes in helping buyers new to North Carolina find the right community, not just the right house. Reach out to start a relocation consultation.\n\n(This is general guidance, not legal, financial, lending, school assignment, or real estate advice.)",

  'Can Ashley help me find a home with a reasonable commute?':
    "Yes, and commute should be part of the search strategy from the beginning. Where you work, where your kids go to school, and how you spend your time all shape which parts of the Triangle make sense for your daily life.\n\nBuyers can use the Commute Time Finder tool under Buyer Tools to explore drive times to key destinations like UNC, Duke, RTP, downtown Raleigh, or WakeMed. From there, Ashley can help you identify areas that balance commute, budget, lifestyle, and housing options.\n\nThis applies across the entire Triangle, not just Chapel Hill and Carrboro. A buyer commuting to RTP may find that Durham, Hillsborough, or Cary offers a better daily experience than they expected. The goal is to match your home search to your real routine.\n\nReach out to Ashley to build a commute-informed home search across the Triangle.\n\n(This is general guidance, not legal, financial, lending, school assignment, or real estate advice.)",
};

const TOPIC_KEYWORDS = [
  { key: 'What should I know before moving to Chapel Hill?', words: ['moving', 'move', 'chapel hill', 'relocat', 'before moving', 'new to'] },
  { key: 'Is Chapel Hill or Carrboro better for my lifestyle?', words: ['carrboro', 'chapel hill', 'lifestyle', 'better for', 'vs carrboro', 'or carrboro'] },
  { key: 'Can Ashley help me compare cities across the Triangle?', words: ['compare', 'cities', 'triangle', 'which city', 'which area', 'which town', 'where should'] },
  { key: 'What should I know about Durham vs. Chapel Hill?', words: ['durham', 'durham vs', 'chapel hill vs durham', 'durham or'] },
  { key: 'What should I know about Cary or Raleigh compared with Chapel Hill?', words: ['cary', 'raleigh', 'cary or', 'raleigh vs', 'raleigh or'] },
  { key: 'What should UNC-related buyers know?', words: ['unc', 'university', 'faculty', 'medical resident', 'graduate student', 'hospital', 'campus'] },
  { key: 'How do I prepare my home to sell in the Triangle?', words: ['sell', 'selling', 'prepare', 'list', 'staging', 'seller', 'home to sell'] },
  { key: 'What does luxury real estate look like in Chapel Hill and the Triangle?', words: ['luxury', 'high end', 'high-end', 'estate', 'million', 'premium', 'upscale'] },
  { key: 'How much do I need for a down payment?', words: ['down payment', 'downpayment', 'how much', 'afford', 'loan', 'mortgage', 'financing', 'lender'] },
  { key: 'What should relocation buyers know about the Triangle?', words: ['relocat', 'moving from', 'new to the area', 'new to north carolina', 'new to nc', 'transferr', 'job transfer'] },
  { key: 'Can Ashley help me find a home with a reasonable commute?', words: ['commute', 'drive time', 'traffic', 'commuting', 'drive to work', 'rtp commute'] },
];

const DEFAULT_RESPONSE =
  "That is a great topic to explore. While this guided concierge covers common buyer, seller, and relocation questions for the Triangle, your specific situation may benefit from a more personalized answer.\n\nAshley works with buyers, sellers, relocation clients, and investors across Chapel Hill, Carrboro, Durham, Hillsborough, Pittsboro, Cary, Raleigh, and the greater Triangle. She can dig into the details that matter for your goals.\n\nTry one of the suggested questions for helpful Triangle-area guidance, or reach out to Ashley directly for a personalized conversation.\n\n(This is general guidance, not legal, financial, lending, school assignment, or real estate advice.)";

function findBestAnswer(input) {
  if (ANSWERS[input]) return ANSWERS[input];
  const normalized = input.toLowerCase().replace(/[?.,!]/g, '');
  let bestKey = null;
  let bestScore = 0;
  for (const topic of TOPIC_KEYWORDS) {
    let score = 0;
    for (const kw of topic.words) {
      if (normalized.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestKey = topic.key;
    }
  }
  if (bestScore >= 1 && bestKey) return ANSWERS[bestKey];
  return DEFAULT_RESPONSE;
}

function Concierge() {
  const [messages, setMessages] = useState([
    { from: 'ai', text: "Hello. I'm Ashley's Guided Home Concierge. I can help you explore common questions about buying, selling, relocating, and living across Chapel Hill, Carrboro, Durham, Cary, Raleigh, and the greater Triangle. Select a question below or type your own to get started." },
  ]);
  const [input, setInput] = useState('');
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState({});
  const [leadSent, setLeadSent] = useState(false);
  const [leadError, setLeadError] = useState(false);

  const send = (text) => {
    const userMsg = text || input;
    if (!userMsg.trim()) return;
    const reply = findBestAnswer(userMsg);
    setMessages((m) => [...m, { from: 'user', text: userMsg }, { from: 'ai', text: reply }]);
    setInput('');
    logEvent(KEYS.CHAT, { question: userMsg });
    if (messages.filter((m) => m.from === 'user').length >= 1) setShowLead(true);
  };

  const submitLead = async (e) => {
    e.preventDefault();
    logEvent(KEYS.CHAT, { lead: true, ...lead });
    try {
      const formData = new URLSearchParams({
        'form-name': 'ai-home-concierge',
        name: lead.name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        area_of_interest: lead.area_of_interest || '',
        timeline: lead.timeline || '',
        question_notes: lead.question_notes || '',
        page_name: 'AI Tools - Guided Home Concierge',
        form_type: 'ai-home-concierge',
        lead_source: 'guided-home-concierge',
        client_name: 'Ashley Smith',
      });
      const res = await fetch('/netlify-forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
      if (res.ok) {
        setLeadSent(true);
      } else {
        setLeadError(true);
      }
    } catch {
      setLeadError(true);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8">
        <div className="card p-0 overflow-hidden">
          <div className="px-6 py-4 border-b border-taupe/30 bg-warmwhite flex items-center justify-between">
            <div>
              <p className="font-serif text-xl text-navy">Ashley&rsquo;s Guided Home Concierge</p>
              <p className="text-[11px] uppercase tracking-widewide text-taupe">Powered by Ashley Smith &middot; Compass North Carolina, LLC</p>
            </div>
            <span className="badge bg-sage/30 text-navy text-xs">
              Triangle-wide guidance
            </span>
          </div>

          <div className="px-6 py-5 max-h-[520px] overflow-y-auto space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
                  m.from === 'user' ? 'bg-navy text-ivory' : 'bg-ivory text-navy border border-taupe/30'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 border-t border-taupe/30 bg-warmwhite">
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
              <input className="input flex-1" placeholder="Ask about Chapel Hill, the Triangle, buying, selling, relocation..." value={input} onChange={(e) => setInput(e.target.value)} />
              <button className="btn btn-primary">Send</button>
            </form>
          </div>
        </div>

        <p className="text-[11px] text-taupe mt-3">
          This tool offers general guidance based on common buyer, seller, and relocation questions across the Triangle. Responses are not legal, financial, lending, school assignment, or real estate advice. For personalized guidance, connect directly with Ashley.
        </p>
      </div>

      <div className="lg:col-span-4 space-y-4">
        <div className="card">
          <p className="eyebrow mb-3">Common questions</p>
          <div className="space-y-2 max-h-[480px] overflow-y-auto">
            {PROMPTS.map((p) => (
              <button key={p} onClick={() => send(p)} className="w-full text-left text-sm text-navy/80 hover:text-navy hover:bg-ivory rounded-lg p-3 border border-taupe/30 transition">
                {p}
              </button>
            ))}
          </div>
        </div>

        {showLead && !leadSent && (
          <form
            name="ai-home-concierge"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={submitLead}
            className="card"
          >
            <input type="hidden" name="form-name" value="ai-home-concierge" />
            <p style={{ display: 'none' }}><label>Do not fill this out: <input name="bot-field" /></label></p>
            <input type="hidden" name="page_name" value="AI Tools - Guided Home Concierge" />
            <input type="hidden" name="form_type" value="ai-home-concierge" />
            <input type="hidden" name="lead_source" value="guided-home-concierge" />
            <input type="hidden" name="client_name" value="Ashley Smith" />
            <p className="font-serif text-xl text-navy">Want personalized guidance?</p>
            <p className="text-sm text-navy/70 mt-1">Share your details and Ashley will follow up with advice tailored to your situation.</p>
            <div className="space-y-3 mt-4">
              <input required name="name" placeholder="Name" className="input" onChange={(e) => setLead({ ...lead, name: e.target.value })} />
              <input required name="email" type="email" placeholder="Email" className="input" onChange={(e) => setLead({ ...lead, email: e.target.value })} />
              <input name="phone" placeholder="Phone (optional)" className="input" onChange={(e) => setLead({ ...lead, phone: e.target.value })} />
              <select name="area_of_interest" className="input" onChange={(e) => setLead({ ...lead, area_of_interest: e.target.value })} defaultValue="">
                <option value="" disabled>Area of interest</option>
                <option>Chapel Hill</option>
                <option>Carrboro</option>
                <option>Durham</option>
                <option>Hillsborough</option>
                <option>Pittsboro</option>
                <option>Cary</option>
                <option>Raleigh</option>
                <option>Greater Triangle</option>
                <option>Not sure yet</option>
              </select>
              <select name="timeline" className="input" onChange={(e) => setLead({ ...lead, timeline: e.target.value })} defaultValue="">
                <option value="" disabled>Timeline</option>
                <option>Immediately</option>
                <option>1-3 months</option>
                <option>3-6 months</option>
                <option>6-12 months</option>
                <option>Just exploring</option>
              </select>
              <textarea name="question_notes" rows={3} placeholder="Questions or notes for Ashley (optional)" className="input" onChange={(e) => setLead({ ...lead, question_notes: e.target.value })} />
            </div>
            <button className="btn btn-primary mt-4 w-full">Connect with Ashley</button>
            {leadError && <p className="text-sm text-red-600 mt-2">Something went wrong. Please try again or contact Ashley directly.</p>}
          </form>
        )}
        {leadSent && (
          <div className="card text-center">
            <p className="font-serif text-xl text-navy">Sent. Ashley will reach out personally.</p>
            <p className="text-sm text-navy/70 mt-2">She typically responds within one business day.</p>
          </div>
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
        title="AI Real Estate Tools | Ashley Smith Realtor® Chapel Hill & Triangle"
        description="Guided real estate tools for Chapel Hill, Carrboro, Durham, Cary, Raleigh, and the greater Triangle. Explore buyer, seller, relocation, and luxury questions with Ashley's Guided Home Concierge."
        path="/ai-tools"
      />
      <section className="section">
        <div className="container-wide">
          <SectionHeader
            eyebrow="AI Tools"
            title="Refined intelligence, at your service"
            subtitle="Ashley's Guided Home Concierge covers common buyer, seller, relocation, and luxury questions across the Triangle. For personalized advice, connect with Ashley directly."
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
