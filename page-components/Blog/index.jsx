import { Spacer } from '@/components/Layout';
import styles from './styles.module.css';
import PostList from './PostList';

export const Post = () => {
  return (
    <div className={styles.root}>
      <Spacer size={1} axis="vertical" />
      <PostList />
    </div>
  );
};
