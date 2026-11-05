import Image from 'next/image';
import { formatPrice, formatCloseDate } from '../lib/properties';

const BADGE_STYLES = {
  Active: 'bg-navy text-ivory',
  'Coming Soon': 'bg-gold text-navy',
  Sold: 'bg-ivory text-navy',
};

function Specs({ p }) {
  const parts = [];
  if (p.beds != null) parts.push(`${p.beds} ${p.beds === 1 ? 'Bed' : 'Beds'}`);
  if (p.baths != null) parts.push(`${p.baths} ${p.baths === 1 ? 'Bath' : 'Baths'}`);
  if (p.sqft != null) parts.push(`${p.sqft.toLocaleString('en-US')} Sq Ft`);
  if (p.acres) parts.push(`${p.acres} Acres`);
  if (!parts.length) return null;
  return <p className="mt-3 text-sm text-navy/75">{parts.join('  ·  ')}</p>;
}

export default function PropertyCard({ p, showNote = true, priority = false }) {
  const isSold = p.status === 'sold';
  const price = formatPrice(p.price);
  const closed = formatCloseDate(p.closeDate);

  return (
    <article className="card p-0 overflow-hidden flex flex-col">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-ivory via-warmwhite to-ivory">
        {p.photo ? (
          <Image
            src={p.photo}
            alt={p.photoAlt || `${p.street}, ${p.city}, ${p.state}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-2xl text-navy/40">{p.city}</span>
          </div>
        )}
        <span
          className={`absolute top-4 left-4 rounded-full px-3 py-1 text-[11px] uppercase tracking-widewide font-medium shadow-sm ${
            BADGE_STYLES[p.badge] || BADGE_STYLES.Sold
          }`}
        >
          {p.badge}
        </span>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {price && (
          <p className="font-serif text-2xl text-navy">
            {isSold && <span className="text-sm font-sans uppercase tracking-widewide text-taupe mr-2">Sold</span>}
            {price}
          </p>
        )}
        <h3 className="mt-1 font-medium text-navy">{p.street}</h3>
        <p className="text-sm text-taupe">
          {p.city}, {p.state}
          {p.homeType ? `  ·  ${p.homeType}` : ''}
        </p>
        <Specs p={p} />
        <p className="mt-3 text-xs uppercase tracking-widewide text-navy/60">
          {p.role}
          {isSold && closed ? `  ·  Closed ${closed}` : ''}
        </p>
        {showNote && p.note && (
          <p className="mt-4 pt-4 border-t border-navy/10 text-sm text-navy/75 leading-relaxed">{p.note}</p>
        )}
        {!isSold && (
          <a href="/contact" className="btn btn-outline mt-6 text-xs self-start">
            {p.badge === 'Coming Soon' ? 'Get Early Access' : 'Request a Showing'}
          </a>
        )}
      </div>
    </article>
  );
}
