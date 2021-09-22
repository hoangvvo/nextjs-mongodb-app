import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Layout';
import { useUser } from '@/lib/user';
import { format } from '@lukeed/ms';
import clsx from 'clsx';
import { useMemo } from 'react';
import styles from './Post.module.css';

const _now = Date.now();

const Post = ({ post, className }) => {
  const { data: { user } = {} } = useUser(post.creatorId);
  const timestampTxt = useMemo(
    () => format(_now - new Date(post.createdAt).getTime(), true),
    [post.createdAt]
  );
  return (
    <div className={clsx(styles.root, className)}>
      <Container>
        <Avatar
          size={36}
          url={user?.profilePicture}
          username={user?.username || '?'}
        />
        <Container column className={styles.meta}>
          <p className={styles.name}>{user?.name}</p>
          <p className={styles.username}>{user?.username}</p>
        </Container>
      </Container>
      <div className={styles.wrap}>
        <p className={styles.content}>{post.content}</p>
      </div>
      <div className={styles.wrap}>
        <p className={styles.timestamp}>{timestampTxt} ago</p>
      </div>
    </div>
  );
};

export default Post;
