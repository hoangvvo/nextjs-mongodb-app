import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Container, Spacer } from '@/components/Layout';
import { useCurrentUser } from '@/lib/user';
import styles from './Poster.module.css';

const Inner = ({ user }) => {
  return (
    <>
      <Avatar size={40} username={user.username} url={user.profilePicture} />
      <Input
        className={styles.input}
        placeholder="Post something to the internet"
      />
      <Spacer size={1} axis="horizontal" />
      <Button>Post</Button>
    </>
  );
};

const Poster = () => {
  const { data: { user } = {} } = useCurrentUser();
  console.log(user);
  return (
    <Container className={styles.root}>
      {user ? <Inner user={user} /> : <p>Please sign in to post</p>}
    </Container>
  );
};

export default Poster;
