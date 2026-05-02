import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import { logEvent, KEYS } from '../lib/store';

const TABS = [
  { id: 'schools', label: 'School Rating Search' },
  { id: 'direction', label: 'House Direction Finder' },
  { id: 'landmarks', label: 'Community Landmarks' },
  { id: 'compare', label: 'Neighborhood Compare' },
  { id: 'commute', label: 'Commute Time Finder' },
  { id: 'mortgage', label: 'Mortgage Calculator' },
  { id: 'valuation', label: 'Home Valuation' },
];

/* -------- TOOL 1: SCHOOL RATING SEARCH -------- */
function SchoolSearch() {
  const [results, setResults] = useState(null);
  const [data, setData] = useState({ address: '', type: 'All' });
  const onSubmit = (e) => {
    e.preventDefault();
    logEvent(KEYS.SCHOOLS, data);
    const mock = [
      { name: 'Chapel Hill Elementary', type: 'Elementary', rating: 9, distance: '0.6 mi', district: 'Chapel Hill–Carrboro CSD' },
      { name: 'Carrboro Middle School', type: 'Middle', rating: 8, distance: '1.2 mi', district: 'Chapel Hill–Carrboro CSD' },
      { name: 'East Chapel Hill High', type: 'High School', rating: 9, distance: '2.3 mi', district: 'Chapel Hill–Carrboro CSD' },
      { name: 'Triangle Magnet Academy', type: 'Magnet', rating: 10, distance: '3.4 mi', district: 'Magnet Network' },
    ].filter((s) => data.type === 'All' || s.type === data.type);
    setResults(mock);
  };
  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <form onSubmit={onSubmit} className="card lg:col-span-5">
        <h3 className="font-serif text-2xl text-navy mb-1">Find Schools Near a Home</h3>
        <p className="text-navy/70 text-sm mb-5">Enter an address or neighborhood to view nearby school ratings.</p>
        <div className="space-y-4">
          <div><label className="label">Address or neighborhood</label>
            <input className="input" required value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} placeholder="e.g. 100 Franklin St, Chapel Hill" />
          </div>
          <div><label className="label">School type</label>
            <select className="input" value={data.type} onChange={(e) => setData({ ...data, type: e.target.value })}>
              <option>All</option><option>Elementary</option><option>Middle</option><option>High School</option><option>Magnet</option>
            </select>
          </div>
          <div><label className="label">District (optional)</label>
            <input className="input" placeholder="District name" />
          </div>
        </div>
        <button className="btn btn-primary mt-5">Search Schools</button>
        <p className="text-[11px] text-taupe mt-3">Results are illustrative until live school-data integration is connected.</p>
      </form>
      <div className="lg:col-span-7">
        {results ? (
          <div className="space-y-3">
            {results.map((s, i) => (
              <div key={i} className="card flex items-center justify-between gap-4">
                <div>
                  <p className="font-serif text-xl text-navy">{s.name}</p>
                  <p className="text-xs text-taupe">{s.type} · {s.district} · {s.distance}</p>
                </div>
                <div className="text-right">
                  <p className="font-serif text-3xl text-gold">{s.rating}<span className="text-sm text-taupe">/10</span></p>
                  <p className="text-[10px] uppercase tracking-widewide text-taupe">Rating</p>
                </div>
              </div>
            ))}
            <div className="card bg-navy text-ivory">
              <p className="font-serif text-2xl">Found the right school district?</p>
              <p className="text-ivory/70 mt-1 text-sm">Let Ashley help you find homes nearby.</p>
              <a href="/contact" className="btn btn-gold mt-4">Connect with Ashley</a>
            </div>
          </div>
        ) : (
          <div className="card h-full flex items-center justify-center text-center text-navy/60">
            <p>Search above to view nearby schools and ratings.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------- TOOL 2: HOUSE DIRECTION FINDER -------- */
function DirectionFinder() {
  const [result, setResult] = useState(null);
  const [address, setAddress] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    logEvent(KEYS.DIRECTION, { address });
    const directions = ['North', 'South', 'East', 'West', 'Northeast', 'Southeast', 'Northwest', 'Southwest'];
    const dir = directions[Math.floor(Math.random() * directions.length)];
    setResult(dir);
  };
  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <form onSubmit={onSubmit} className="card lg:col-span-5">
        <h3 className="font-serif text-2xl text-navy mb-1">House Direction Finder</h3>
        <p className="text-navy/70 text-sm mb-5">Discover the directional orientation of a home — useful for natural light and outdoor spaces.</p>
        <label className="label">Property address</label>
        <input className="input" required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. 200 Carrboro Pl" />
        <button className="btn btn-primary mt-5">Find Direction</button>
      </form>
      <div className="lg:col-span-7">
        {result ? (
          <div className="card">
            <p className="eyebrow mb-2">Result</p>
            <p className="font-serif text-3xl text-navy">This home appears to face <span className="text-gold">{result}</span>.</p>
            <p className="text-xs text-taupe mt-2">Final directional data will require map/geocoding integration.</p>
            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              {[
                { t: 'Natural Light', d: 'South-facing homes enjoy bright, even daylight throughout the day.' },
                { t: 'Morning / Evening Sun', d: 'East-facing rooms get warm morning light; west-facing offer golden evenings.' },
                { t: 'Solar Considerations', d: 'Orientation affects rooftop solar potential and energy efficiency.' },
                { t: 'Feng Shui & Lifestyle', d: 'Some buyers prefer a specific orientation for personal or wellness reasons.' },
              ].map((c) => (
                <div key={c.t} className="p-4 bg-ivory rounded-xl border border-taupe/30">
                  <p className="font-serif text-lg text-navy">{c.t}</p>
                  <p className="text-sm text-navy/70 mt-1">{c.d}</p>
                </div>
              ))}
            </div>
            <a href="/contact" className="btn btn-primary mt-6">Schedule a Showing</a>
          </div>
        ) : (
          <div className="card h-full flex items-center justify-center text-navy/60 text-center">
            <p>Enter a property address to find its orientation.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------- TOOL 3: COMMUNITY LANDMARKS -------- */
function LandmarkFinder() {
  const [data, setData] = useState({ address: '', filter: 'All' });
  const [results, setResults] = useState(null);
  const filters = ['All', 'Parks', 'Medical', 'Grocery', 'Schools', 'Worship', 'Transit', 'Dining'];
  const onSubmit = (e) => {
    e.preventDefault();
    logEvent(KEYS.LANDMARKS, data);
    const mock = [
      { name: 'Carolina Coffee Shop', cat: 'Dining', dist: '0.4 mi', rating: 4.6 },
      { name: 'UNC Hospital', cat: 'Medical', dist: '0.9 mi', rating: 4.5 },
      { name: 'Weaver Street Market', cat: 'Grocery', dist: '1.1 mi', rating: 4.8 },
      { name: 'Carrboro Town Commons', cat: 'Parks', dist: '1.4 mi', rating: 4.7 },
      { name: 'Chapel Hill Public Library', cat: 'Schools', dist: '1.6 mi', rating: 4.6 },
      { name: 'NC 54 Bus Line', cat: 'Transit', dist: '0.3 mi', rating: 4.2 },
    ].filter((m) => data.filter === 'All' || m.cat === data.filter);
    setResults(mock);
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="card mb-6">
        <h3 className="font-serif text-2xl text-navy mb-1">Community Landmarks Finder</h3>
        <p className="text-navy/70 text-sm mb-5">Discover what surrounds a property — parks, dining, schools, transit, and more.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="label">Address</label>
            <input required className="input" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
          </div>
          <div><label className="label">Category</label>
            <select className="input" value={data.filter} onChange={(e) => setData({ ...data, filter: e.target.value })}>
              {filters.map((f) => <option key={f}>{f}</option>)}
            </select>
          </div>
        </div>
        <button className="btn btn-primary mt-5">Find Nearby</button>
      </form>
      {results && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((m, i) => (
            <div key={i} className="card">
              <span className="badge bg-gold/15 text-gold mb-3">{m.cat}</span>
              <p className="font-serif text-xl text-navy">{m.name}</p>
              <p className="text-xs text-taupe mt-1">{m.dist}</p>
              <p className="mt-3 text-navy/80 text-sm">★ {m.rating}</p>
            </div>
          ))}
          <div className="card bg-navy text-ivory">
            <p className="font-serif text-xl">Want to understand the lifestyle around this home?</p>
            <a href="/contact" className="btn btn-gold mt-4">Connect with Ashley</a>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------- TOOL 4: NEIGHBORHOOD COMPARE -------- */
const NEIGHBORHOOD_DATA = {
  'Chapel Hill': { price: '$725k', life: 'Historic, refined', commute: 'Excellent UNC access', school: 'Top-rated CHCCS', walk: 'High in core', luxury: 'Strong', fit: 'Families, faculty, downsizers', best: 'University-adjacent living' },
  'Carrboro': { price: '$615k', life: 'Eclectic, walkable', commute: 'Easy to UNC, moderate to RTP', school: 'Top-rated CHCCS', walk: 'Very high', luxury: 'Boutique', fit: 'Creatives, professionals', best: 'Independent character' },
  'Durham': { price: '$485k', life: 'Vibrant, creative', commute: 'Central to RTP', school: 'Mixed, expanding', walk: 'High downtown', luxury: 'Growing', fit: 'Innovators, food lovers', best: 'Culture-rich urban living' },
  'Cary': { price: '$650k', life: 'Polished, family-focused', commute: 'Strong RTP/Raleigh', school: 'Top-rated WCPSS', walk: 'Suburban', luxury: 'Significant', fit: 'Families, executives', best: 'Family neighborhoods' },
  'Raleigh': { price: '$540k', life: 'Capital city', commute: 'Strong regional', school: 'WCPSS varies', walk: 'High in pockets', luxury: 'Strong in select areas', fit: 'Move-up buyers, professionals', best: 'Urban variety' },
  'Hillsborough': { price: '$520k', life: 'Quiet, historic', commute: 'I-40 access', school: 'Orange County', walk: 'Storybook downtown', luxury: 'Quiet luxury', fit: 'Calm, scenic living', best: 'Riverside charm' },
  'Pittsboro': { price: '$510k', life: 'Rural, artistic', commute: 'Longer to UNC/RTP', school: 'Chatham County', walk: 'Low', luxury: 'Estate-style', fit: 'Privacy seekers', best: 'Equestrian & estate land' },
};

function NeighborhoodCompare() {
  const areas = Object.keys(NEIGHBORHOOD_DATA);
  const [a1, setA1] = useState('Chapel Hill');
  const [a2, setA2] = useState('Carrboro');
  const [show, setShow] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    logEvent(KEYS.COMPARE, { a1, a2 });
    setShow(true);
  };
  const cats = [
    ['price', 'Median price'], ['life', 'Lifestyle'], ['commute', 'Commute access'],
    ['school', 'School considerations'], ['walk', 'Walkability'], ['luxury', 'Luxury inventory'],
    ['fit', 'Buyer fit'], ['best', 'Best for'],
  ];
  return (
    <div>
      <form onSubmit={onSubmit} className="card mb-6">
        <h3 className="font-serif text-2xl text-navy mb-1">Neighborhood Compare</h3>
        <p className="text-navy/70 text-sm mb-5">Place two Triangle areas side-by-side across lifestyle, schools, and luxury inventory.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="label">Area 1</label>
            <select className="input" value={a1} onChange={(e) => setA1(e.target.value)}>{areas.map((a) => <option key={a}>{a}</option>)}</select>
          </div>
          <div><label className="label">Area 2</label>
            <select className="input" value={a2} onChange={(e) => setA2(e.target.value)}>{areas.map((a) => <option key={a}>{a}</option>)}</select>
          </div>
        </div>
        <button className="btn btn-primary mt-5">Compare Neighborhoods</button>
      </form>
      {show && (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-3 text-taupe text-xs uppercase tracking-widewide">Category</th>
                <th className="py-3 font-serif text-2xl text-navy">{a1}</th>
                <th className="py-3 font-serif text-2xl text-navy">{a2}</th>
              </tr>
            </thead>
            <tbody>
              {cats.map(([k, label]) => (
                <tr key={k} className="border-t border-taupe/30">
                  <td className="py-4 text-xs uppercase tracking-widewide text-taupe">{label}</td>
                  <td className="py-4 text-navy/80 align-top">{NEIGHBORHOOD_DATA[a1][k]}</td>
                  <td className="py-4 text-navy/80 align-top">{NEIGHBORHOOD_DATA[a2][k]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <a href="/contact" className="btn btn-primary mt-6">Talk Through Your Options With Ashley</a>
        </div>
      )}
    </div>
  );
}

/* -------- TOOL 5: COMMUTE TIME FINDER -------- */
function CommuteFinder() {
  const [data, setData] = useState({ origin: '', dest: '', mode: 'Driving', depart: 'Leave now' });
  const [result, setResult] = useState(null);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [lead, setLead] = useState({});

  const calculate = (e) => {
    e.preventDefault();
    // Mock: distance + per-mode rate, with variance for departure window.
    const baseDistance = 6 + Math.random() * 16; // 6–22 miles
    const rates = { Driving: 1.7, Walking: 18, Biking: 5.5, Transit: 3.2 };
    const traffic = data.depart === 'Morning commute' || data.depart === 'Evening commute' ? 1.25 : 1.0;
    const minutes = Math.round(baseDistance * (rates[data.mode] || 1.7) * traffic);
    const distance = baseDistance.toFixed(1);
    const payload = {
      ...data,
      estimated_minutes: minutes,
      estimated_distance_miles: distance,
    };
    logEvent(KEYS.COMMUTE, payload);
    setResult(payload);
  };

  const submitLead = (e) => {
    e.preventDefault();
    logEvent(KEYS.COMMUTE, { lead: true, ...lead, origin: data.origin, dest: data.dest });
    setLeadSubmitted(true);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <form onSubmit={calculate} className="card lg:col-span-5">
        <h3 className="font-serif text-2xl text-navy mb-1">Commute Time Finder</h3>
        <p className="text-navy/70 text-sm mb-5">Estimate the commute between two Triangle addresses — invaluable for relocation, UNC, Duke, and RTP buyers.</p>
        <div className="space-y-4">
          <div><label className="label">Starting address</label>
            <input required className="input" value={data.origin} onChange={(e) => setData({ ...data, origin: e.target.value })} placeholder="Home address" />
          </div>
          <div><label className="label">Destination address</label>
            <input required className="input" value={data.dest} onChange={(e) => setData({ ...data, dest: e.target.value })} placeholder="Work, school, hospital" />
          </div>
          <div><label className="label">Travel mode</label>
            <select className="input" value={data.mode} onChange={(e) => setData({ ...data, mode: e.target.value })}>
              <option>Driving</option><option>Walking</option><option>Biking</option><option>Transit</option>
            </select>
          </div>
          <div><label className="label">Departure time (optional)</label>
            <select className="input" value={data.depart} onChange={(e) => setData({ ...data, depart: e.target.value })}>
              <option>Leave now</option><option>Morning commute</option><option>Afternoon commute</option><option>Evening commute</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary mt-5">Calculate Commute</button>
      </form>

      <div className="lg:col-span-7 space-y-6">
        {result ? (
          <>
            <div className="card bg-navy text-ivory">
              <p className="eyebrow text-gold mb-2">Estimate</p>
              <p className="font-serif text-5xl">
                {result.estimated_minutes} <span className="text-2xl text-ivory/70">minutes by {result.mode.toLowerCase()}</span>
              </p>
              <p className="mt-2 text-ivory/80">Approximate distance: <span className="font-medium">{result.estimated_distance_miles} miles</span></p>
              <div className="grid sm:grid-cols-2 gap-3 mt-6 text-sm">
                <div className="p-4 rounded-xl bg-ivory/5 border border-ivory/10">
                  <p className="text-[10px] uppercase tracking-widewide text-gold mb-1">From</p>
                  <p className="text-ivory/90">{result.origin}</p>
                </div>
                <div className="p-4 rounded-xl bg-ivory/5 border border-ivory/10">
                  <p className="text-[10px] uppercase tracking-widewide text-gold mb-1">To</p>
                  <p className="text-ivory/90">{result.dest}</p>
                </div>
                <div className="p-4 rounded-xl bg-ivory/5 border border-ivory/10">
                  <p className="text-[10px] uppercase tracking-widewide text-gold mb-1">Departure</p>
                  <p className="text-ivory/90">{result.depart}</p>
                </div>
                <div className="p-4 rounded-xl bg-ivory/5 border border-ivory/10">
                  <p className="text-[10px] uppercase tracking-widewide text-gold mb-1">Suggested Route</p>
                  <p className="text-ivory/90">[Live route map pending API integration]</p>
                </div>
              </div>
              <p className="text-[11px] text-ivory/60 mt-5">
                Commute estimate requires live map integration for real-time traffic. Real-time
                traffic data will require future Google Maps, Mapbox, or similar Directions API integration.
              </p>
            </div>

            <div className="card">
              <p className="font-serif text-xl text-navy">Why commute time matters</p>
              <p className="mt-2 text-navy/70 leading-relaxed">
                Commute time can completely change which area feels right. Ashley can help you compare
                Chapel Hill, Carrboro, Durham, Cary, Raleigh, Hillsborough, and Pittsboro based on your
                work, school, lifestyle, and daily routine.
              </p>
              <a href="/properties" className="btn btn-primary mt-5">Find Homes That Fit Your Commute</a>
            </div>

            {!leadSubmitted ? (
              <form onSubmit={submitLead} className="card">
                <p className="font-serif text-2xl text-navy">Want Ashley to plan around this commute?</p>
                <p className="text-navy/70 mt-1 text-sm">Share a few details and Ashley will build a tailored list.</p>
                <div className="grid sm:grid-cols-2 gap-4 mt-5">
                  <div><label className="label">Name</label><input required className="input" onChange={(e) => setLead({ ...lead, name: e.target.value })} /></div>
                  <div><label className="label">Email</label><input required type="email" className="input" onChange={(e) => setLead({ ...lead, email: e.target.value })} /></div>
                  <div><label className="label">Phone (optional)</label><input className="input" onChange={(e) => setLead({ ...lead, phone: e.target.value })} /></div>
                  <div><label className="label">Ideal commute time</label><input className="input" placeholder="e.g. under 25 min" onChange={(e) => setLead({ ...lead, ideal_time: e.target.value })} /></div>
                  <div className="sm:col-span-2"><label className="label">Work / school destination</label><input className="input" onChange={(e) => setLead({ ...lead, destination: e.target.value })} /></div>
                  <div className="sm:col-span-2"><label className="label">Preferred areas</label><input className="input" placeholder="e.g. Chapel Hill, Carrboro" onChange={(e) => setLead({ ...lead, preferred_areas: e.target.value })} /></div>
                  <div className="sm:col-span-2"><label className="label">Notes</label><textarea rows={3} className="input" onChange={(e) => setLead({ ...lead, notes: e.target.value })} /></div>
                </div>
                <button className="btn btn-primary mt-5">Send to Ashley</button>
              </form>
            ) : (
              <div className="card text-center py-10">
                <p className="font-serif text-2xl text-navy">Sent — Ashley will follow up personally.</p>
              </div>
            )}
          </>
        ) : (
          <div className="card h-full flex items-center justify-center text-center text-navy/60 min-h-[260px]">
            <div>
              <p className="font-serif text-2xl text-navy mb-2">Estimate a Triangle commute</p>
              <p>Enter two addresses to see an estimated commute, distance, and suggested route placeholder.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------- TOOL 6: MORTGAGE CALCULATOR -------- */
function MortgageCalc() {
  const [v, setV] = useState({ price: 750000, down: 150000, rate: 6.5, term: 30, tax: 6500, ins: 1800, hoa: 0 });
  const onChange = (e) => setV({ ...v, [e.target.name]: parseFloat(e.target.value) || 0 });

  const principal = Math.max(v.price - v.down, 0);
  const monthlyRate = v.rate / 100 / 12;
  const n = v.term * 12;
  const pi = monthlyRate === 0 ? principal / n : principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  const taxes = v.tax / 12;
  const insurance = v.ins / 12;
  const hoa = v.hoa / 12;
  const total = pi + taxes + insurance + hoa;
  const fmt = (n) => isFinite(n) ? n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : '—';

  useEffect(() => { logEvent(KEYS.MORTGAGE, v); /* eslint-disable-next-line */ }, []);

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="card lg:col-span-7">
        <h3 className="font-serif text-2xl text-navy mb-5">Mortgage Calculator</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            ['price', 'Home price', '$'],
            ['down', 'Down payment', '$'],
            ['rate', 'Interest rate', '%'],
            ['term', 'Loan term (years)', ''],
            ['tax', 'Property tax / year', '$'],
            ['ins', 'Insurance / year', '$'],
            ['hoa', 'HOA / year', '$'],
          ].map(([key, label, prefix]) => (
            <div key={key}>
              <label className="label">{label} {prefix && <span className="text-taupe">({prefix})</span>}</label>
              <input name={key} type="number" className="input" value={v[key]} onChange={onChange} />
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-5">
        <div className="card bg-navy text-ivory">
          <p className="eyebrow text-gold mb-2">Estimated Monthly Payment</p>
          <p className="font-serif text-5xl">{fmt(total)}</p>
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between border-b border-ivory/10 py-2"><span className="text-ivory/70">Principal & Interest</span><span>{fmt(pi)}</span></div>
            <div className="flex justify-between border-b border-ivory/10 py-2"><span className="text-ivory/70">Taxes</span><span>{fmt(taxes)}</span></div>
            <div className="flex justify-between border-b border-ivory/10 py-2"><span className="text-ivory/70">Insurance</span><span>{fmt(insurance)}</span></div>
            <div className="flex justify-between py-2"><span className="text-ivory/70">HOA</span><span>{fmt(hoa)}</span></div>
          </div>
          <p className="text-[11px] text-ivory/60 mt-4">For general planning only — not financial or lending advice.</p>
          <a href="/contact" className="btn btn-gold mt-5">Get Connected With a Trusted Lender</a>
        </div>
      </div>
    </div>
  );
}

/* -------- TOOL 7: HOME VALUATION -------- */
function HomeValuation() {
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({});
  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const onSubmit = (e) => { e.preventDefault(); logEvent(KEYS.VALUATION, data); setSubmitted(true); };
  if (submitted) return (
    <div className="card text-center py-12">
      <p className="font-serif text-3xl text-navy">Thank you — your valuation request is in.</p>
      <p className="text-navy/70 mt-2">Ashley will personally prepare your tailored estimate within one business day.</p>
    </div>
  );
  return (
    <form onSubmit={onSubmit} className="card max-w-2xl mx-auto">
      <h3 className="font-serif text-2xl text-navy">Request My Home Valuation</h3>
      <p className="text-navy/70 mt-1">A thoughtful, hand-prepared estimate from Ashley — not a generic algorithm.</p>
      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <div><label className="label">Name</label><input name="name" required className="input" onChange={onChange} /></div>
        <div><label className="label">Email</label><input name="email" required type="email" className="input" onChange={onChange} /></div>
        <div><label className="label">Phone</label><input name="phone" className="input" onChange={onChange} /></div>
        <div><label className="label">Property address</label><input name="address" required className="input" onChange={onChange} /></div>
        <div><label className="label">Property condition</label>
          <select name="condition" className="input" onChange={onChange}>
            <option value="">Select</option><option>Excellent</option><option>Good</option><option>Average</option><option>Needs work</option>
          </select>
        </div>
        <div><label className="label">Timeline to sell</label>
          <select name="timeline" className="input" onChange={onChange}>
            <option value="">Select</option><option>Immediately</option><option>1–3 months</option><option>3–6 months</option><option>6–12 months</option><option>Just curious</option>
          </select>
        </div>
        <div className="sm:col-span-2"><label className="label">Notes</label><textarea name="notes" rows={3} className="input" onChange={onChange} /></div>
      </div>
      <button className="btn btn-primary mt-6">Request My Home Valuation</button>
    </form>
  );
}

/* -------- PAGE -------- */
export default function BuyerTools() {
  const router = useRouter();
  const [tab, setTab] = useState('schools');

  useEffect(() => {
    if (router.query.tab && TABS.some((t) => t.id === router.query.tab)) {
      setTab(router.query.tab);
    }
  }, [router.query.tab]);

  return (
    <>
      <SEO
        title="Buyer Tools for Chapel Hill & Triangle Real Estate | Ashley Smith"
        description="Interactive buyer tools for Chapel Hill, Carrboro, Durham, Cary, and Raleigh — including school ratings, neighborhood comparison, commute time finder, mortgage calculator, and home valuation. Powered by Ashley Smith, Realtor® with Compass North Carolina."
        path="/buyer-tools"
      />

      <section className="section">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Buyer Tools"
            title="Polished tools for thoughtful buyers"
            subtitle="Search schools, study commutes, compare neighborhoods, and run financial scenarios — all in one calm workspace."
          />

          <div className="overflow-x-auto no-scrollbar mb-8">
            <div className="flex gap-2 border-b border-taupe/30 min-w-max">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 transition ${
                    tab === t.id
                      ? 'border-gold text-navy font-medium'
                      : 'border-transparent text-navy/60 hover:text-navy'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {tab === 'schools' && <SchoolSearch />}
          {tab === 'direction' && <DirectionFinder />}
          {tab === 'landmarks' && <LandmarkFinder />}
          {tab === 'compare' && <NeighborhoodCompare />}
          {tab === 'commute' && <CommuteFinder />}
          {tab === 'mortgage' && <MortgageCalc />}
          {tab === 'valuation' && <HomeValuation />}
        </div>
      </section>
    </>
  );
}
