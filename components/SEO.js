import Head from 'next/head';

export default function SEO({
  title,
  description,
  path = '',
  noindex = false,
  image = 'https://ashleysmithrealestate.live/images/ashley-smith-headshot.png',
  type = 'website',
}) {
  const fullTitle = title || 'Ashley Smith | Chapel Hill Realtor® | Compass North Carolina';
  const desc =
    description ||
    'Elegant, people-first real estate guidance for Chapel Hill, Carrboro, and the Triangle. Luxury Certified and Relocation Certified Realtor® with Compass North Carolina, LLC.';
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={`https://ashleysmithrealestate.live${path}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={`https://ashleysmithrealestate.live${path}`} />
    </Head>
  );
}
