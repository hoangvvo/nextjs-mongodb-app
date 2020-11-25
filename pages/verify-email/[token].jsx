import React from 'react';
import Head from 'next/head';
import nc from 'next-connect';
import { all } from '@/middlewares/index';
import { updateUserById, findAndDeleteTokenByIdAndType } from '@/db/index';

export default function EmailVerifyPage({ success }) {
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <style jsx>
        {`
        p {
          text-align: center;
        }
      `}
      </style>
      <p>{success ? 'Thank you for verifying your email address. You may close this page.' : 'This link may have been expired.'}</p>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const handler = nc();
  handler.use(all);
  await handler.run(ctx.req, ctx.res);

  const { token } = ctx.query;

  const deletedToken = await findAndDeleteTokenByIdAndType(ctx.req.db, token, 'emailVerify');

  if (!deletedToken) return { props: { success: false } };

  await updateUserById(ctx.req.db, deletedToken.creatorId, { emailVerified: true });

  return { props: { success: true } };
}
