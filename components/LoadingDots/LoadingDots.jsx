import clsx from 'clsx';
import styles from './LoadingDots.module.css';

const LoadingDots = ({ children, className }) => {
  return (
    <span className={clsx(styles.loading, className)}>
      {children && <div className={styles.child}>{children}</div>}
      <span />
      <span />
      <span />
    </span>
  );
};

export default LoadingDots;
