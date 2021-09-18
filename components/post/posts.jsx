import { defaultProfilePicture } from '@/lib/default';
import { usePostPages } from '@/lib/post';
import { useUser } from '@/lib/user';
import Link from 'next/link';

function Post({ post }) {
  const user = useUser(post.creatorId);
  return (
    <>
      <style jsx>
        {`
          div {
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
            padding: 1.5rem;
            margin-bottom: 0.5rem;
            transition: box-shadow 0.2s ease 0s;
          }
          div:hover {
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
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
              <img
                width="27"
                height="27"
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: '0.3rem',
                }}
                src={user.profilePicture || defaultProfilePicture(user._id)}
                alt={user.name}
              />
              <b>{user.name}</b>
            </a>
          </Link>
        )}
        <p>{post.content}</p>
        <small>{new Date(post.createdAt).toLocaleString()}</small>
      </div>
    </>
  );
}

const PAGE_SIZE = 10;

export default function Posts({ creatorId }) {
  const { data, error, size, setSize } = usePostPages({
    creatorId,
    limit: PAGE_SIZE,
  });
  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.posts?.length < PAGE_SIZE);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
      {!isEmpty && (
        <button
          style={{
            background: 'transparent',
            color: '#000',
          }}
          onClick={() => setSize(size + 1)}
          disabled={isLoadingMore || isReachingEnd}
        >
          {isLoadingMore
            ? 'loading...'
            : isReachingEnd
            ? 'no more issues'
            : 'load more'}
        </button>
      )}
    </div>
  );
}
