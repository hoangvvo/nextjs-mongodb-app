import React, { useContext } from 'react';
import Link from 'next/link';
import axioswal from 'axioswal';
import { UserContext } from '../../components/UserContext';
import Layout from '../../components/layout';

const ProfilePage = () => {
  const {
    state: {
      isLoggedIn, user: {
        name, email, bio, profilePicture, emailVerified,
      },
    },
  } = useContext(UserContext);

  function sendVerificationEmail() {
    axioswal.post('/api/user/email/verify');
  }

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
          div {
            color: #777;
            margin-bottom: 1.5rem;
          }
          h2 {
            text-align: center;
            color: #333;
          }
          p {
            color: #444;
            margin: .5rem 0;
          }
          a {
          }
        `}
      </style>
      <h1>Profile</h1>
      <div>
        {profilePicture ? <img src={profilePicture} width="256" height="256" alt={name} /> : null}
      </div>
      <div>
        <h2>
          { name }
        </h2>
      </div>
      <div>
        Bio
        <p>{ bio }</p>
      </div>
      <div>
        Email
        <p>{ email }</p>
        {' '}
        {!emailVerified ? (
          <span>
          (Not verified.
            {' '}
            <button type="button" onClick={sendVerificationEmail} style={{ display: 'inline-block', padding: '.4rem .2rem', margin: 0 }}>Send verification email</button>
          )
          </span>
        ) : null}
      </div>
      <Link href="/profile/settings"><button type="button">Edit</button></Link>
    </Layout>
  );
};

export default ProfilePage;
