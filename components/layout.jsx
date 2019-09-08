import React, { useContext } from 'react';
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
        * {
          box-sizing: border-box;
          font-family: monospace;
        }
        body {
          color: #4a4a4a;
          background-color: #f8f8f8;
          padding: 2rem;
          text-align: center;
        }
        a {
          color: inherit!important;
        }
        input, textarea {
          width: 100%;
          margin-top: 1rem;
          padding: 1rem;
          border: none;
          background-color: rgba(0, 0, 0, 0.05);
        }
        button {
          color: #ecf0f1;
          margin: 1rem;
          background: #4a4a4a;
          border: none;
          padding: 1rem;
        }
        footer {
          padding: 3rem 1.5rem 6rem;
        }
      `}

      </style>
      <Link href="/"><a><h1>Next.js + MongoDB App</h1></a></Link>
      { children }
      {(!isLoggedIn ? (
        <>
          <Link href="/login"><button type="button">Login</button></Link>
          <Link href="/signup"><button type="button">Sign up</button></Link>
        </>
      ) : (
        <>
          <Link href="/profile"><button type="button">Profile</button></Link>
          <button type="button" onClick={handleLogout}>Logout</button>
        </>
      ))}
      <footer>
        <p className="is-italic">
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
