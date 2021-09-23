import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Container, Wrapper } from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { Text, TextLink } from '@/components/Text';
import { useCurrentUser } from '@/lib/user';
import Link from 'next/link';
import styles from './Poster.module.css';

const Inner = ({ user }) => {
  return (
    <Container className={styles.poster}>
      <Avatar size={40} username={user.username} url={user.profilePicture} />
      <Input
        className={styles.input}
        placeholder={`What's on your mind, ${user.name}?`}
      />
      <Button type="success">Post</Button>
    </Container>
  );
};

const Poster = () => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    <Wrapper>
      <div className={styles.root}>
        <h3 className={styles.heading}>Share your thoughts</h3>
        {loading ? (
          <LoadingDots>Loading</LoadingDots>
        ) : false ? (
          <Inner user={data.user} />
        ) : (
          <Text color="secondary">
            Please{' '}
            <Link href="/login" passHref>
              <TextLink color="link" variant="highlight">
                sign in
              </TextLink>
            </Link>{' '}
            to post
          </Text>
        )}
      </div>
    </Wrapper>
  );
};

export default Poster;
