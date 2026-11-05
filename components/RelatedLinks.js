import Link from 'next/link';
import { useRouter } from 'next/router';
import { CATALOG, PAGE_LINKS } from '../lib/relatedLinks';

export default function RelatedLinks() {
  const router = useRouter();
  const path = (router?.asPath || '/').split(/[?#]/)[0].replace(/\/$/, '') || '/';
  const links = (PAGE_LINKS[path] || []).filter((href) => href !== path && CATALOG[href]);
  if (!links.length) return null;

  return (
    <section aria-labelledby="keep-exploring" className="border-t border-navy/10 bg-warmwhite">
      <div className="container-wide py-14 md:py-16">
        <p className="eyebrow mb-3">Keep Exploring</p>
        <h2 id="keep-exploring" className="font-serif text-3xl md:text-4xl text-navy">
          {links.length === 1 ? 'Read this next' : 'More from Ashley'}
        </h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((href) => (
            <Link
              key={href}
              href={href}
              className="group rounded-xl bg-ivory border border-navy/10 p-5 hover:border-gold transition"
            >
              <span className="block font-serif text-xl text-navy group-hover:text-gold transition">
                {CATALOG[href].title}
              </span>
              <span className="block mt-2 text-sm text-navy/70 leading-relaxed">{CATALOG[href].blurb}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
