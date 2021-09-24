import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './Input.module.css';

const Textarea = forwardRef(function TextArea(
  {
    label,
    placeholder,
    className,
    htmlType,
    autoComplete,
    ariaLabel,
    required,
  },
  ref
) {
  return (
    <div className={clsx(styles.root, className)}>
      <label>
        {label && <div className={styles.label}>{label}</div>}
        <textarea
          type={htmlType}
          autoComplete={autoComplete}
          placeholder={placeholder}
          ref={ref}
          className={clsx(styles.textarea)}
          aria-label={ariaLabel}
          required={required}
        />
      </label>
    </div>
  );
});

export default Textarea;
