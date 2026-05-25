import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import { logEvent, KEYS } from '../lib/store';

const TABS = [
  { id: 'schools', label: 'School Rating Search' },
  { id: 'direction', label: 'House Direction Finder' },
  { id: 'landmarks', label: 'Community Landmarks' },
  { id: 'compare', label: 'Area & Neighborhood Comparison' },
  { id: 'commute', label: 'Commute Time Finder' },
  { id: 'mortgage', label: 'Mortgage Calculator' },
  { id: 'valuation', label: 'Home Valuation' },
];

/* -------- TOOL 1: SCHOOL RATING SEARCH -------- */
function SchoolSearch() {
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
        logEvent(KEYS.SCHOOLS, data);
        setSubmitted(true);
      })
      .catch(() => {
        setError('We could not submit your request right now. Please try again.');
      });
  };

  if (submitted) return (
    <div className="card text-center py-12">
      <p className="font-serif text-3xl text-navy">Thanks. Your school-priority request has been sent.</p>
      <p className="text-navy/70 mt-3 max-w-xl mx-auto">Ashley can help you evaluate homes and neighborhoods based on your school needs, commute, lifestyle, and timeline.</p>
      <a href="/contact" className="btn btn-primary mt-6">Connect with Ashley</a>
    </div>
  );

  return (
    <form
      name="school-search"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="card max-w-2xl mx-auto"
    >
      <input type="hidden" name="form-name" value="school-search" />
      <input type="hidden" name="page_name" value="buyer-tools-schools" />
      <input type="hidden" name="form_type" value="school-search-request" />
      <input type="hidden" name="lead_source" value="website-buyer-tools" />
      <input type="hidden" name="client_name" value="Ashley Smith" />
      <p className="hidden"><label>Don&apos;t fill this out: <input name="bot-field" onChange={onChange} /></label></p>

      <h3 className="font-serif text-2xl text-navy mb-1">School Priority Search</h3>
      <p className="text-navy/70 text-sm mb-5">Search by address, city, ZIP code, neighborhood, or district anywhere in the U.S. Ashley can help you understand how school priorities fit into your home search.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="label">Address, city, ZIP, neighborhood, or school district</label>
          <input name="location" required className="input" onChange={onChange} placeholder="e.g. 27514, Chapel Hill, Cary, or any U.S. location" />
        </div>
        <div>
          <label className="label">State</label>
          <input name="state" className="input" onChange={onChange} placeholder="e.g. North Carolina" />
        </div>
        <div>
          <label className="label">School level</label>
          <select name="school_level" className="input" onChange={onChange}>
            <option value="Any">Any</option>
            <option value="Elementary">Elementary</option>
            <option value="Middle">Middle</option>
            <option value="High School">High School</option>
            <option value="Private">Private</option>
            <option value="Charter">Charter</option>
            <option value="Magnet">Magnet</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label">Preferred district or school, if any</label>
          <input name="preferred_district" className="input" onChange={onChange} placeholder="e.g. Chapel Hill-Carrboro City Schools" />
        </div>
        <div>
          <label className="label">Buyer timeline</label>
          <select name="timeline" className="input" onChange={onChange}>
            <option value="">Select</option>
            <option>Immediately</option>
            <option>1–3 months</option>
            <option>3–6 months</option>
            <option>6–12 months</option>
            <option>Just exploring</option>
          </select>
        </div>
        <div>
          <label className="label">Name</label>
          <input name="name" required className="input" onChange={onChange} />
        </div>
        <div>
          <label className="label">Email</label>
          <input name="email" required type="email" className="input" onChange={onChange} />
        </div>
        <div>
          <label className="label">Phone</label>
          <input name="phone" className="input" onChange={onChange} />
        </div>
        <div className="sm:col-span-2">
          <label className="label">Notes</label>
          <textarea name="notes" rows={3} className="input" onChange={onChange} placeholder="Anything Ashley should know about your school priorities or move" />
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-6">Send School Priorities to Ashley</button>
      {error && <p className="text-sm text-red-700 mt-4">{error}</p>}
      <p className="text-[11px] text-taupe mt-4">Live school ratings require a school data integration such as GreatSchools, NCES, or another approved source. Until that is connected, this tool captures your priorities so Ashley can help guide the search personally.</p>
    </form>
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
                <div key={c.t} className="p-4 bg-ivory rounded-xl border border-navy/10">
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
        <div>
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
          <p className="text-[11px] text-taupe mt-4">Sample landmarks shown for illustration only. Distances, ratings, and categories are not live data. Verified local information will require a map or places integration.</p>
        </div>
      )}
    </div>
  );
}

/* -------- TOOL 4: AREA & NEIGHBORHOOD COMPARISON -------- */
// Sample planning data — qualitative descriptors and price-band placeholders
// only. Numeric ranges are illustrative and not live market data.

