import React, { useContext } from 'react';
import { UserContext } from '../components/UserContext';
import Layout from '../components/layout';

const IndexPage = () => {
  const { state: { isLoggedIn, user: { name } } } = useContext(UserContext);
  return (
    <Layout>
      <div>
        <h2>
          Hello,
          {' '}
          {(isLoggedIn ? name : 'stranger')}
          .
        </h2>
      </div>
    </Layout>
  );
};

export default IndexPage;
