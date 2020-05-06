import React from 'react';
import useSWR, { useSWRPages } from 'swr';
import fetcher from '../../lib/fetch';

function Post({ post }) {
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
        <p>
          {post.content}
        </p>
        <small>{new Date(post.createdAt).toLocaleString()}</small>
      </div>
    </>
  );
}

export const usePostPages = () => {
  const pageKey = 'post-pages';
  const limit = 10;

  const hookProps = useSWRPages(
    pageKey,
    ({ offset, withSWR }) => {
      const { data: { posts } = {} } = withSWR(useSWR(`/api/posts?from=${offset || ''}&limit=${limit}`, fetcher));
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

export default function Posts() {
  const {
    pages, isLoadingMore, isReachingEnd, loadMore,
  } = usePostPages(10);

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
