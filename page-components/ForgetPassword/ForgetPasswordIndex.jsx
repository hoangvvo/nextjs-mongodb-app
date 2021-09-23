import { Button } from '@/components/Button';
import { ButtonLink } from '@/components/Button/Button';
import { Input } from '@/components/Input';
import { Spacer, Wrapper } from '@/components/Layout';
import Link from 'next/link';
import { useCallback } from 'react';
import styles from './ForgetPassword.module.css';

const ForgetPasswordIndex = () => {
  const onSubmit = useCallback(() => {}, []);
  return (
    <Wrapper className={styles.root}>
      <div className={styles.main}>
        <h1 className={styles.title}>Forget Password</h1>
        <p className={styles.subtitle}>
          Enter the email address associated with your account, and we&apos;ll
          send you a link to reset your password.
        </p>
        <Spacer size={1} />
        <form onSubmit={onSubmit}>
          <Input
            htmlType="email"
            autoComplete="email"
            placeholder="Email Address"
            ariaLabel="Email Address"
            size="large"
            required
          />
          <Spacer size={0.5} axis="vertical" />
          <Button
            htmlType="submit"
            className={styles.submit}
            type="success"
            size="large"
          >
            Continue
          </Button>
          <Spacer size={0.25} axis="vertical" />
          <Link href="/login" passHref>
            <ButtonLink type="success" size="large" variant="ghost">
              Return to login in
            </ButtonLink>
          </Link>
        </form>
      </div>
    </Wrapper>
  );
};

export default ForgetPasswordIndex;
