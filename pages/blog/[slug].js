import Head from 'next/head';
import SEO from '../../components/SEO';
import BlogPostLayout from '../../components/BlogPostLayout';
import MarkdownContent from '../../components/content/MarkdownContent';
import { getAllBlogPosts, getBlogPost } from '../../lib/content/server';

const SITE_URL = 'https://ashleysmithrealestate.live';

export default function BlogPostPage({ post }) {
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.featuredImageUrl,
    author: { '@type': 'Person', name: post.author, jobTitle: 'REALTOR®', url: `${SITE_URL}/about` },
    publisher: { '@type': 'Organization', name: 'Ashley Smith Real Estate | Compass', logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.png` } },
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${post.canonicalPath}` },
  };
  const faqSchema = post.faqs.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  } : null;

  return (
    <>
      <SEO title={post.seoTitle} description={post.description} path={post.canonicalPath} image={post.featuredImageUrl} type="article" />
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
        {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      </Head>
      <BlogPostLayout post={post}>
        <MarkdownContent content={post.content} faqs={post.faqs} faqHeading={post.faqHeading} />
      </BlogPostLayout>
    </>
  );
}

export function getStaticPaths() {
  return { paths: getAllBlogPosts().map((post) => ({ params: { slug: post.slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  const post = getBlogPost(params.slug);
  if (!post) return { notFound: true };
  return { props: { post } };
}