const CITY_DATA = {
  'Chapel Hill': {
    price: '$$$ — premium band',
    life: 'Historic, refined, university-anchored',
    buyer: 'Faculty, medical professionals, established families, downsizers',
    commute: 'Excellent UNC access; 25–40 min to RTP/Durham depending on route',
    school: 'Chapel Hill–Carrboro City Schools (CHCCS), strongly rated',
    walk: 'High walkability in Franklin St core and Meadowmont; suburban elsewhere',
    luxury: 'Strong luxury inventory in Governors Club, The Oaks, Morgan Creek',
    best: 'Buyers seeking university-adjacent prestige and top schools; UNC-related moves; luxury and downsizer clients',
  },
  'Carrboro': {
    price: '$$–$$$ — mid to premium',
    life: 'Eclectic, walkable, artistic, independent-spirit',
    buyer: 'Creatives, dual-income professionals, UNC affiliates wanting walkability',
    commute: 'Easy to UNC and downtown Chapel Hill; moderate to RTP',
    school: 'Chapel Hill–Carrboro City Schools (CHCCS)',
    walk: 'Very high — one of the most walkable towns in NC',
    luxury: 'Boutique luxury; smaller estates, custom builds in Lake Hogan Farms',
    best: 'Buyers who want character and walkability over square footage; relocation buyers seeking community feel',
  },
  'Durham': {
    price: '$$ — accessible to mid',
    life: 'Vibrant, creative, food-forward, rapidly evolving',
    buyer: 'Innovators, Duke affiliates, young professionals, investors',
    commute: 'Most central to RTP; quick to Duke; 20–30 min to UNC',
    school: 'Durham Public Schools (mixed) plus strong magnet and private options',
    walk: 'High downtown and around Duke; suburban in outer neighborhoods',
    luxury: 'Growing — Hope Valley, Treyburn, Croasdaile Farm anchor luxury tier',
    best: 'Duke-related moves; investors; buyers prioritizing culture and food scene',
  },
  'Cary': {
    price: '$$$ — premium suburban',
    life: 'Polished, family-focused, master-planned',
    buyer: 'Families, executives, transplants from major metros',
    commute: 'Strong access to RTP, Raleigh, and RDU airport',
    school: 'Wake County Public Schools (WCPSS), strongly rated in Cary',
    walk: 'Generally suburban; Preston and downtown Cary have walkable pockets',
    luxury: 'Significant — Preston, MacGregor Downs, Lochmere, Amberly luxury tier',
    best: 'Relocation families; executive-track buyers; commute to RTP/Raleigh',
  },
  'Raleigh': {
    price: '$$–$$$ — wide range by submarket',
    life: 'Capital city — urban variety, neighborhoods range historic to new',
    buyer: 'Move-up buyers, professionals, state government workforce, investors',
    commute: 'Strong regional access; varies widely by neighborhood',
    school: 'Wake County Public Schools (WCPSS); base assignment varies',
    walk: 'High in Five Points, North Hills, and Inside the Beltline pockets',
    luxury: 'Strong in Hayes Barton, ITB, and select North Raleigh enclaves',
    best: 'Buyers wanting urban variety; downtown professionals; investors',
  },
  'Hillsborough': {
    price: '$$ — mid-range',
    life: 'Quiet, historic, riverside, small-town pace',
    buyer: 'Calm-living seekers, creatives, retirees, hybrid commuters',
    commute: 'I-40 / I-85 access; 20–30 min to Chapel Hill, 25–35 to Durham',
    school: 'Orange County Schools',
    walk: 'Charming, walkable historic downtown; suburban elsewhere',
    luxury: 'Quiet luxury — estate lots and waterfront in Waterstone and Forest Ridge',
    best: 'Buyers who want pace and history; downsizers; hybrid-remote professionals',
  },
  'Pittsboro / Chatham County': {
    price: '$$ — mid-range, with luxury pockets',
    life: 'Rural-artistic with master-planned enclaves; Chatham Park reshaping the area',
    buyer: 'Privacy seekers, Briar Chapel/Fearrington families, equestrian buyers',
    commute: 'Longer to UNC and RTP; growing infrastructure with Chatham Park',
    school: 'Chatham County Schools',
    walk: 'Low overall; high inside Briar Chapel and Fearrington Village',
    luxury: 'Estate-style; Governors Club edge, custom builds, gated communities',
    best: 'Buyers wanting land, privacy, or planned-community living away from city pace',
  },
};

