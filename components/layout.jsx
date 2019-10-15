import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axioswal from 'axioswal';
import { UserContext } from './UserContext';

export default ({ children }) => {
  const { state: { isLoggedIn }, dispatch } = useContext(UserContext);
  const handleLogout = (event) => {
    event.preventDefault();
    axioswal
      .delete('/api/session')
      .then((data) => {
        if (data.status === 'ok') {
          dispatch({ type: 'clear' });
        }
      });
  };
  return (
    <>
      <style jsx global>
        {`
          a {
            text-decoration: none!important;
            color: #00ad9f;
          }
          html {
            font-size: 1.25rem;
          }
          body {
            margin: 0;
            padding: 0;
            color: #111;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
              "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
              "Helvetica Neue", sans-serif;
            background-color: #f3f5f7;
            text-align: center;
          }
          button, input, textarea {
            display: block;
            padding: .8rem 2.5rem;
            font-size: 1rem;
            margin: 1rem auto;
            background-color: #fff;
            color: #00ad9f;
            border: none;
            border-radius: 4px;
            box-shadow: rgba(0, 0, 0, 0.1) 0 10px 20px 1px;
          }
          button {
            cursor: pointer;
          }
          button:hover, button:active {
            background-color: #f3f4f4;
          }
        `}
      </style>
      <style jsx>
        {`
          header {
            background-color: #ffffff;
            box-shadow: rgba(0, 0, 0, 0.05) 0 10px 20px 1px;
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
            color: #444 ;
            margin: 0;
            font-weight: 700;
            float: left;
          }
          nav:after {
            content: "";
            clear: both;
            display: table;
          }
          main {
            padding: 1rem;
            max-width: 1040px;
            margin: 0 auto;
          }
          footer {
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
        <meta name="description" content="nextjs-mongodb-app is a continously developed app built with Next.JS and MongoDB. This project goes further and attempts to integrate top features as seen in real-life apps." />
        <meta property="og:title" content="Next.js + MongoDB App" />
        <meta property="og:description" content="nextjs-mongodb-app is a continously developed app built with Next.JS and MongoDB. This project goes further and attempts to integrate top features as seen in real-life apps." />
        <meta property="og:image" content="https://repository-images.githubusercontent.com/201392697/5d392300-eef3-11e9-8e20-53310193fbfd" />
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a><h1>Next.js + MongoDB App</h1></a>
          </Link>
          <div>
            {(!isLoggedIn ? (
              <>
                <Link href="/login"><a>Login</a></Link>
                <Link href="/signup"><a>Sign up</a></Link>
              </>
            ) : (
              <>
                <Link href="/profile"><a>Profile</a></Link>
                {/* eslint-disable-next-line */}
            <a role="button" onClick={handleLogout}>Logout</a>
              </>
            ))}
          </div>
        </nav>
      </header>

      <main>
        { children }
      </main>
      <footer>
        <p>
        Made with
          {' '}
          <span role="img" aria-label="Love">❤️</span>
        ,
          {' '}
          <span role="img" aria-label="Fire">🔥</span>
        , and a keyboard by
          {' '}
          <a href="https://www.hoangvvo.com/">Hoang Vo</a>
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
