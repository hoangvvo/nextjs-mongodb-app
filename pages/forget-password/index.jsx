import React, { useState } from 'react';
import Head from 'next/head';

const ForgetPasswordPage = () => {
  const [msg, setMsg] = useState({ message: '', isError: false });

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

    if (res.status === 200) {
      setMsg({ message: 'An email has been sent to your mailbox' });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  }

  return (
    <>
      <Head>
        <title>Forget password</title>
      </Head>
      <h2>Forget password</h2>
      {msg.message ? <p style={{ color: msg.isError ? 'red' : '#0070f3', textAlign: 'center' }}>{msg.message}</p> : null}
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
