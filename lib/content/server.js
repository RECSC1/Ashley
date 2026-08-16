import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

function dateString(value) {
  if (!value) return '';
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function displayDate(value) {
  const date = new Date(`${dateString(value)}T12:00:00Z`);
  return Number.isNaN(date.getTime())
    ? ''
    : new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);
}

function readCollection(collection) {
  const directory = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const source = fs.readFileSync(path.join(directory, file), 'utf8');
      const { data, content } = matter(source);
      const slug = data.slug || file.replace(/\.md$/, '');
      const publishDate = dateString(data.publish_date);
      const updatedDate = dateString(data.updated_date || data.publish_date);
      const canonicalPath = data.canonical_path || `/${collection}/${slug}`;
      return {
        ...data,
        slug,
        content,
        collection,
        path: canonicalPath,
        canonicalPath,
        datePublished: publishDate,
        dateModified: updatedDate,
        publishDate: displayDate(publishDate),
        lastUpdated: `Last updated ${displayDate(updatedDate)}`,
        seoTitle: data.seo_title,
        description: data.meta_description,
        featuredImage: data.featured_image,
        featuredImageWebp: data.featured_image_webp || data.featured_image,
        featuredImageAlt: data.image_alt,
        featuredImageUrl: data.featured_image?.startsWith('http')
          ? data.featured_image
          : `https://ashleysmithrealestate.live${data.featured_image}`,
        category: data.category || (collection === 'neighborhoods' ? 'Neighborhoods' : 'Blog'),
        faqHeading: data.faq_heading || 'Frequently asked questions',
        faqs: Array.isArray(data.faqs) ? data.faqs : [],
      };
    })
    .sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));
}

export const getAllBlogPosts = () => readCollection('blog');
export const getAllNeighborhoods = () => readCollection('neighborhoods');
export const getBlogPost = (slug) => getAllBlogPosts().find((post) => post.slug === slug) || null;
export const getNeighborhood = (slug) => getAllNeighborhoods().find((guide) => guide.slug === slug) || null;
