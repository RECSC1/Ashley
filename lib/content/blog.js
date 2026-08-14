export const blogPosts = [
  {
    slug: "chapel-hill-housing-market-2026",
    path: "/blog/chapel-hill-housing-market-2026",
    title:
      "The Chapel Hill Housing Market in 2026: What Buyers and Sellers Actually Need to Know",
    seoTitle:
      "Chapel Hill Housing Market 2026: Buyer & Seller Guide | Ashley Smith",
    description:
      "Chapel Hill home prices, days on market, and inventory in 2026, plus what the numbers mean if you are buying or selling in Orange County and the Triangle.",
    excerpt:
      "Chapel Hill is not in a frenzy or a crash. See what current prices, days on market, and inventory mean for buyers and sellers in 2026.",
    publishDate: "August 14, 2026",
    datePublished: "2026-08-14",
    lastUpdated: "Last updated August 14, 2026",
    featuredImage: "/images/chapel-hill-market-2026.jpg",
    featuredImageWebp: "/images/chapel-hill-market-2026.webp",
    featuredImageUrl:
      "https://ashleysmithrealestate.live/images/chapel-hill-market-2026.jpg",
    featuredImageAlt:
      "Chapel Hill North Carolina neighborhood homes on a tree lined street in 2026",
  },
];

export const sortedBlogPosts = [...blogPosts].sort(
  (firstPost, secondPost) =>
    new Date(secondPost.datePublished) - new Date(firstPost.datePublished),
);
