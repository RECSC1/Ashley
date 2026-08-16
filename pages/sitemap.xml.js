import { getAllBlogPosts, getAllNeighborhoods } from '../lib/content/server';

const SITE_URL = 'https://ashleysmithrealestate.live';
const STATIC_PATHS = ['/', '/about', '/properties', '/buyer-tools', '/home-value', '/resources', '/blog', '/neighborhoods', '/triangle-community-guide', '/relocation-quiz', '/contact', '/ai-tools', '/terms', '/privacy'];
const escapeXml = (value) => value.replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[char]));

export default function Sitemap() { return null; }

export function getServerSideProps({ res }) {
  const entries = [
    ...STATIC_PATHS.map((path) => ({ path })),
    ...getAllBlogPosts().map((post) => ({ path: post.path, modified: post.dateModified })),
    ...getAllNeighborhoods().map((guide) => ({ path: guide.path, modified: guide.dateModified })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((entry) => `  <url><loc>${escapeXml(`${SITE_URL}${entry.path}`)}</loc>${entry.modified ? `<lastmod>${entry.modified}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>`;
  res.setHeader('Content-Type', 'application/xml');
  res.write(xml);
  res.end();
  return { props: {} };
}
