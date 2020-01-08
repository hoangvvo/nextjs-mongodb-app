import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axioswal from 'axioswal';
import { UserContext } from '../../components/UserContext';
import Layout from '../../components/layout';

const ProfilePage = () => {
  const {
    state: {
      isLoggedIn,
      user: {
        name, email, bio, profilePicture, emailVerified,
      },
    },
  } = useContext(UserContext);

  function sendVerificationEmail() {
    axioswal.post('/api/user/email/verify');
  }

  if (!isLoggedIn) {
    return (
      <Layout>
        <p>Please sign in</p>
      </Layout>
    );
  }
  return (
    <Layout>
      <style jsx>
        {`
          h2 {
            text-align: left;
            margin-right: 0.5rem;
          }
          button {
            margin: 0 0.25rem;
          }
          img {
            width: 10rem;
            height: auto;
            border-radius: 50%;
            box-shadow: rgba(0, 0, 0, 0.05) 0 10px 20px 1px;
            margin-right: 1.5rem;
          }
          div {
            color: #777;
            display: flex;
            align-items: center;
          }
          p {
            font-family: monospace;
            color: #444;
            margin: 0.25rem 0 0.75rem;
          }
          a {
            margin-left: 0.25rem;
          }
        `}
      </style>
      <Head>
        <title>{name}</title>
      </Head>
      <div>
        {profilePicture ? (
          <img src={profilePicture} width="256" height="256" alt={name} />
        ) : null}
        <section>
          <div>
            <h2>{name}</h2>
            <Link href="/profile/settings">
              <button type="button">Edit</button>
            </Link>
          </div>
          Bio
          <p>{bio}</p>
          Email
          <p>
            {email}
            {!emailVerified ? (
              <>
                {' '}
                unverified
                {' '}
                {/* eslint-disable-next-line */}
                <a role="button" onClick={sendVerificationEmail}>
                  Send verification email
                </a>
              </>
            ) : null}
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default ProfilePage;
