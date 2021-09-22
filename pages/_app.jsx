import '@/assets/base.css';
import 'modern-normalize/modern-normalize.css';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Next.js + MongoDB App</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