const NEIGHBORHOOD_DATA = {
  // ---- Chapel Hill ----
  'Meadowmont (Chapel Hill)': { price: '$$$', life: 'New-urbanist, walkable village core', buyer: 'Downsizers, professionals, UNC families', commute: 'Excellent to UNC and I-40', school: 'CHCCS — Rashkis Elementary feeder', walk: 'Very high — sidewalks, town center, trails', luxury: 'Premium townhomes and custom singles', best: 'Walkable luxury close to UNC/Hospital' },
  'Southern Village (Chapel Hill)': { price: '$$$', life: 'Master-planned village with town green and cinema', buyer: 'Families, dual-career professionals', commute: 'Easy to UNC; moderate to RTP', school: 'CHCCS — Scroggs Elementary', walk: 'High — walkable village center', luxury: 'Custom homes on the perimeter', best: 'Family-friendly walkability' },
  'Governors Club (Chapel Hill)': { price: '$$$$', life: 'Gated, golf-course estates', buyer: 'Luxury buyers, executives, downsizers wanting amenities', commute: 'Moderate to UNC; longer to RTP', school: 'Chatham County Schools', walk: 'Low — golf-cart oriented', luxury: 'Top-tier luxury inventory', best: 'Luxury buyers wanting privacy and amenities' },
  'The Oaks (Chapel Hill)': { price: '$$$$', life: 'Established, wooded, country-club adjacent', buyer: 'Established families, faculty, downsizers', commute: 'Excellent to UNC', school: 'CHCCS', walk: 'Moderate', luxury: 'Strong — mid-century and custom estates', best: 'Classic Chapel Hill prestige' },
  'Lake Forest (Chapel Hill)': { price: '$$$', life: 'Mature trees, ranch and split-level architecture', buyer: 'Faculty, downsizers, renovation buyers', commute: 'Excellent to UNC', school: 'CHCCS', walk: 'Moderate', luxury: 'Renovated mid-century homes', best: 'Buyers who love mid-century character' },
  'Briar Chapel (Chapel Hill / Chatham)': { price: '$$$', life: 'Master-planned, amenity-rich, family-focused', buyer: 'Relocation families, growing households', commute: 'Moderate to UNC; longer to RTP', school: 'Chatham County Schools', walk: 'High inside community', luxury: 'Builder-luxury and custom estates', best: 'Relocation families wanting amenities' },
  'Fearrington Village (Chapel Hill / Pittsboro)': { price: '$$$$', life: 'Storybook English village with inn, restaurants, and farm setting', buyer: 'Downsizers, retirees, second-home buyers', commute: 'Longer to UNC/RTP', school: 'Chatham County Schools', walk: 'High inside village', luxury: 'Distinctive luxury — custom and patio homes', best: 'Downsizers seeking charm and amenity' },
  'Winmore (Chapel Hill / Carrboro)': { price: '$$$', life: 'Walkable pocket community with mixed-use core', buyer: 'Professionals, small families', commute: 'Easy to UNC and Carrboro', school: 'CHCCS', walk: 'High inside community', luxury: 'Custom singles and townhomes', best: 'Walkable lifestyle close to Carrboro' },
  'Downing Creek (Chapel Hill)': { price: '$$$', life: 'Quiet, wooded, established cul-de-sacs', buyer: 'Families, professionals', commute: 'Easy to I-40 and RTP', school: 'CHCCS', walk: 'Low to moderate', luxury: 'Move-up tier, well-built singles', best: 'Easy commute and CHCCS schools' },
  'Claremont (Chapel Hill)': { price: '$$$', life: 'Newer-build, master-planned feel', buyer: 'Families, relocation buyers', commute: 'Moderate to UNC and RTP', school: 'CHCCS', walk: 'Low', luxury: 'Builder-luxury inventory', best: 'Newer construction in CHCCS' },
  'Coker Hills (Chapel Hill)': { price: '$$$', life: 'Wooded, established, university adjacent', buyer: 'Faculty, established families', commute: 'Excellent to UNC', school: 'CHCCS', walk: 'Moderate', luxury: 'Renovated and custom singles', best: 'Walk-to-UNC lifestyle with mature trees' },
  'North Forest Hills (Chapel Hill)': { price: '$$$', life: 'Mid-century, wooded, walk to Eastgate', buyer: 'Faculty, professionals', commute: 'Excellent to UNC', school: 'CHCCS', walk: 'Moderate to high', luxury: 'Renovated mid-century inventory', best: 'Classic Chapel Hill character close in' },
  'Morgan Creek (Chapel Hill)': { price: '$$$$', life: 'Wooded estates near Finley Golf Course', buyer: 'Luxury buyers, faculty, downsizers', commute: 'Excellent to UNC', school: 'CHCCS', walk: 'Low', luxury: 'High — custom estate inventory', best: 'Luxury wooded living near campus' },
  'Westfall (Chapel Hill)': { price: '$$$', life: 'Quieter community with custom builds', buyer: 'Move-up families', commute: 'Moderate to UNC and RTP', school: 'CHCCS', walk: 'Low', luxury: 'Builder-luxury', best: 'Newer custom homes in CHCCS' },
  'Legend Oaks (Chapel Hill)': { price: '$$$', life: 'Established, well-built singles', buyer: 'Families, professionals', commute: 'Moderate to UNC', school: 'CHCCS', walk: 'Low', luxury: 'Move-up tier', best: 'Established CHCCS family living' },
  // ---- Carrboro ----
  'Winmore (Carrboro)': { price: '$$$', life: 'Walkable, mixed-use master plan', buyer: 'Professionals, small families', commute: 'Easy to UNC and Carrboro', school: 'CHCCS', walk: 'High inside community', luxury: 'Custom singles and townhomes', best: 'Walkable Carrboro-edge community' },
  'Claremont South (Carrboro)': { price: '$$$', life: 'Newer-build pocket', buyer: 'Families, relocation buyers', commute: 'Easy to UNC', school: 'CHCCS', walk: 'Low to moderate', luxury: 'Builder-luxury', best: 'Newer construction in CHCCS' },
  'Berryhill (Carrboro)': { price: '$$$', life: 'Well-built singles in established setting', buyer: 'Families, downsizers', commute: 'Easy to UNC and Carrboro', school: 'CHCCS', walk: 'Moderate', luxury: 'Custom and renovated singles', best: 'Quiet established Carrboro feel' },
  'Bolin Forest (Carrboro)': { price: '$$$', life: 'Wooded, creekside, mid-century', buyer: 'Creatives, professionals, faculty', commute: 'Easy to UNC and Carrboro', school: 'CHCCS', walk: 'Moderate', luxury: 'Renovated mid-century', best: 'Buyers who want trees, trails, and character' },
  'Old Carrboro (Carrboro)': { price: '$$$', life: 'Historic walkable bungalows close to downtown', buyer: 'Creatives, professionals, walk-everywhere buyers', commute: 'Walk/bike to UNC; easy to Carrboro core', school: 'CHCCS', walk: 'Very high', luxury: 'Renovated historic inventory', best: 'True walkable in-town living' },
  'Lake Hogan Farms (Carrboro)': { price: '$$$$', life: 'Larger lots, custom builds, near community lake', buyer: 'Move-up and luxury families', commute: 'Easy to UNC; moderate to RTP', school: 'CHCCS', walk: 'Low', luxury: 'Custom and luxury inventory', best: 'Larger-home Carrboro luxury' },
  // ---- Durham ----
  'Hope Valley (Durham)': { price: '$$$$', life: 'Historic, country-club, mature canopy', buyer: 'Established families, executives, Duke faculty', commute: 'Excellent to Duke; good to RTP', school: 'Durham Public Schools / private options', walk: 'Low', luxury: 'High — historic estates and custom builds', best: 'Duke-affiliated luxury buyers' },
  'Trinity Park (Durham)': { price: '$$$', life: 'Historic walkable district near Duke East Campus', buyer: 'Duke affiliates, professionals, urbanists', commute: 'Walk/bike to Duke East; easy to downtown', school: 'Durham Public Schools', walk: 'Very high', luxury: 'Renovated historic inventory', best: 'Walk-to-Duke historic living' },
  'Woodcroft (Durham)': { price: '$$', life: 'Established master-planned with pools and trails', buyer: 'Families, dual-career professionals', commute: 'Strong RTP and Duke access', school: 'Durham Public Schools', walk: 'Moderate inside community', luxury: 'Move-up tier', best: 'Family commuter sweet spot' },
  'Treyburn (Durham)': { price: '$$$$', life: 'Gated golf-course estates, lakeside parcels', buyer: 'Luxury buyers, downsizers seeking amenity', commute: 'Longer to RTP and Duke', school: 'Durham Public Schools', walk: 'Low', luxury: 'High — large estates and custom builds', best: 'Luxury buyers wanting golf and privacy' },
  'Croasdaile Farm (Durham)': { price: '$$$', life: 'Master-planned, country-club anchored', buyer: 'Families, downsizers, Duke faculty', commute: 'Easy to Duke; moderate to RTP', school: 'Durham Public Schools', walk: 'Moderate inside community', luxury: 'Strong — custom and luxury patio homes', best: 'Duke-adjacent amenity living' },
  'Southpoint (Durham)': { price: '$$', life: 'Convenient suburban, retail-anchored', buyer: 'Families, relocation buyers, RTP commuters', commute: 'Excellent RTP and Chapel Hill access', school: 'Durham Public Schools', walk: 'Low', luxury: 'Builder-luxury subdivisions', best: 'Newer-build RTP commuter living' },
  'Forest Hills (Durham)': { price: '$$$', life: 'Tree-lined historic district near downtown', buyer: 'Professionals, creatives, Duke affiliates', commute: 'Easy to Duke and downtown', school: 'Durham Public Schools', walk: 'Moderate to high', luxury: 'Renovated historic singles', best: 'Historic in-town Durham living' },
  'Duke Park (Durham)': { price: '$$', life: 'Walkable, eclectic, near downtown and Duke', buyer: 'Creatives, urbanists, first-time buyers', commute: 'Easy to Duke and downtown', school: 'Durham Public Schools', walk: 'High', luxury: 'Renovated bungalows', best: 'Urbanist buyers wanting Durham character' },
  'Watts-Hillandale (Durham)': { price: '$$', life: 'Historic, walkable, near 9th Street', buyer: 'Duke affiliates, professionals, urbanists', commute: 'Easy to Duke and downtown', school: 'Durham Public Schools', walk: 'High', luxury: 'Renovated historic homes', best: 'Walk-to-Duke historic charm' },
  // ---- Cary ----
  'Preston (Cary)': { price: '$$$$', life: 'Master-planned, country-club anchored', buyer: 'Executives, established families', commute: 'Strong RTP and Raleigh access', school: 'Wake County Public Schools', walk: 'Low to moderate', luxury: 'High — estates and custom builds', best: 'Cary luxury executive living' },
  'Lochmere (Cary)': { price: '$$$', life: 'Established, wooded, lake and golf amenities', buyer: 'Families, downsizers', commute: 'Strong RTP and Raleigh access', school: 'Wake County Public Schools', walk: 'Moderate', luxury: 'Custom and luxury patio homes', best: 'Amenity-rich established Cary' },
  'MacGregor Downs (Cary)': { price: '$$$$', life: 'Country-club, mature canopy, custom estates', buyer: 'Executives, established families', commute: 'Strong RTP and Raleigh access', school: 'Wake County Public Schools', walk: 'Low', luxury: 'High — custom estate inventory', best: 'Classic Cary luxury' },
  'Amberly (Cary)': { price: '$$$', life: 'Newer master-planned, amenity-rich', buyer: 'Relocation families, growing households', commute: 'Strong RTP access; longer to Raleigh', school: 'Wake County Public Schools', walk: 'High inside community', luxury: 'Builder-luxury and custom inventory', best: 'Newer-build relocation families' },
  'Carpenter Village (Cary)': { price: '$$$', life: 'Walkable village core with town green', buyer: 'Families, professionals', commute: 'Strong RTP access', school: 'Wake County Public Schools', walk: 'High', luxury: 'Move-up to luxury inventory', best: 'Walkable family living in Cary' },
  'Regency (Cary)': { price: '$$$', life: 'Established, well-built singles', buyer: 'Families, downsizers', commute: 'Strong RTP and Raleigh access', school: 'Wake County Public Schools', walk: 'Low', luxury: 'Move-up tier', best: 'Established WCPSS family living' },
  'West Cary (Cary)': { price: '$$$', life: 'Newer growth corridor with strong schools', buyer: 'Relocation families, RTP professionals', commute: 'Strong RTP access; longer to Raleigh', school: 'Wake County Public Schools', walk: 'Low', luxury: 'Builder-luxury and custom', best: 'Newer-build RTP commuter families' },
  // ---- Raleigh ----
  'North Hills (Raleigh)': { price: '$$$', life: 'Mixed-use, walkable midtown core', buyer: 'Professionals, downsizers, urbanists', commute: 'Strong access throughout Raleigh and to RTP', school: 'Wake County Public Schools', walk: 'High in core', luxury: 'High — luxury condos and custom singles', best: 'Walkable midtown Raleigh living' },
  'Five Points (Raleigh)': { price: '$$$', life: 'Historic, walkable, character-rich', buyer: 'Professionals, creatives, families wanting walkability', commute: 'Easy to downtown Raleigh', school: 'Wake County Public Schools', walk: 'Very high', luxury: 'Renovated historic inventory', best: 'Historic in-town Raleigh' },
  'Hayes Barton (Raleigh)': { price: '$$$$', life: 'Prestige historic ITB neighborhood', buyer: 'Established families, executives', commute: 'Easy to downtown Raleigh', school: 'Wake County Public Schools', walk: 'High', luxury: 'Top-tier — historic estates', best: 'Classic ITB prestige' },
  'Oakwood (Raleigh)': { price: '$$$', life: 'Historic district adjacent to downtown', buyer: 'Urbanists, preservation-minded buyers', commute: 'Walk to downtown Raleigh', school: 'Wake County Public Schools', walk: 'Very high', luxury: 'Restored historic homes', best: 'Downtown-adjacent historic living' },
  'Brier Creek (Raleigh)': { price: '$$', life: 'Suburban, retail-anchored, near RDU', buyer: 'Frequent flyers, RTP professionals, relocation buyers', commute: 'Excellent to RTP and RDU', school: 'Wake County Public Schools', walk: 'Low to moderate', luxury: 'Builder-luxury inventory', best: 'Convenience-driven RTP/airport commuters' },
  'Wakefield (Raleigh)': { price: '$$', life: 'Master-planned, golf and family-focused', buyer: 'Families, dual-career commuters', commute: 'Longer to RTP; convenient to North Raleigh', school: 'Wake County Public Schools', walk: 'Low to moderate', luxury: 'Move-up to luxury inventory', best: 'North Raleigh family living' },
  'Bedford (Raleigh)': { price: '$$', life: 'Newer master-planned, family-focused', buyer: 'Relocation families', commute: 'Longer to RTP', school: 'Wake County Public Schools', walk: 'Moderate inside community', luxury: 'Builder-luxury inventory', best: 'Newer-build value family living' },
  'Boylan Heights (Raleigh)': { price: '$$$', life: 'Historic, artistic, walkable to downtown', buyer: 'Creatives, urbanists, downtown professionals', commute: 'Walk/bike to downtown Raleigh', school: 'Wake County Public Schools', walk: 'Very high', luxury: 'Renovated historic homes', best: 'Walkable downtown Raleigh character' },
  'Cameron Village / Village District (Raleigh)': { price: '$$$', life: 'Walkable village core with shops and dining', buyer: 'Professionals, downsizers, urbanists', commute: 'Easy to downtown Raleigh', school: 'Wake County Public Schools', walk: 'Very high', luxury: 'Luxury condos and historic singles', best: 'Walkable urban-village living' },
  'Inside the Beltline (ITB) (Raleigh)': { price: '$$$$', life: 'Established prestige enclaves close to downtown', buyer: 'Established families, executives, downsizers', commute: 'Easy to downtown Raleigh', school: 'Wake County Public Schools', walk: 'Varies — high in pockets', luxury: 'Top-tier — broad luxury inventory', best: 'Classic Raleigh prestige' },
  // ---- Hillsborough ----
  'Waterstone (Hillsborough)': { price: '$$', life: 'Master-planned, lake and trail amenities', buyer: 'Families, hybrid commuters', commute: 'I-40 access to Chapel Hill and Durham', school: 'Orange County Schools', walk: 'High inside community', luxury: 'Builder-luxury and custom singles', best: 'Hillsborough family commuter living' },
  'Churton Grove (Hillsborough)': { price: '$$', life: 'Established, well-built singles', buyer: 'Families, downsizers', commute: 'I-40 access', school: 'Orange County Schools', walk: 'Low to moderate', luxury: 'Move-up tier', best: 'Established Hillsborough living' },
  'Historic Hillsborough (Hillsborough)': { price: '$$', life: 'Historic walkable downtown, riverside', buyer: 'Creatives, downsizers, hybrid professionals', commute: 'I-40 / I-85 access', school: 'Orange County Schools', walk: 'High in downtown', luxury: 'Renovated historic homes', best: 'Historic riverside small-town living' },
  'Forest Ridge (Hillsborough)': { price: '$$', life: 'Wooded, custom-build communities', buyer: 'Families, custom-build buyers', commute: 'I-40 / I-85 access', school: 'Orange County Schools', walk: 'Low', luxury: 'Custom inventory', best: 'Custom-home Hillsborough' },
  'Cornwallis Hills (Hillsborough)': { price: '$$', life: 'Established, family-focused', buyer: 'Families, downsizers', commute: 'I-40 / I-85 access', school: 'Orange County Schools', walk: 'Low', luxury: 'Move-up tier', best: 'Quiet established family living' },
  // ---- Pittsboro / Chatham ----
  'Briar Chapel (Chatham)': { price: '$$$', life: 'Master-planned, amenity-rich', buyer: 'Relocation families, growing households', commute: 'Moderate to UNC; longer to RTP', school: 'Chatham County Schools', walk: 'High inside community', luxury: 'Builder-luxury and custom estates', best: 'Relocation families wanting amenities' },
  'Fearrington Village (Chatham)': { price: '$$$$', life: 'Storybook English village', buyer: 'Downsizers, retirees, second-home buyers', commute: 'Longer to UNC/RTP', school: 'Chatham County Schools', walk: 'High inside village', luxury: 'Distinctive luxury — custom and patio homes', best: 'Downsizers seeking charm and amenity' },
  'Chapel Ridge (Chatham)': { price: '$$', life: 'Golf-anchored, family master plan', buyer: 'Families, retirees', commute: 'Longer to UNC/RTP', school: 'Chatham County Schools', walk: 'Moderate inside community', luxury: 'Builder-luxury inventory', best: 'Value-oriented master-planned living' },
  'Governors Club Area (Chatham)': { price: '$$$$', life: 'Gated golf estates and surrounding wooded enclaves', buyer: 'Luxury buyers, executives, downsizers', commute: 'Moderate to UNC; longer to RTP', school: 'Chatham County Schools', walk: 'Low', luxury: 'Top-tier luxury inventory', best: 'Luxury private living' },
  'Chatham Park (Chatham)': { price: 'TBD — new development', life: 'Emerging master-planned community reshaping Pittsboro', buyer: 'Early adopters, relocation buyers, investors', commute: 'Longer to UNC/RTP today; infrastructure expanding', school: 'Chatham County Schools', walk: 'Low; pockets emerging', luxury: 'New-build inventory expanding', best: 'Forward-looking new-construction buyers' },
};

