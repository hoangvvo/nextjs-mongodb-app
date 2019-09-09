import React, { useState, useContext } from 'react';
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
      <div>
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">
            Log in
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
