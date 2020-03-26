import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useUser } from '../../lib/hooks';

const ProfilePage = () => {
  const [user] = useUser();
  const {
    name, email, bio, profilePicture, emailVerified,
  } = user || {};

  async function sendVerificationEmail() {
    await fetch('/api/user/email/verify', {
      method: 'POST',
    });
  }

  if (!user) {
    return (
      <p>Please sign in</p>
    );
  }
  return (
    <>
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
    </>
  );
};

export default ProfilePage;
