import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useCurrentUser } from '@/hooks/index';

const SignupPage = () => {
  const [user, { mutate }] = useCurrentUser();
  const [errorMsg, setErrorMsg] = useState('');
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.replace('/');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      name: e.currentTarget.name.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 201) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrorMsg(await res.text());
    }
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <div>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
          <label htmlFor="name">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
            />
          </label>
          <label htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
            />
          </label>
          <label htmlFor="password">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
            />
          </label>
          <button type="submit">Sign up</button>
        </form>
        <p style={{ color: '#777', textAlign: 'center' }}>
          Note: The database is public. For your privacy,
          please avoid using your personal, work email.
        </p>
      </div>
    </>
  );
};

export default SignupPage;
