import Link from "next/link";

export function ArticleCta({ position = "mid" }) {
  return (
    <aside
      className={`article-cta ${position === "end" ? "article-cta-end" : ""}`}
      aria-label="Contact Ashley Smith"
    >
      <p className="eyebrow mb-3">Chapel Hill Real Estate Guidance</p>
      <h2 className="font-serif text-3xl md:text-4xl text-navy leading-tight">
        Get a plan built around your timeline.
      </h2>
      <div className="flex flex-col sm:flex-row gap-3 mt-6 btn-stack-sm">
        <Link href="/contact" className="btn btn-primary">
          Schedule a Consultation
        </Link>
        <Link href="/home-value" className="btn btn-outline">
          Request a Home Value Review
        </Link>
      </div>
    </aside>
  );
}

export default function BlogPostLayout({ children, post, backHref = "/blog", backLabel = "Blog" }) {
  return (
    <article>
      <header className="section pb-8 md:pb-12">
        <div className="article-container">
          <Link
            href={backHref}
            className="eyebrow inline-flex hover:text-navy transition mb-5"
          >
            {backLabel}
          </Link>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.08] text-navy">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-navy/65">
            <time dateTime={post.datePublished}>{post.publishDate}</time>
            <span aria-hidden="true">·</span>
            <span>{post.lastUpdated}</span>
          </div>
          <div className="mt-6 flex items-center gap-4 border-t border-navy/10 pt-6">
            <img
              src="/images/ashley-smith-headshot.png"
              alt="Ashley Smith, REALTOR with Compass North Carolina"
              width="64"
              height="64"
              className="h-14 w-14 rounded-full object-cover object-top shadow-ring"
            />
            <div>
              <p className="font-medium text-navy">Ashley Smith</p>
              <p className="text-sm text-navy/65">
                REALTOR® | Compass North Carolina, LLC
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container-wide max-w-6xl">
        <picture>
          {post.featuredImageWebp && post.featuredImageWebp !== post.featuredImage && (
            <source srcSet={post.featuredImageWebp} type="image/webp" />
          )}
          <img
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            width="1600"
            height="900"
            className="w-full aspect-[16/9] object-cover rounded-2xl shadow-soft"
          />
        </picture>
      </div>

      <div className="article-container article-prose py-12 md:py-16">
        {children}
      </div>
    </article>
  );
}
