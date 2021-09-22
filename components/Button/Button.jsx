import { forwardRef } from 'react';
import styles from './Button.module.css';

export const Button = forwardRef(function Button({ children }, ref) {
  return (
    <button className={styles.button} ref={ref}>
      <span>{children}</span>
    </button>
  );
});
