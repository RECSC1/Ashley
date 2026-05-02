// Starter article entries used by the Resources page.
//
// This file is the single source of truth for blog/article cards. It is
// intentionally a plain JS module so the Resources UI can stay decoupled
// from where the content lives. When Decap CMS is added later, this module
// can be replaced with a loader that reads markdown files from
// `content/blog/*.md` (frontmatter -> the same shape exported below)
// without changing the Resources page itself.

export const BLOG_CATEGORIES = [
  'All',
  'Buying',
  'Selling',
  'Relocation',
  'Luxury',
  'Neighborhoods',
  'Market Updates',
  'UNC Moves',
  'Commute & Lifestyle',
];

export const ARTICLES = [
  {
    slug: 'moving-to-chapel-hill',
    title: 'Moving to Chapel Hill: What Buyers Should Know',
    cat: 'Relocation',
    date: '[Date]',
    read: '6 min',
    excerpt: 'A primer on neighborhoods, schools, and lifestyle in Chapel Hill.',
  },
  {
    slug: 'chapel-hill-vs-carrboro',
    title: 'Chapel Hill vs. Carrboro: Which Area Fits Your Lifestyle?',
    cat: 'Neighborhoods',
    date: '[Date]',
    read: '5 min',
    excerpt: 'Two beloved towns, two distinct rhythms — a side-by-side look.',
  },
  {
    slug: 'prepare-triangle-home-for-market',
    title: 'How to Prepare Your Triangle Home for Market',
    cat: 'Selling',
    date: '[Date]',
    read: '7 min',
    excerpt: 'Editorial-level prep that positions your home to sell with confidence.',
  },
  {
    slug: 'relocating-to-the-triangle',
    title: 'Relocating to the Triangle: A Local Guide',
    cat: 'Relocation',
    date: '[Date]',
    read: '8 min',
    excerpt: 'Concierge-level orientation for buyers moving to North Carolina.',
  },
  {
    slug: 'luxury-buyers-chapel-hill',
    title: 'What Luxury Buyers Look for in Chapel Hill',
    cat: 'Luxury',
    date: '[Date]',
    read: '6 min',
    excerpt: 'Discreet, refined homes — what defines luxury in our market.',
  },
  {
    slug: 'unc-related-buyers',
    title: 'What UNC-Related Buyers Should Know Before Moving',
    cat: 'UNC Moves',
    date: '[Date]',
    read: '5 min',
    excerpt: 'Faculty, residents, and grad students — timing and tactics.',
  },
  {
    slug: 'selling-in-chapel-hill',
    title: 'Selling in Chapel Hill: How to Position Your Home',
    cat: 'Selling',
    date: '[Date]',
    read: '6 min',
    excerpt: 'Marketing strategy tailored for the Chapel Hill buyer pool.',
  },
  {
    slug: 'durham-cary-or-raleigh',
    title: 'Durham, Cary, or Raleigh: Comparing Triangle Lifestyles',
    cat: 'Neighborhoods',
    date: '[Date]',
    read: '7 min',
    excerpt: "A clear-eyed look at three of the Triangle's biggest cities.",
  },
  {
    slug: 'commute-time-matters',
    title: 'Why Commute Time Matters When Buying in the Triangle',
    cat: 'Commute & Lifestyle',
    date: '[Date]',
    read: '5 min',
    excerpt: 'How daily routes shape which area feels right.',
  },
];
