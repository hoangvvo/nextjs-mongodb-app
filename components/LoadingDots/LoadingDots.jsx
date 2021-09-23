import styles from './LoadingDots.module.css';

const LoadingDots = ({ children }) => {
  return (
    <span className={styles.loading}>
      {children && <div className={styles.child}>{children}</div>}
      <span />
      <span />
      <span />
    </span>
  );
};

export default LoadingDots;
