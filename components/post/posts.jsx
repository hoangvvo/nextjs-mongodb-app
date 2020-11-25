import React from 'react';
import { useSWRInfinite } from 'swr';
import Link from 'next/link';
import { useUser } from '@/hooks/index';
import fetcher from '@/lib/fetch';
import { defaultProfilePicture } from '@/lib/default';

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
          <Link href={`/user/${user._id}`}>
            <a style={{ display: 'inline-flex', alignItems: 'center' }}>
              <img width="27" height="27" style={{ borderRadius: '50%', objectFit: 'cover', marginRight: '0.3rem' }} src={user.profilePicture || defaultProfilePicture(user._id)} alt={user.name} />
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

const PAGE_SIZE = 10;

export function usePostPages({ creatorId } = {}) {
  return useSWRInfinite((index, previousPageData) => {
    // reached the end
    if (previousPageData && previousPageData.posts.length === 0) return null;

    // first page, previousPageData is null
    if (index === 0) {
      return `/api/posts?limit=${PAGE_SIZE}${
        creatorId ? `&by=${creatorId}` : ''
      }`;
    }

    // using oldest posts createdAt date as cursor
    // We want to fetch posts which has a datethat is
    // before (hence the .getTime() - 1) the last post's createdAt
    const from = new Date(
      new Date(
        previousPageData.posts[previousPageData.posts.length - 1].createdAt,
      ).getTime() - 1,
    ).toJSON();

    return `/api/posts?from=${from}&limit=${PAGE_SIZE}${
      creatorId ? `&by=${creatorId}` : ''
    }`;
  }, fetcher, {
    refreshInterval: 10000, // Refresh every 10 seconds
  });
}

export default function Posts({ creatorId }) {
  const {
    data, error, size, setSize,
  } = usePostPages({ creatorId });

  const posts = data ? data.reduce((acc, val) => [...acc, ...val.posts], []) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0].posts?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.posts.length < PAGE_SIZE);

  return (
    <div>
      {posts.map((post) => <Post key={post._id} post={post} />)}
      {!isReachingEnd && (
      <button
        type="button"
        style={{
          background: 'transparent',
          color: '#000',
        }}
        onClick={() => setSize(size + 1)}
        disabled={isReachingEnd || isLoadingMore}
      >
        {isLoadingMore ? '. . .' : 'load more'}
      </button>
      )}
    </div>
  );
}
