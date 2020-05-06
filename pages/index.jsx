import React from 'react';
import { useCurrentUser } from '../lib/hooks';
import PostEditor from '../components/post/editor';
import Posts from '../components/post/posts';

const IndexPage = () => {
  const [user] = useCurrentUser();

  return (
    <>
      <style jsx>
        {`
          p {
            text-align: center;
            color: #888;
          }
        `}
      </style>
      <div style={{ marginBottom: '2rem' }}>
        <h2>
          Hello,
          {' '}
          {user ? user.name : 'stranger'}
          !
        </h2>
        <p>Have a wonderful day.</p>
      </div>
      <div>
        <PostEditor />
        <Posts />
      </div>
    </>
  );
};

export default IndexPage;
