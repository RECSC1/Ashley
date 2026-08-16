import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { ArticleCta } from '../BlogPostLayout';
import FaqSection from './FaqSection';

export default function MarkdownContent({ content, faqs = [], faqHeading }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        a({ href = '', children, ...props }) {
          return href.startsWith('/') ? <Link href={href} {...props}>{children}</Link> : <a href={href} rel="noopener noreferrer" {...props}>{children}</a>;
        },
        div({ children, ...props }) {
          const position = props['data-article-cta'];
          if (position) return <ArticleCta position={position} />;
          if (props['data-faq-section']) return <FaqSection faqs={faqs} heading={faqHeading} />;
          return <div {...props}>{children}</div>;
        },
        table({ children, ...props }) {
          return <div className="article-table-wrap"><table {...props}>{children}</table></div>;
        },
        img({ alt = '', ...props }) {
          return <img alt={alt} loading="lazy" className="article-inline-image" {...props} />;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