// Group neighborhoods by city for the dropdown.
const NEIGHBORHOOD_GROUPS = [
  { city: 'Chapel Hill', items: [
    'Meadowmont (Chapel Hill)',
    'Southern Village (Chapel Hill)',
    'Governors Club (Chapel Hill)',
    'The Oaks (Chapel Hill)',
    'Lake Forest (Chapel Hill)',
    'Briar Chapel (Chapel Hill / Chatham)',
    'Fearrington Village (Chapel Hill / Pittsboro)',
    'Winmore (Chapel Hill / Carrboro)',
    'Downing Creek (Chapel Hill)',
    'Claremont (Chapel Hill)',
    'Coker Hills (Chapel Hill)',
    'North Forest Hills (Chapel Hill)',
    'Morgan Creek (Chapel Hill)',
    'Westfall (Chapel Hill)',
    'Legend Oaks (Chapel Hill)',
  ] },
  { city: 'Carrboro', items: [
    'Winmore (Carrboro)',
    'Claremont South (Carrboro)',
    'Berryhill (Carrboro)',
    'Bolin Forest (Carrboro)',
    'Old Carrboro (Carrboro)',
    'Lake Hogan Farms (Carrboro)',
  ] },
  { city: 'Durham', items: [
    'Hope Valley (Durham)',
    'Trinity Park (Durham)',
    'Woodcroft (Durham)',
    'Treyburn (Durham)',
    'Croasdaile Farm (Durham)',
    'Southpoint (Durham)',
    'Forest Hills (Durham)',
    'Duke Park (Durham)',
    'Watts-Hillandale (Durham)',
  ] },
  { city: 'Cary', items: [
    'Preston (Cary)',
    'Lochmere (Cary)',
    'MacGregor Downs (Cary)',
    'Amberly (Cary)',
    'Carpenter Village (Cary)',
    'Regency (Cary)',
    'West Cary (Cary)',
  ] },
  { city: 'Raleigh', items: [
    'North Hills (Raleigh)',
    'Five Points (Raleigh)',
    'Hayes Barton (Raleigh)',
    'Oakwood (Raleigh)',
    'Brier Creek (Raleigh)',
    'Wakefield (Raleigh)',
    'Bedford (Raleigh)',
    'Boylan Heights (Raleigh)',
    'Cameron Village / Village District (Raleigh)',
    'Inside the Beltline (ITB) (Raleigh)',
  ] },
  { city: 'Hillsborough', items: [
    'Waterstone (Hillsborough)',
    'Churton Grove (Hillsborough)',
    'Historic Hillsborough (Hillsborough)',
    'Forest Ridge (Hillsborough)',
    'Cornwallis Hills (Hillsborough)',
  ] },
  { city: 'Pittsboro / Chatham County', items: [
    'Briar Chapel (Chatham)',
    'Fearrington Village (Chatham)',
    'Chapel Ridge (Chatham)',
    'Governors Club Area (Chatham)',
    'Chatham Park (Chatham)',
  ] },
];

