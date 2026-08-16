export const BLOG_CATEGORIES = [
  'All', 'Buying', 'Selling', 'Relocation', 'Luxury', 'Neighborhoods',
  'Market Updates', 'UNC Moves', 'Commute & Lifestyle',
];

export function toArticleCard(post) {
  return {
    slug: post.slug,
    path: post.path,
    title: post.title,
    cat: post.category,
    date: post.publishDate,
    excerpt: post.excerpt,
    featuredImage: post.featuredImage,
    featuredImageAlt: post.featuredImageAlt,
  };
}
