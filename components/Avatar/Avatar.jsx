import styles from './Avatar.module.css';

const Avatar = ({ size, username, url }) => {
  return (
    <img
      className={styles.avatar}
      src={url || '/images/default_user.jpg'}
      alt={username}
      width={size}
      height={size}
    />
  );
};

export default Avatar;
