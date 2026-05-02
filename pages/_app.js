import '../styles/globals.css';
import Head from 'next/head';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
