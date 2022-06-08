import { Spacer } from '@/components/Layout';
import { useCurrentUser } from '@/lib/user';
import styles from './Post.module.css';
import Poster from './Poster';
import PostList from './PostList';

export const Post = () => {
  const { data, error } = useCurrentUser();

  return (
    <div className={styles.root}>
      <Spacer size={1} axis="vertical" />
      <Poster data={data} error={error} />
      <PostList user={data?.user} />
    </div>
  );
};
