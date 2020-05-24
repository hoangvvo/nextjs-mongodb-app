import React from 'react';
import useSWR, { useSWRPages } from 'swr';
import Link from 'next/link';
import { useUser } from '../../lib/hooks';
import fetcher from '../../lib/fetch';

function Post({ post }) {
  const user = useUser(post.creatorId);
  return (
    <>
      <style jsx>
        {`
          div {
            box-shadow: 0 5px 10px rgba(0,0,0,0.12);
            padding: 1.5rem;
            margin-bottom: 0.5rem;
            transition: box-shadow 0.2s ease 0s;
          }
          div:hover {
            box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          }
          small {
            color: #777;
          }
        `}
      </style>
      <div>
        {user && (
          <Link href="/user/[userId]" as={`/user/${user._id}`}>
            <a style={{ display: 'inline-flex', alignItems: 'center' }}>
              <img width="27" height="27" style={{ borderRadius: '50%', objectFit: 'cover', marginRight: '0.3rem' }} src={user.profilePicture} alt={user.name} />
              <b>{user.name}</b>
            </a>
          </Link>
        )}
        <p>
          {post.content}
        </p>
        <small>{new Date(post.createdAt).toLocaleString()}</small>
      </div>
    </>
  );
}

export const usePostPages = ({ creatorId } = {}) => {
  const pageKey = `post-pages-${creatorId || 'all'}`;
  const limit = 10;

  const hookProps = useSWRPages(
    pageKey,
    ({ offset, withSWR }) => {
      const { data: { posts } = {} } = withSWR(useSWR(`/api/posts?from=${offset || ''}&limit=${limit}&by=${creatorId || ''}`, fetcher));
      if (!posts) return <p>loading</p>;
      return posts.map((post) => <Post key={post._id} post={post} />);
    },
    ({ data }) => (data.posts && data.posts.length >= 10
      ? data.posts[data.posts.length - 1].createdAt // offset by date
      : null),
    [],
  );

  function revalidate() {
    // We do not have any way to revalidate all pages right now
    // Tracking at https://github.com/zeit/swr/issues/189

    // TODO: How do we do this?
  }

  return { ...hookProps, revalidate };
};

export default function Posts({ creatorId }) {
  const {
    pages, isLoadingMore, isReachingEnd, loadMore,
  } = usePostPages({ creatorId });

  return (
    <div>
      {pages}
      {!isReachingEnd && (
      <button
        type="button"
        style={{
          background: 'transparent',
          color: '#000',
        }}
        onClick={loadMore}
        disabled={isReachingEnd || isLoadingMore}
      >
        {isLoadingMore ? '. . .' : 'load more'}
      </button>
      )}
    </div>
  );
}
