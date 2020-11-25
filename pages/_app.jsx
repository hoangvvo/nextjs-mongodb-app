import React from 'react';
import Head from 'next/head';
import Layout from '@/components/layout';

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
