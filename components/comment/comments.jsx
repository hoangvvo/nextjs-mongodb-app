import { useCommentPages } from '@/lib/comment';
import { defaultProfilePicture } from '@/lib/default';
import { useUser } from '@/lib/user';
import Link from 'next/link';

export function Comment({ comment }) {
  const user = useUser(comment.creatorId);
  return (
    <>
      <style jsx>
        {`
          .comment {
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
            padding: 1.5rem;
            margin-bottom: 0.5rem;
            transition: box-shadow 0.2s ease 0s;
            display: block;
          }
          small {
            color: #777;
          }
        `}
      </style>

      <div className="comment">
        {user && (
          <Link href={`/user/${user.username}`}>
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
        <p>{comment.content}</p>
        <small>{new Date(comment.createdAt).toLocaleString()}</small>
      </div>
    </>
  );
}

const PAGE_SIZE = 10;

export default function Comments({ postId }) {
  const { data, error, size, setSize } = useCommentPages({
    postId,
    limit: PAGE_SIZE,
  });
  const comments = data
    ? data.reduce((acc, val) => [...acc, ...val.comments], [])
    : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.comments?.length < PAGE_SIZE);

  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
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
            ? 'no more comments'
            : 'load more'}
        </button>
      )}
    </div>
  );
}
