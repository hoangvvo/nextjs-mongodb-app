import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCurrentUser } from '@/hooks/index';

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
      <style jsx global>
        {`
          a {
            text-decoration: none !important;
            cursor: pointer;
            color: #0070f3;
          }
          a:hover {
            color: #0366d6;
          }
          body {
            margin: 0;
            padding: 0;
            color: #111;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
              'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
              'Helvetica Neue', sans-serif;
            background-color: #fff;
          }
          h2 {
            color: #333;
            text-align: center;
          }
          label {
            display: flex;
            margin-bottom: 0.5rem;
            align-items: center;
            width: 100%;
          }
          form {
            margin-bottom: 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          input,
          textarea {
            font-family: monospace;
            flex: 1 1 0%;
            margin-left: 0.5rem;
            box-shadow: none;
            width: 100%;
            color: #000;
            background-color: transparent;
            border: 1px solid #d8d8d8;
            border-radius: 5px;
            outline: 0px;
            padding: 10px 25px;
          }
          button {
            display: block;
            margin-bottom: 0.5rem;
            color: #fff;
            border-radius: 5px;
            border: none;
            background-color: #000;
            cursor: pointer;
            transition: all 0.2s ease 0s;
            padding: 10px 25px;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
          }
          button:hover,
          button:active {
            transform: translate3d(0px, -1px, 0px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          }
          header {
            border-bottom: 1px solid #d8d8d8;
          }
          nav {
            max-width: 1040px;
            margin: auto;
            padding: 1rem 2rem;
          }
          nav div {
            float: right;
          }
          nav div a {
            font-size: 0.9rem;
            margin-left: 1rem;
          }
          nav h1 {
            font-size: 1rem;
            color: #444;
            margin: 0;
            font-weight: 700;
            float: left;
          }
          nav:after {
            content: '';
            clear: both;
            display: table;
          }
          main {
            padding: 1rem;
            max-width: 1040px;
            margin: 0 auto;
          }
          footer {
            text-align: center;
            font-size: 0.8rem;
            margin-top: 1rem;
            padding: 3rem;
            color: #888;
          }
        `}
      </style>
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
                <Link href={`/user/${user._id}`}>
                  <a>Profile</a>
                </Link>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
          Made with
          {' '}
          <span role="img" aria-label="Love">
            ❤️
          </span>
          ,
          {' '}
          <span role="img" aria-label="Fire">
            🔥
          </span>
          , and a keyboard by
          {' '}
          <a href="https://hoangvvo.com/">Hoang Vo</a>
          .
        </p>
        <p>
          Source code is on
          {' '}
          <a href="https://github.com/hoangvvo/nextjs-mongodb-app">Github</a>
          .
        </p>
      </footer>
    </>
  );
};
