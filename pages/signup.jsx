import React, { useState, useContext } from 'react';
import axioswal from 'axioswal';
import { UserContext } from '../components/UserContext';
import Layout from '../components/layout';
import redirectTo from '../lib/redirectTo';

const SignupPage = () => {
  const { dispatch } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axioswal
      .post('/api/users', {
        name,
        email,
        password,
      })
      .then((data) => {
        if (data.status === 'ok') {
          dispatch({ type: 'fetch' });
          redirectTo('/');
        }
      });
  };

  return (
    <Layout>
      <div>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="name">
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
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
              placeholder="Create a password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </Layout>
  );
};

export default SignupPage;
