import '@/assets/base.css';
import { Layout } from '@/components/Layout';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Next.js + MongoDB App</title>
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  );
}
