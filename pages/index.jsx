import React, { useContext } from 'react';
import Link from 'next/link';
import axioswal from 'axioswal';
import { UserContext } from '../components/UserContext';
import Layout from '../components/layout';

const IndexPage = () => {
  const { state: { isLoggedIn, user: { name } }, dispatch } = useContext(UserContext);
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
    <Layout>
      <div>
        <h1>Next.js + MongoDB App</h1>
        <h2>
          Hello,
          {' '}
          {(isLoggedIn ? name : 'stranger')}
          .
        </h2>
        {(!isLoggedIn ? (
          <>
            <Link href="/login"><button>Login</button></Link>
            <Link href="/signup"><button>Sign up</button></Link>
          </>
        ) : <button onClick={handleLogout}>Logout</button>)}
      </div>
    </Layout>
  );
};

export default IndexPage;
