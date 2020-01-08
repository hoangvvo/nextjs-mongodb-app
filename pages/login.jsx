import React, { useState, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axioswal from 'axioswal';
import { UserContext } from '../components/UserContext';
import Layout from '../components/layout';
import redirectTo from '../lib/redirectTo';

const LoginPage = () => {
  const { dispatch } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axioswal
      .post('/api/authenticate', {
        email,
        password,
      })
      .then((data) => {
        if (data.status === 'ok') {
          //  Fetch the user data for UserContext here
          dispatch({ type: 'fetch' });
          redirectTo('/');
        }
      });
  };

  return (
    <Layout>
      <Head>
        <title>Sign in</title>
      </Head>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="email">
          <input
            id="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Sign in</button>
        <Link href="/forgetpassword">
          <a>Forget password</a>
        </Link>
      </form>
    </Layout>
  );
};

export default LoginPage;
