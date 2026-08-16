import Link from 'next/link';
import SEO from '../../components/SEO';
import { getAllNeighborhoods } from '../../lib/content/server';
import { toGuideCard } from '../../lib/content/guides';

export default function NeighborhoodsIndex({ guides }) {
  return (
    <>
      <SEO title="Triangle Neighborhood Guides | Ashley Smith" description="Explore neighborhood and community guides for Chapel Hill and the greater Triangle, with practical local guidance from Ashley Smith." path="/neighborhoods" />
      <section className="section">
        <div className="container-wide max-w-6xl">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 items-stretch">
            <div className="card bg-navy text-ivory">
              <p className="eyebrow text-ivory/80 mb-3">Local Area Library</p>
              <h1 className="font-serif text-4xl md:text-5xl leading-tight">Triangle Neighborhood Guides</h1>
              <p className="mt-4 text-ivory/80 text-lg max-w-2xl">Focused guides for comparing communities, housing styles, everyday access, and the tradeoffs that matter before you narrow a search.</p>
            </div>
            <div className="card bg-warmwhite">
              <p className="font-serif text-2xl text-navy">Need the quick comparison first?</p>
              <p className="text-navy/70 mt-3">Start with the custom Triangle Community Guide, then use individual neighborhood guides for a deeper look.</p>
              <Link href="/triangle-community-guide" className="btn btn-primary mt-5">Compare Triangle Communities</Link>
            </div>
          </div>
          {guides.length ? (
            <div className="grid md:grid-cols-2 gap-7 mt-10 md:mt-14">
              {guides.map((guide) => (
                <article key={guide.slug} className="card p-0 overflow-hidden">
                  <Link href={guide.path}><img src={guide.featuredImage} alt={guide.featuredImageAlt} className="w-full aspect-[16/9] object-cover" loading="lazy" /></Link>
                  <div className="p-6 md:p-8">
                    <h2 className="font-serif text-3xl text-navy"><Link href={guide.path} className="hover:text-gold transition">{guide.title}</Link></h2>
                    <p className="text-navy/70 mt-3">{guide.desc}</p>
                    <Link href={guide.path} className="inline-flex mt-5 text-sm font-medium hover:text-gold">Read Guide <span aria-hidden="true">→</span></Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="card mt-10 md:mt-14 text-center py-12">
              <p className="eyebrow mb-3">Coming Next</p>
              <h2 className="font-serif text-3xl text-navy">Individual neighborhood guides are being prepared.</h2>
              <p className="text-navy/70 mt-3 max-w-2xl mx-auto">The comparison guide is available now, and new community pages automatically appear here when published through the CMS.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function getStaticProps() {
  return { props: { guides: getAllNeighborhoods().map(toGuideCard) } };
}
