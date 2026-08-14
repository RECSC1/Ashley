import Link from "next/link";
import SEO from "../../components/SEO";
import { sortedBlogPosts } from "../../lib/content/blog";

export default function BlogIndex() {
  return (
    <>
      <SEO
        title="Chapel Hill Real Estate Blog | Ashley Smith"
        description="Practical Chapel Hill and Triangle real estate guidance for buyers, sellers, and relocation clients from Ashley Smith with Compass North Carolina."
        path="/blog"
      />

      <section className="section">
        <div className="container-wide max-w-6xl">
          <div className="card bg-navy text-ivory">
            <p className="eyebrow text-ivory/80 mb-3">Local Market Insight</p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight">
              Chapel Hill Real Estate Blog
            </h1>
            <p className="mt-4 text-ivory/80 text-lg max-w-3xl leading-relaxed">
              Clear market guidance for buying, selling, and relocating across
              Chapel Hill and the greater Triangle.
            </p>
          </div>

          <div className="mt-10 md:mt-14 grid gap-8">
            {sortedBlogPosts.map((post) => (
              <article
                key={post.slug}
                className="card p-0 overflow-hidden grid md:grid-cols-[0.95fr_1.05fr]"
              >
                <Link
                  href={post.path}
                  className="block overflow-hidden bg-blush"
                >
                  <picture>
                    <source srcSet={post.featuredImageWebp} type="image/webp" />
                    <img
                      src={post.featuredImage}
                      alt={post.featuredImageAlt}
                      width="1600"
                      height="900"
                      loading="lazy"
                      className="w-full h-full min-h-[250px] object-cover transition duration-500 hover:scale-[1.02]"
                    />
                  </picture>
                </Link>
                <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                  <time dateTime={post.datePublished} className="eyebrow mb-4">
                    {post.publishDate}
                  </time>
                  <h2 className="font-serif text-3xl md:text-4xl text-navy leading-tight">
                    <Link
                      href={post.path}
                      className="hover:text-gold transition"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="blog-excerpt mt-4 text-navy/70 text-lg leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link
                    href={post.path}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-gold transition"
                  >
                    Read More <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
