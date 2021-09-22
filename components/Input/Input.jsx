import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(function Input(
  { label, placeholder, className },
  ref
) {
  return (
    <div className={clsx(styles.root, className)}>
      <label>
        {label && <div className={styles.label}>{label}</div>}
        <input placeholder={placeholder} ref={ref} className={styles.input} />
      </label>
    </div>
  );
});

export default Input;
