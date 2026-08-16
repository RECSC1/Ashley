export function toGuideCard(guide) {
  return {
    slug: guide.slug,
    path: guide.path,
    title: guide.title,
    desc: guide.excerpt,
    featuredImage: guide.featuredImage,
    featuredImageAlt: guide.featuredImageAlt,
  };
}
