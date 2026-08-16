import { getAllBlogPosts } from '../lib/content/server';

const SITE_URL = 'https://ashleysmithrealestate.live';
const escapeXml = (value = '') => String(value).replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[char]));

export default function Rss() { return null; }

export function getServerSideProps({ res }) {
  const posts = getAllBlogPosts();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>Ashley Smith Real Estate Blog</title><link>${SITE_URL}/blog</link><description>Chapel Hill and Triangle real estate guidance for buyers, sellers, and relocation clients.</description>${posts.map((post) => `<item><title>${escapeXml(post.title)}</title><link>${SITE_URL}${post.path}</link><guid>${SITE_URL}${post.path}</guid><pubDate>${new Date(`${post.datePublished}T12:00:00Z`).toUTCString()}</pubDate><description>${escapeXml(post.excerpt)}</description></item>`).join('')}</channel></rss>`;
  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  res.write(xml);
  res.end();
  return { props: {} };
}
