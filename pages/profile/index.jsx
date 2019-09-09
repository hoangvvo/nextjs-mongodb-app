import React, { useContext } from 'react';
import Link from 'next/link';
import { UserContext } from '../../components/UserContext';
import Layout from '../../components/layout';

const ProfilePage = () => {
  const {
    state: {
      isLoggedIn, user: {
        name, email, bio, profilePicture,
      },
    },
  } = useContext(UserContext);

  if (!isLoggedIn) return (<Layout><p>Please log in</p></Layout>);
  return (
    <Layout>
      <style jsx>
        {`
          img {
            max-width: 100vh;
            border-radius: 50%;
            box-shadow: rgba(0, 0, 0, 0.05) 0 10px 20px 1px;
          }
        `}
      </style>
      <h1>Profile</h1>
      <div>
        <img src={profilePicture} width="256" height="256" alt={name} />
        <p>
          Name:
          {' '}
          { name }
        </p>
        <p>
          Bio:
          {' '}
          { bio }
        </p>
        <p>
          Email:
          {' '}
          { email }
        </p>
      </div>
      <Link href="/profile/settings"><button type="button">Edit</button></Link>
    </Layout>
  );
};

export default ProfilePage;
