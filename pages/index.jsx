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
        <h1>
          Hello,
          {' '}
          {(isLoggedIn ? name : 'stranger.')}
        </h1>

        {(!isLoggedIn ? (
          <>
            <Link href="/login"><div><button>Login</button></div></Link>
            <Link href="/signup"><div><button>Sign up</button></div></Link>
          </>
        ) : <button onClick={handleLogout}>Logout</button>)}

      </div>
    </Layout>
  );
};

export default IndexPage;
