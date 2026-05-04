import Head from 'next/head';

export default function SEO({ title, description, path = '', noindex = false }) {
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
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://ashleysmithrealestate.netlify.app/images/ashley-smith-headshot.png" />
      <meta property="og:url" content={`https://ashleysmithrealestate.netlify.app${path}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={`https://ashleysmithrealestate.netlify.app${path}`} />
    </Head>
  );
}
