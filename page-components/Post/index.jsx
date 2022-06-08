import { Spacer } from '@/components/Layout';
import styles from './Feed.module.css';
import Poster from './Poster';
import PostList from './PostList';

export const Post = () => {
  return (
    <div className={styles.root}>
      <Spacer size={1} axis="vertical" />
      <Poster />
      <PostList />
    </div>
  );
};
