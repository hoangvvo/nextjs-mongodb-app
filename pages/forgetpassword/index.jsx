import React, { useState } from 'react';
import Head from 'next/head';
import axioswal from 'axioswal';
import Layout from '../../components/layout';
import redirectTo from '../../lib/redirectTo';

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState();

  function handleSubmit(event) {
    event.preventDefault();
    axioswal.post('/api/user/password/reset', { email }).then((resp) => {
      if (!resp.error) {
        redirectTo('/');
      }
    });
  }

  return (
    <Layout>
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
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
};

export default ForgetPasswordPage;
