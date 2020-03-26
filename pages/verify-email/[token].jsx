import React from 'react';
import Head from 'next/head';
import nextConnect from 'next-connect';
import database from '../../middlewares/database';

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
  const handler = nextConnect();
  handler.use(database);
  await handler.apply(ctx.req, ctx.res);

  const { token } = ctx.query;
  const { value: tokenDoc } = await ctx.req.db
    .collection('tokens')
    .findOneAndDelete({ token, type: 'emailVerify' });

  if (!tokenDoc) {
    return { props: { success: false } };
  }

  await ctx.req.db
    .collection('users')
    .updateOne({ _id: tokenDoc.userId }, { $set: { emailVerified: true } });

  return { props: { success: true } };
}
