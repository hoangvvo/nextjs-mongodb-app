import React from 'react';
import { useCurrentUser } from '@/hooks/index';
import PostEditor from '@/components/post/editor';
import Posts from '@/components/post/posts';

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
          h3 {
            color: #555;
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
        <h3>
          All posts from the Web
          {' '}
          <span role="img" aria-label="Earth">🌎</span>
        </h3>
        <PostEditor />
        <Posts />
      </div>
    </>
  );
};

export default IndexPage;
