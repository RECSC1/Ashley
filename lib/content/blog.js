export function toBlogCard(post) {
  return {
    slug: post.slug,
    path: post.path,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    publishDate: post.publishDate,
    datePublished: post.datePublished,
    featuredImage: post.featuredImage,
    featuredImageWebp: post.featuredImageWebp,
    featuredImageAlt: post.featuredImageAlt,
  };
}
