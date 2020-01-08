import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/layout';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <title>Sign in</title>
      </Head>
      <h2>Sign in</h2>
      <form action="/api/authenticate" method="post">
        {router && router.query && router.query.fail ? <p style={{ color: 'red' }}>Incorrect email or password</p> : null}
        <label htmlFor="email">
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            type="password"
            name="password"
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
