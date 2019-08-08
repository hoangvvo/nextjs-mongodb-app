import React from 'react';
import App, { Container } from 'next/app';
import { UserContextProvider } from '../components/UserContext';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </Container>
    );
  }
}

export default MyApp;
