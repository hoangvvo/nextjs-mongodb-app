import React, { useContext } from 'react';
import { UserContext } from '../components/UserContext';
import Layout from '../components/layout';
import AboutPage from '../components/aboutPage';

const IndexPage = () => {
  const { state: { isLoggedIn, user: { name } } } = useContext(UserContext);
  return (
    <Layout>
      <style jsx>
        {`
          p {
            color: #888;
            font-size: 0.8rem;
          }
        `}
      </style>
      <div>
        <h2>
          Hello,
          {' '}
          {(isLoggedIn ? name : 'stranger')}
          !
        </h2>
        <p>Have a wonderful day.</p>
      </div>
      <AboutPage />
    </Layout>
  );
};

export default IndexPage;
