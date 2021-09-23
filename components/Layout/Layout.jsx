import Head from 'next/head';
import Link from 'next/link';
import Container from './Container';
import styles from './Layout.module.css';
import Wrapper from './Wrapper';

const Header = () => {
  return (
    <nav className={styles.nav}>
      <Wrapper className={styles.navWrap}>
        <Container className={styles.navContent} alignItems="center">
          <Link href="/">
            <a className={styles.logo}>Next.js MongoDB App</a>
          </Link>
        </Container>
      </Wrapper>
    </nav>
  );
};

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Next.js + MongoDB App</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="nextjs-mongodb-app is a continously developed app built with Next.JS and MongoDB. This project goes further and attempts to integrate top features as seen in real-life apps."
        />
        <meta property="og:title" content="Next.js + MongoDB App" />
        <meta
          property="og:description"
          content="nextjs-mongodb-app is a continously developed app built with Next.JS and MongoDB. This project goes further and attempts to integrate top features as seen in real-life apps."
        />
        <meta
          property="og:image"
          content="https://repository-images.githubusercontent.com/201392697/5d392300-eef3-11e9-8e20-53310193fbfd"
        />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
