/*
 * INTERNAL LINKING MAP
 * Drives the "Keep Exploring" section that Layout renders at the bottom of
 * each page. Combined with links already in each page's body, every core
 * page has 8 to 10 contextual links out and 8+ links in (audited Nov 2026).
 *
 * When you add a new page or post: add it to CATALOG, add it to 3+ other
 * pages' lists below, and give it its own list of related links.
 */

export const CATALOG = {
  '/': { title: 'Ashley Smith, Chapel Hill Realtor®', blurb: 'Where to start: how Ashley helps buyers, sellers, and relocating families.' },
  '/about': { title: 'Meet Ashley', blurb: 'Chapel Hill native, UNC alum, and a relationship-first approach to real estate.' },
  '/properties': { title: 'Listings & Recent Sales', blurb: "Ashley's current listings, what's coming soon, and homes she recently closed." },
  '/buyer-tools': { title: 'Buyer Tools', blurb: 'Schools, commutes, area comparisons, and a mortgage calculator in one place.' },
  '/ai-tools': { title: 'AI Home Search Tools', blurb: 'Smart tools that help you narrow down where to live in the Triangle.' },
  '/resources': { title: 'Guides & Market Updates', blurb: "Ashley's library of buyer, seller, and relocation resources." },
  '/blog': { title: 'The Blog', blurb: 'Plain-English answers to the questions Triangle buyers and sellers ask most.' },
  '/neighborhoods': { title: 'Chapel Hill Neighborhood Guides', blurb: 'In-depth guides to the communities Ashley knows street by street.' },
  '/triangle-community-guide': { title: 'Triangle Community Guide', blurb: 'Chapel Hill, Durham, Raleigh, Cary, and more compared side by side.' },
  '/home-value': { title: "What's My Home Worth?", blurb: 'Request a personal home value review from Ashley, not an algorithm.' },
  '/relocation-quiz': { title: 'Relocation Quiz', blurb: 'Answer a few questions and find the Triangle towns that fit your life.' },
  '/contact': { title: 'Schedule a Consultation', blurb: 'A no-pressure conversation about your move, your timeline, and your goals.' },
  '/blog/chapel-hill-housing-market-2026': { title: 'Chapel Hill Housing Market 2026', blurb: 'Prices, inventory, and days on market, and what they mean for your move.' },
  '/blog/what-is-my-chapel-hill-home-worth-2026': { title: 'What Is My Chapel Hill Home Worth in 2026?', blurb: 'Why online estimates miss and what actually drives value here.' },
  '/blog/unc-parking-cost-where-to-live-chapel-hill': { title: 'What UNC Parking Actually Costs', blurb: 'How where you live changes your parking bill and your commute.' },
  '/blog/nc-due-diligence-fee-chapel-hill-buyers': { title: 'The NC Due Diligence Fee, Explained', blurb: 'The non-refundable fee every North Carolina buyer needs to understand.' },
  '/neighborhoods/southern-village-chapel-hill': { title: 'Southern Village Guide', blurb: 'Walkable village living south of downtown, close to campus.' },
  '/neighborhoods/meadowmont-chapel-hill': { title: 'Meadowmont Guide', blurb: 'East Chapel Hill planned community with fast access to Durham and RTP.' },
  '/neighborhoods/briar-chapel-chapel-hill': { title: 'Briar Chapel Guide', blurb: 'Chatham County amenities, trails, and what the address really means.' },
};

export const PAGE_LINKS = {
  '/': ['/neighborhoods/meadowmont-chapel-hill', '/neighborhoods/briar-chapel-chapel-hill', '/ai-tools'],
  '/about': ['/properties', '/neighborhoods', '/neighborhoods/briar-chapel-chapel-hill', '/blog', '/blog/unc-parking-cost-where-to-live-chapel-hill', '/resources', '/ai-tools', '/'],
  '/properties': ['/about', '/neighborhoods', '/buyer-tools', '/ai-tools', '/blog', '/resources', '/'],
  '/buyer-tools': ['/blog/nc-due-diligence-fee-chapel-hill-buyers', '/ai-tools', '/home-value', '/resources', '/blog', '/about', '/'],
  '/ai-tools': ['/buyer-tools', '/triangle-community-guide', '/neighborhoods', '/blog/nc-due-diligence-fee-chapel-hill-buyers', '/resources', '/blog', '/about', '/'],
  '/resources': ['/neighborhoods', '/about', '/'],
  '/blog': ['/neighborhoods/southern-village-chapel-hill', '/neighborhoods/meadowmont-chapel-hill', '/resources', '/ai-tools', '/about'],
  '/neighborhoods': ['/blog/unc-parking-cost-where-to-live-chapel-hill', '/blog/what-is-my-chapel-hill-home-worth-2026', '/ai-tools', '/resources', '/blog'],
  '/triangle-community-guide': ['/blog/unc-parking-cost-where-to-live-chapel-hill', '/blog/nc-due-diligence-fee-chapel-hill-buyers', '/ai-tools', '/resources', '/blog', '/about'],
  '/home-value': ['/blog/what-is-my-chapel-hill-home-worth-2026', '/blog/chapel-hill-housing-market-2026', '/neighborhoods/meadowmont-chapel-hill', '/blog/nc-due-diligence-fee-chapel-hill-buyers', '/triangle-community-guide', '/resources', '/blog', '/'],
  '/relocation-quiz': ['/triangle-community-guide', '/neighborhoods/southern-village-chapel-hill', '/blog/unc-parking-cost-where-to-live-chapel-hill', '/blog/nc-due-diligence-fee-chapel-hill-buyers', '/ai-tools', '/resources', '/blog', '/about', '/'],
  '/contact': ['/about', '/neighborhoods/southern-village-chapel-hill', '/neighborhoods/meadowmont-chapel-hill', '/neighborhoods/briar-chapel-chapel-hill', '/blog/what-is-my-chapel-hill-home-worth-2026', '/ai-tools', '/blog', '/'],
  '/blog/chapel-hill-housing-market-2026': ['/neighborhoods/southern-village-chapel-hill', '/blog/nc-due-diligence-fee-chapel-hill-buyers', '/blog/unc-parking-cost-where-to-live-chapel-hill'],
  '/blog/what-is-my-chapel-hill-home-worth-2026': ['/neighborhoods/southern-village-chapel-hill', '/neighborhoods/briar-chapel-chapel-hill', '/blog/unc-parking-cost-where-to-live-chapel-hill', '/'],
  '/blog/unc-parking-cost-where-to-live-chapel-hill': ['/blog/nc-due-diligence-fee-chapel-hill-buyers'],
};
