import styles from './Avatar.module.css';

const Avatar = ({ style, size, username, url }) => {
  return (
    <img
      style={style}
      className={styles.avatar}
      src={url || '/images/default_user.jpg'}
      alt={username}
      width={size}
      height={size}
    />
  );
};

export default Avatar;
