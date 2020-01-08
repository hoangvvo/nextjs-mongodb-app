import React from 'react';
import Head from 'next/head';
import App from 'next/app';
import { UserContextProvider } from '../components/UserContext';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <UserContextProvider>
        <Head>
          <title>Next.js + MongoDB App</title>
        </Head>
        <Component {...pageProps} />
      </UserContextProvider>
    );
  }
}

export default MyApp;
