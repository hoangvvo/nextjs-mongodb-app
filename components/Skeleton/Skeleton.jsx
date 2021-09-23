import clsx from 'clsx';
import styles from './Skeleton.module.css';

const Skeleton = ({ width, height, className, children, hide }) => {
  return (
    <span
      className={clsx(!hide && styles.skeleton, className)}
      style={{ width, height }}
    >
      {children}
    </span>
  );
};

export default Skeleton;
