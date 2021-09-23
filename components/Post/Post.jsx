import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Layout';
import { format } from '@lukeed/ms';
import clsx from 'clsx';
import { useMemo } from 'react';
import styles from './Post.module.css';

const _now = Date.now();

const Post = ({ post, className }) => {
  const timestampTxt = useMemo(
    () => format(_now - new Date(post.createdAt).getTime(), true),
    [post.createdAt]
  );
  return (
    <div className={clsx(styles.root, className)}>
      <Container>
        <Avatar
          size={36}
          url={post.creator.profilePicture}
          username={post.creator.username}
        />
        <Container column className={styles.meta}>
          <p className={styles.name}>{post.creator.name}</p>
          <p className={styles.username}>{post.creator.username}</p>
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
