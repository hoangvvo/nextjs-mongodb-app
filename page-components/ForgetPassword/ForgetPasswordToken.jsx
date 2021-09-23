import { Button } from '@/components/Button';
import { ButtonLink } from '@/components/Button/Button';
import { Input } from '@/components/Input';
import { Spacer, Wrapper } from '@/components/Layout';
import Link from 'next/link';
import { useCallback } from 'react';
import styles from './ForgetPassword.module.css';

const NewPassword = ({ token }) => {
  const onSubmit = useCallback(() => {}, []);
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Forget Password</h1>
      <p className={styles.subtitle}>Enter a new password for your account</p>
      <Spacer size={1} />
      <form onSubmit={onSubmit}>
        <Input
          htmlType="password"
          autoComplete="new-password"
          placeholder="New Password"
          ariaLabel="New Password"
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
          Reset Password
        </Button>
        <Spacer size={0.25} axis="vertical" />
        <Link href="/login" passHref>
          <ButtonLink type="success" size="large" variant="ghost">
            Return to login
          </ButtonLink>
        </Link>
      </form>
    </div>
  );
};

const BadLink = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Forget Password</h1>
      <p className={styles.subtitle}>
        It looks like you may have clicked on an invalid link. Please close this
        window and try again.
      </p>
      <Spacer size={1} />
      <Link href="/login" passHref>
        <ButtonLink type="success" size="large" variant="ghost">
          Return to login
        </ButtonLink>
      </Link>
    </div>
  );
};

const ForgetPasswordToken = ({ valid, token }) => {
  const onSubmit = useCallback(() => {}, []);
  return (
    <Wrapper className={styles.root}>
      {valid ? <NewPassword token={token} /> : <BadLink />}
    </Wrapper>
  );
};

export default ForgetPasswordToken;
