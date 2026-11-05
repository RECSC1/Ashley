/*
 * PROPERTIES DATA — the single source for /properties and the homepage
 * "Listings & Recent Sales" section.
 *
 * HOW TO ADD OR UPDATE A PROPERTY
 * 1. Put the photo in /public/images/properties/ (landscape, ~1600px wide JPG).
 *    Only use photos Ashley owns or has written permission to use. Never use
 *    Zillow, Redfin, MLS, or building-website photos.
 * 2. Add an object to PROPERTIES below. Any field set to null hides cleanly.
 *
 * STATUS RULES
 * - status: 'listing' (Ashley's current or upcoming listing) or 'sold'.
 * - publishFrom: 'YYYY-MM-DD'. A listing stays hidden until this date
 *   (Eastern time). Set it to the day the home is allowed to be marketed
 *   publicly (Compass Coming Soon date or MLS date). null = hidden.
 *   This protects Ashley from publicly marketing a Private Exclusive early.
 * - activeFrom: 'YYYY-MM-DD'. Before this date the card says "Coming Soon",
 *   on or after it says "Active". null = "Coming Soon".
 * - When a listing sells or comes off the market, change it to status 'sold'
 *   (or delete it). Sold homes do not need publishFrom.
 *
 * The pages rebuild hourly (ISR), so dated changes go live on their own.
 */

export const PROPERTIES = [
  // ---------- CURRENT & UPCOMING LISTINGS ----------
  {
    id: '4315-chimney-stone-rd',
    status: 'listing',
    publishFrom: '2026-10-27',
    activeFrom: '2026-10-27',
    street: '4315 Chimney Stone Rd',
    city: 'Durham',
    state: 'NC',
    homeType: 'Single Family Home',
    price: 315000,
    beds: 3,
    baths: 3,
    sqft: 1398,
    acres: null,
    role: 'Listed by Ashley',
    photo: '/images/properties/4315-chimney-stone-rd-durham.jpg',
    photoAlt: 'Two-story white home with black shutters and a red maple at 4315 Chimney Stone Rd, Durham, NC',
    note: null,
  },
  {
    id: '107-presque-isle-ln',
    status: 'listing',
    publishFrom: '2026-11-06',
    activeFrom: '2026-11-09',
    street: '107 Presque Isle Ln',
    city: 'Chapel Hill',
    state: 'NC',
    homeType: 'Townhome',
    price: null,
    beds: 2,
    baths: 3,
    sqft: 1740,
    acres: null,
    role: 'Listed by Ashley',
    photo: '/images/properties/107-presque-isle-ln-chapel-hill.jpg',
    photoAlt: 'Craftsman-style townhome with a covered front porch at 107 Presque Isle Ln, Chapel Hill, NC',
    note: null,
  },
  {
    id: '416-lafayette-dr',
    status: 'listing',
    publishFrom: '2026-11-12',
    activeFrom: '2026-11-13',
    street: '416 Lafayette Dr',
    city: 'Hillsborough',
    state: 'NC',
    homeType: 'Single Family Home',
    price: null,
    beds: 3,
    baths: 3,
    sqft: 1394,
    acres: null,
    role: 'Listed by Ashley',
    photo: '/images/properties/416-lafayette-dr-hillsborough.jpg',
    photoAlt: 'Yellow Cape Cod home on a wooded lot at 416 Lafayette Dr, Hillsborough, NC',
    note: null,
  },
  {
    // HIDDEN: Compass Coming Soon date TBD. Set publishFrom when Ashley confirms.
    // Needs Ashley's own photo; the building-website photo can't be used.
    id: '140-e-franklin-st',
    status: 'listing',
    publishFrom: null,
    activeFrom: null,
    street: '140 E Franklin St',
    city: 'Chapel Hill',
    state: 'NC',
    homeType: 'Luxury Condo',
    price: null,
    beds: 2,
    baths: 3,
    sqft: 1399,
    acres: null,
    role: 'Listed by Ashley',
    photo: null,
    photoAlt: 'Luxury condominium at 140 E Franklin St, Chapel Hill, NC',
    note: null,
  },
  {
    // HIDDEN: Coming Soon date TBD. Set publishFrom when Ashley confirms.
    id: '0-trailwood-rd',
    status: 'listing',
    publishFrom: null,
    activeFrom: null,
    street: '0 Trailwood Rd',
    city: 'Raleigh',
    state: 'NC',
    homeType: 'Land',
    price: null,
    beds: null,
    baths: null,
    sqft: null,
    acres: '~7',
    role: 'Listed by Ashley',
    photo: '/images/properties/0-trailwood-rd-raleigh.jpg',
    photoAlt: 'Aerial view of approximately 7 acres at 0 Trailwood Rd, Raleigh, NC, outlined in orange',
    note:
      'About 7 acres inside the Beltline backing to NC State, with two homesites. Preliminary annexation and City of Raleigh development approval for 100+ condo and townhome units.',
  },

  // ---------- RECENTLY SOLD ----------
  {
    id: '1113-umstead-grove-way',
    status: 'sold',
    closeDate: '2026-09',
    street: '1113 Umstead Grove Way',
    city: 'Durham',
    state: 'NC',
    homeType: 'Single Family Home',
    price: 485000,
    beds: 4,
    baths: 3,
    sqft: 2569,
    acres: null,
    role: 'Represented the Buyer',
    photo: '/images/properties/1113-umstead-grove-way-durham.jpg',
    photoAlt: 'Blue and white two-story home with a teal front door at 1113 Umstead Grove Way, Durham, NC',
    note:
      'Four years in the making. Ashley met this family in her first year in real estate and stayed with them as their plans changed. When they were ready, she negotiated $10,000 off the list price and got almost all of their closing costs covered.',
  },
  {
    id: '6801-oak-ridge-dr',
    status: 'sold',
    closeDate: '2026-07',
    street: '6801 Oak Ridge Dr',
    city: 'Raleigh',
    state: 'NC',
    homeType: 'Single Family Home',
    price: 580000,
    beds: 4,
    baths: 3,
    sqft: 2378,
    acres: null,
    role: 'Represented the Buyer',
    photo: '/images/properties/6801-oak-ridge-dr-raleigh.jpg',
    photoAlt: 'Green two-story home framed by blooming redbud trees at 6801 Oak Ridge Dr, Raleigh, NC',
    note:
      'Repeat clients, second purchase together. Ashley found a home that checked their very specific list, negotiated $9,000 off the price, and had the seller cover more than half of their closing costs.',
  },
  {
    id: '202-purefoy-rd',
    status: 'sold',
    closeDate: '2026-07',
    street: '202 Purefoy Rd',
    city: 'Chapel Hill',
    state: 'NC',
    homeType: 'Single Family Home',
    price: 285000,
    beds: 1,
    baths: 1,
    sqft: 719,
    acres: null,
    role: 'Represented the Seller',
    photo: '/images/properties/202-purefoy-rd-chapel-hill.jpg',
    photoAlt: 'Blue A-frame home with a screened porch and wooded deck at 202 Purefoy Rd, Chapel Hill, NC',
    note:
      'A one-of-a-kind A-frame with a smaller buyer pool, listed right as the market shifted. Ashley reset pricing with the sellers using live market data, paired it with targeted marketing, and got it to the closing table.',
  },
];