const COMPARE_CATEGORIES = [
  ['price', 'Price point'],
  ['life', 'Lifestyle fit'],
  ['buyer', 'Typical buyer profile'],
  ['commute', 'Commute considerations'],
  ['school', 'Schools'],
  ['walk', 'Walkability / lifestyle'],
  ['luxury', 'Luxury inventory'],
  ['best', 'Best fit for'],
];

function ComparisonTable({ a1, a2, dataset }) {
  return (
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
          {COMPARE_CATEGORIES.map(([k, label]) => (
            <tr key={k} className="border-t border-navy/10">
              <td className="py-4 text-xs uppercase tracking-widewide text-taupe align-top">{label}</td>
              <td className="py-4 text-navy/80 align-top">{dataset[a1]?.[k] || '—'}</td>
              <td className="py-4 text-navy/80 align-top">{dataset[a2]?.[k] || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[11px] text-taupe mt-4">
        Sample planning data — qualitative descriptors and price-band placeholders only, not live market data.
        Price bands ($$ to $$$$) reflect general positioning within the Triangle and are illustrative.
      </p>
      <a href="/contact" className="btn btn-primary mt-4">Talk Through Your Options With Ashley</a>
    </div>
  );
}

function NeighborhoodCompare() {
  const [mode, setMode] = useState('cities'); // 'cities' | 'neighborhoods'

  const cityList = Object.keys(CITY_DATA);
  const [c1, setC1] = useState(cityList[0]);
  const [c2, setC2] = useState(cityList[1]);
  const [showCity, setShowCity] = useState(false);

  const allNeighborhoods = NEIGHBORHOOD_GROUPS.flatMap((g) => g.items);
  const [n1, setN1] = useState(allNeighborhoods[0]);
  const [n2, setN2] = useState(allNeighborhoods[1]);
  const [showN, setShowN] = useState(false);

  const submitCity = (e) => {
    e.preventDefault();
    logEvent(KEYS.COMPARE, { type: 'city', a1: c1, a2: c2 });
    setShowCity(true);
  };
  const submitN = (e) => {
    e.preventDefault();
    logEvent(KEYS.COMPARE, { type: 'neighborhood', a1: n1, a2: n2 });
    setShowN(true);
  };

  return (
    <div>
      <div className="card mb-6">
        <h3 className="font-serif text-2xl text-navy mb-1">Area & Neighborhood Comparison</h3>
        <p className="text-navy/70 text-sm">
          Compare two cities/markets or two specific neighborhoods side-by-side across lifestyle, schools,
          commute considerations, walkability, and luxury inventory.
        </p>
        <div className="mt-5 flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setMode('cities')}
            className={`px-4 py-2 rounded-full text-sm border transition ${
              mode === 'cities' ? 'bg-navy text-ivory border-navy' : 'bg-ivory text-navy border-taupe/40 hover:border-navy'
            }`}
          >
            Compare Cities / Markets
          </button>
          <button
            type="button"
            onClick={() => setMode('neighborhoods')}
            className={`px-4 py-2 rounded-full text-sm border transition ${
              mode === 'neighborhoods' ? 'bg-navy text-ivory border-navy' : 'bg-ivory text-navy border-taupe/40 hover:border-navy'
            }`}
          >
            Compare Neighborhoods / Communities
          </button>
        </div>
      </div>

      {mode === 'cities' ? (
        <>
          <form onSubmit={submitCity} className="card mb-6">
            <p className="eyebrow mb-3">Cities & Markets</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">City / market 1</label>
                <select className="input" value={c1} onChange={(e) => setC1(e.target.value)}>
                  {cityList.map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="label">City / market 2</label>
                <select className="input" value={c2} onChange={(e) => setC2(e.target.value)}>
                  {cityList.map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>
            </div>
            <button className="btn btn-primary mt-5">Compare Cities</button>
          </form>
          {showCity && <ComparisonTable a1={c1} a2={c2} dataset={CITY_DATA} />}
        </>
      ) : (
        <>
          <form onSubmit={submitN} className="card mb-6">
            <p className="eyebrow mb-3">Neighborhoods & Communities</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Neighborhood 1</label>
                <select className="input" value={n1} onChange={(e) => setN1(e.target.value)}>
                  {NEIGHBORHOOD_GROUPS.map((g) => (
                    <optgroup key={g.city} label={g.city}>
                      {g.items.map((n) => <option key={n} value={n}>{n}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Neighborhood 2</label>
                <select className="input" value={n2} onChange={(e) => setN2(e.target.value)}>
                  {NEIGHBORHOOD_GROUPS.map((g) => (
                    <optgroup key={g.city} label={g.city}>
                      {g.items.map((n) => <option key={n} value={n}>{n}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>
            <button className="btn btn-primary mt-5">Compare Neighborhoods</button>
          </form>
          {showN && <ComparisonTable a1={n1} a2={n2} dataset={NEIGHBORHOOD_DATA} />}
        </>
      )}
    </div>
  );
}

/* -------- TOOL 5: COMMUTE TIME FINDER -------- */

function CommuteFinder() {
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
      .then((res) => {
        if (!res.ok) throw new Error('Submission failed');
        logEvent(KEYS.COMMUTE, { lead: true, ...data });
        setSubmitted(true);
      })
      .catch(() => setError('Something went wrong. Please try again or contact Ashley directly.'));
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center py-12">
          <p className="font-serif text-2xl text-navy mb-4">Your commute-priority request has been sent.</p>
          <p className="text-navy/80 leading-relaxed">
            Ashley can help you compare Chapel Hill, Carrboro, Durham, Raleigh, Cary, Hillsborough,
            Pittsboro, and surrounding Triangle communities based on your daily routine, commute,
            lifestyle, and home search goals.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <form onSubmit={onSubmit} className="card lg:col-span-7">
        <input type="hidden" name="form-name" value="commute-time" />
        <input type="hidden" name="page_name" value="buyer-tools" />
        <input type="hidden" name="form_type" value="commute-priority-intake" />
        <input type="hidden" name="lead_source" value="Commute Time Finder" />
        <input type="hidden" name="client_name" value="Ashley Smith" />
        <p className="hidden"><label>Don&#8217;t fill this out: <input name="bot-field" /></label></p>

        <h3 className="font-serif text-2xl text-navy mb-1">Commute Time Finder</h3>
        <p className="text-navy/70 text-sm mb-5">
          Tell Ashley about your commute priorities and she will help you find the right area
          in the Triangle based on your daily routine, workplace, and lifestyle.
        </p>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="space-y-4">
          <div><label className="label">Starting address</label>
            <input name="origin" required className="input" onChange={onChange} placeholder="Home address or current location" />
          </div>
          <div><label className="label">Destination address</label>
            <input name="destination" required className="input" onChange={onChange} placeholder="Work, school, hospital" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="label">Travel mode</label>
              <select name="travel_mode" className="input" onChange={onChange}>
                <option value="Driving">Driving</option>
                <option value="Walking">Walking</option>
                <option value="Biking">Biking</option>
                <option value="Transit">Transit</option>
              </select>
            </div>
            <div><label className="label">Departure timing</label>
              <select name="departure_timing" className="input" onChange={onChange}>
                <option value="Morning commute">Morning commute</option>
                <option value="Afternoon commute">Afternoon commute</option>
                <option value="Evening commute">Evening commute</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>
          <div><label className="label">Ideal maximum commute time</label>
            <input name="ideal_max_commute" className="input" onChange={onChange} placeholder="e.g. under 25 minutes" />
          </div>
          <div><label className="label">Preferred areas</label>
            <input name="preferred_areas" className="input" onChange={onChange} placeholder="e.g. Chapel Hill, Carrboro, Durham" />
          </div>
          <hr className="border-taupe/20 my-2" />
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="label">Name</label>
              <input name="name" required className="input" onChange={onChange} />
            </div>
            <div><label className="label">Email</label>
              <input name="email" required type="email" className="input" onChange={onChange} />
            </div>
          </div>
          <div><label className="label">Phone (optional)</label>
            <input name="phone" className="input" onChange={onChange} />
          </div>
          <div><label className="label">Notes (optional)</label>
            <textarea name="notes" rows={3} className="input" onChange={onChange} placeholder="Anything else Ashley should know about your commute needs" />
          </div>
        </div>
        <button className="btn btn-primary mt-5">Send Commute Priorities to Ashley</button>
      </form>

      <div className="lg:col-span-5 space-y-6">
        <div className="card">
          <p className="font-serif text-xl text-navy">Why commute time matters</p>
          <p className="mt-2 text-navy/70 leading-relaxed">
            Commute time can completely change which area feels right. Ashley can help you compare
            Chapel Hill, Carrboro, Durham, Cary, Raleigh, Hillsborough, and Pittsboro based on your
            work, school, lifestyle, and daily routine.
          </p>
          <a href="/properties" className="btn btn-primary mt-5">Explore Properties</a>
        </div>

        <div className="card border border-gold/30 bg-gold/5">
          <p className="eyebrow text-gold mb-2">About this tool</p>
          <p className="text-navy/80 text-sm leading-relaxed">
            Real-time commute estimates require live map/directions integration, such as Google Maps
            Routes API or a similar routing service. Until that is connected, this tool captures your
            commute priorities so Ashley can help guide the search personally.
          </p>
        </div>
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

  if (submitted) return (
    <div className="card text-center py-12">
      <p className="font-serif text-3xl text-navy">Thank you — your valuation request is in.</p>
      <p className="text-navy/70 mt-2">Ashley will personally prepare your tailored estimate within one business day.</p>
    </div>
  );
  return (
    <form
      name="home-valuation"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="card max-w-2xl mx-auto"
    >
      <input type="hidden" name="form-name" value="home-valuation" />
      <input type="hidden" name="page_name" value="buyer-tools-valuation" />
      <input type="hidden" name="form_type" value="home-valuation-request" />
      <input type="hidden" name="lead_source" value="website-buyer-tools" />
      <input type="hidden" name="client_name" value="Ashley Smith" />
      <p className="hidden"><label>Don&apos;t fill this out: <input name="bot-field" onChange={onChange} /></label></p>

      <h3 className="font-serif text-2xl text-navy">Request My Home Valuation</h3>
      <p className="text-navy/70 mt-1">A thoughtful, hand-prepared estimate from Ashley — not a generic algorithm.</p>
      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <div><label className="label">Name</label><input name="name" required className="input" onChange={onChange} /></div>
        <div><label className="label">Email</label><input name="email" required type="email" className="input" onChange={onChange} /></div>
        <div><label className="label">Phone</label><input name="phone" className="input" onChange={onChange} /></div>
        <div><label className="label">Property address</label><input name="address" required className="input" onChange={onChange} /></div>
        <div><label className="label">Property type</label>
          <select name="property_type" className="input" onChange={onChange}>
            <option value="">Select</option><option>Single Family</option><option>Townhouse</option><option>Condo</option><option>Multi-Family</option><option>Land / Lot</option><option>Other</option>
          </select>
        </div>
        <div><label className="label">Beds / Baths</label><input name="beds_baths" className="input" onChange={onChange} placeholder="e.g. 3 bed / 2 bath" /></div>
        <div><label className="label">Approximate square footage</label><input name="sqft" className="input" onChange={onChange} placeholder="e.g. 2,200" /></div>
        <div><label className="label">Property condition</label>
          <select name="condition" className="input" onChange={onChange}>
            <option value="">Select</option><option>Excellent</option><option>Good</option><option>Average</option><option>Needs work</option>
          </select>
        </div>
        <div className="sm:col-span-2"><label className="label">Updates or renovations made</label><input name="updates" className="input" onChange={onChange} placeholder="e.g. new kitchen, roof replaced 2023" /></div>
        <div><label className="label">Timeline to sell</label>
          <select name="timeline" className="input" onChange={onChange}>
            <option value="">Select</option><option>Immediately</option><option>1–3 months</option><option>3–6 months</option><option>6–12 months</option><option>Just curious</option>
          </select>
        </div>
        <div><label className="label">Desired price, if known</label><input name="desired_price" className="input" onChange={onChange} placeholder="Optional" /></div>
        <div className="sm:col-span-2"><label className="label">Notes</label><textarea name="notes" rows={3} className="input" onChange={onChange} /></div>
      </div>
      <button type="submit" className="btn btn-primary mt-6">Request My Home Valuation</button>
      {error && <p className="text-sm text-red-700 mt-4">{error}</p>}
      <p className="text-[11px] text-taupe mt-4">
        Any home valuation request is for general informational purposes only and is not an appraisal, CMA, broker price opinion, or guarantee of market value. Information provided through website tools is for general guidance only and should be independently verified.
      </p>
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

          <div className="mb-8 border-b border-navy/10">
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-3 sm:px-4 py-3 text-sm whitespace-nowrap border-b-2 -mb-px transition ${
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
          <div className="card bg-warmwhite border border-navy/10 mt-8">
            <p className="font-serif text-2xl text-navy">Relocating to the Triangle?</p>
            <p className="text-sm text-navy/70 mt-2">Not sure where to start? Compare Chapel Hill, Carrboro, Durham, Hillsborough, Pittsboro, Cary, and Raleigh based on lifestyle, priorities, commute, and local fit.</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a href="/relocation-quiz" className="btn btn-primary">Take the Relocation Quiz</a>
              <a href="/triangle-community-guide" className="btn btn-outline">View the Triangle Community Guide</a>
            </div>
            <p className="text-[11px] text-taupe mt-4">Information provided through website tools is for general guidance only and should be independently verified. Any home valuation request is for general informational purposes only and is not an appraisal, CMA, broker price opinion, or guarantee of market value.</p>
          </div>
        </div>
      </section>
    </>
  );
}
