import '@/assets/base.css';
import { Layout } from '@/components/Layout';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Next.js + MongoDB App</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
