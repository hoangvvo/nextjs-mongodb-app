import { findTokenByIdAndType } from '@/api-lib/db';
import { database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import Head from 'next/head';
import { useState } from 'react';

const ResetPasswordTokenPage = ({ valid, token }) => {
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const body = {
      password: event.currentTarget.password.value,
      token,
    };

    const res = await fetch('/api/user/password/reset', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      setSuccess(true);
    }
  }

  return (
    <>
      <Head>
        <title>Forget password</title>
      </Head>
      <h2>Forget password</h2>
      {success ? (
        <p>Your password has been updated!</p>
      ) : valid ? (
        <>
          <form onSubmit={handleSubmit}>
            <p>Enter your new password.</p>
            <label htmlFor="password">
              <input
                id="password"
                autoComplete="new-password"
                type="password"
                placeholder="New Password"
              />
            </label>
            <button type="submit">Set new password</button>
          </form>
        </>
      ) : (
        <p>This link may have been expired</p>
      )}
      <style jsx>{`
        p {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const handler = nc(ncOpts);
  handler.use(database);
  await handler.run(ctx.req, ctx.res);
  const { token } = ctx.query;

  const tokenDoc = await findTokenByIdAndType(
    ctx.req.db,
    ctx.query.token,
    'passwordReset'
  );

  return { props: { token, valid: !!tokenDoc } };
}

export default ResetPasswordTokenPage;
