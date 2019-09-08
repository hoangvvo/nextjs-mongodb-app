import React from 'react';
import App from 'next/app';
import { UserContextProvider } from '../components/UserContext';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    );
  }
}

export default MyApp;