/* ---------- helpers ---------- */

// Today's date as YYYY-MM-DD in Eastern time.
export function todayEastern(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function formatCloseDate(ym) {
  if (!ym) return null;
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export function formatPrice(n) {
  if (n == null) return null;
  return `$${n.toLocaleString('en-US')}`;
}

/*
 * Returns { listings, sold } with only what is allowed to show today.
 * Each listing gets a computed `badge` of "Active" or "Coming Soon".
 * Output is plain JSON so it can be passed through getStaticProps.
 */
export function getVisibleProperties(today = todayEastern()) {
  const listings = PROPERTIES.filter(
    (p) => p.status === 'listing' && p.publishFrom && p.publishFrom <= today
  )
    .map((p) => ({ ...p, badge: p.activeFrom && p.activeFrom <= today ? 'Active' : 'Coming Soon' }))
    // Active first, then Coming Soon by go-live date
    .sort((a, b) => {
      if (a.badge !== b.badge) return a.badge === 'Active' ? -1 : 1;
      return (a.activeFrom || '9999').localeCompare(b.activeFrom || '9999');
    });

  const sold = PROPERTIES.filter((p) => p.status === 'sold')
    .map((p) => ({ ...p, badge: 'Sold' }))
    .sort((a, b) => (b.closeDate || '').localeCompare(a.closeDate || ''));

  return JSON.parse(JSON.stringify({ listings, sold }));
}
