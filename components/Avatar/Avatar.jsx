import styles from './Avatar.module.css';

const Avatar = ({ size, username, url }) => {
  if (!url)
    return (
      <span className={styles.avatar} style={{ width: size, height: size }}>
        {username[0]}
      </span>
    );
  return (
    <img
      className={styles.avatar}
      src={url}
      alt={username}
      width={size}
      height={size}
    />
  );
};

export default Avatar;
