import React, { useState } from 'react';
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
      <h2>Forget password</h2>
      <p>Do not worry. Simply enter your email address below.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <button
          type="submit"
        >
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default ForgetPasswordPage;
