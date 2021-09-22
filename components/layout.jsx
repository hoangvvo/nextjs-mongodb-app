import { useCurrentUser } from '@/lib/user';
import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children }) {
  const [user, { mutate }] = useCurrentUser();
  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    mutate(null);
  };
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
      <header>
        <nav>
          <Link href="/">
            <a>
              <h1>Next.js + MongoDB App</h1>
            </a>
          </Link>
          <div>
            {!user ? (
              <>
                <Link href="/login">
                  <a>Sign in</a>
                </Link>
                <Link href="/signup">
                  <a>Sign up</a>
                </Link>
              </>
            ) : (
              <>
                <Link href={`/user/${user.username}`}>
                  <a>Profile</a>
                </Link>
                {/* eslint-disable-next-line */}
                <a tabIndex={0} role="button" onClick={handleLogout}>
                  Logout
                </a>
              </>
            )}
          </div>
        </nav>
      </header>

      <main>{children}</main>
      <footer>
        <p>
          Made with{' '}
          <span role="img" aria-label="Love">
            ❤️
          </span>
          ,{' '}
          <span role="img" aria-label="Fire">
            🔥
          </span>
          , and a keyboard by <a href="https://hoangvvo.com/">Hoang Vo</a>.
        </p>
        <p>
          Source code is on{' '}
          <a href="https://github.com/hoangvvo/nextjs-mongodb-app">Github</a>.
        </p>
      </footer>
    </>
  );
}
