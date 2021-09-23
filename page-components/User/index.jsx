import { Avatar } from '@/components/Avatar';
import { Container, Wrapper } from '@/components/Layout';
import styles from './User.module.css';

export const User = ({ user }) => {
  return (
    <Wrapper>
      <Container className={styles.header} column alignItems="center">
        <div className={styles.avatar}>
          <Avatar
            size={168}
            username={user.username}
            url={user.profilePicture}
          />
        </div>
        <h1>
          <div className={styles.name}>{user.name}</div>
          <div className={styles.username}>@{user.username}</div>
        </h1>
        <p className={styles.bio}>{user.bio}</p>
      </Container>
    </Wrapper>
  );
};
