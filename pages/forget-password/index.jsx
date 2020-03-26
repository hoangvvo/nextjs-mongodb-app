import React from 'react';
import Head from 'next/head';
import Router from 'next/router';

const ForgetPasswordPage = () => {
  async function handleSubmit(e) {
    e.preventDefault(e);

    const body = {
      email: e.currentTarget.email.value,
    };

    const res = await fetch('/api/user/password/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 200) Router.replace('/');
  }

  return (
    <>
      <Head>
        <title>Forget password</title>
      </Head>
      <h2>Forget password</h2>
      <form onSubmit={handleSubmit}>
        <p>Do not worry. Simply enter your email address below.</p>
        <label htmlFor="email">
          <input
            id="email"
            type="email"
            placeholder="Email"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ForgetPasswordPage;
