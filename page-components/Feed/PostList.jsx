import { Post } from '@/components/Post';
import { usePostPages } from '@/lib/post';
import Link from 'next/link';
import styles from './PostList.module.css';
const PAGE_SIZE = 10;

const PostList = () => {
  const { data, error, size, setSize } = usePostPages({
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
        <Link key={post._id} href={`/user/${post.creatorId}/${post._id}`}>
          <a className={styles.wrapper}>
            <Post className={styles.post} post={post} />
          </a>
        </Link>
      ))}
    </div>
  );
};

export default PostList;
