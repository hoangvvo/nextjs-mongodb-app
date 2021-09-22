import clsx from 'clsx';
import styles from './Container.module.css';

const Container = ({
  justifyContent,
  flex,
  alignItems,
  column,
  className,
  children,
}) => {
  return (
    <div
      className={clsx(styles.container, column && styles.column, className)}
      style={{
        justifyContent,
        flex,
        alignItems,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
