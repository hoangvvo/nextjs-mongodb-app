import { Spacer, Wrapper } from '@/components/Layout';
import { Post } from '@/components/Post';
import { useCurrentUser } from '@/lib/user';
import { PERMISSION } from 'constants/permission';
import { checkPermission } from 'utils';
import Commenter from './Commenter';
import CommentList from './CommentList';
import styles from './UserPost.module.css';

export const UserPost = ({ post }) => {
  const { data } = useCurrentUser();
  const isEdit = checkPermission(data, PERMISSION.POST.POST_EDIT);
  return (
    <Wrapper>
      <Spacer size={2} axis="vertical" />
      <Post post={post} isEdit={isEdit} />
      <h3 className={styles.subtitle}>Comments</h3>
      <Commenter post={post} />
      <CommentList post={post} />
    </Wrapper>
  );
};
