import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './Button.module.css';

export const Button = forwardRef(function Button(
  { children, type, className, onClick },
  ref
) {
  return (
    <button
      className={clsx(styles.button, type && styles[type], className)}
      ref={ref}
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  );
});

export const ButtonLink = forwardRef(function Button(
  { children, type, className, href, onClick },
  ref
) {
  return (
    <a
      className={clsx(styles.button, type && styles[type], className)}
      ref={ref}
      href={href}
      onClick={onClick}
    >
      <span>{children}</span>
    </a>
  );
});
