import Head from 'next/head';
import SEO from '../../components/SEO';
import BlogPostLayout from '../../components/BlogPostLayout';
import MarkdownContent from '../../components/content/MarkdownContent';
import { getAllNeighborhoods, getNeighborhood } from '../../lib/content/server';

const SITE_URL = 'https://ashleysmithrealestate.live';

export default function NeighborhoodPage({ guide }) {
  const articleSchema = {
    '@context': 'https://schema.org', '@type': 'Article', headline: guide.title,
    description: guide.description, image: guide.featuredImageUrl,
    author: { '@type': 'Person', name: guide.author, url: `${SITE_URL}/about` },
    datePublished: guide.datePublished, dateModified: guide.dateModified,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${guide.canonicalPath}` },
  };
  const faqSchema = guide.faqs.length ? {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  } : null;
  return (
    <>
      <SEO title={guide.seoTitle} description={guide.description} path={guide.canonicalPath} image={guide.featuredImageUrl} type="article" />
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      </Head>
      <BlogPostLayout post={guide} backHref="/neighborhoods" backLabel="Neighborhoods">
        <MarkdownContent content={guide.content} faqs={guide.faqs} faqHeading={guide.faqHeading} />
      </BlogPostLayout>
    </>
  );
}

export function getStaticPaths() {
  return { paths: getAllNeighborhoods().map((guide) => ({ params: { slug: guide.slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  const guide = getNeighborhood(params.slug);
  if (!guide) return { notFound: true };
  return { props: { guide } };
}
