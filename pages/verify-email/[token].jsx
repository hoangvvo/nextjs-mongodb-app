import { findAndDeleteTokenByIdAndType, updateUserById } from '@/api-lib/db';
import { all } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import Head from 'next/head';
import { VerifyEmail } from 'page-components/VerifyEmail';

export default function EmailVerifyPage({ valid }) {
  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <VerifyEmail valid={valid} />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const handler = nc(ncOpts);
  handler.use(all);
  await handler.run(ctx.req, ctx.res);

  const { token } = ctx.query;

  const deletedToken = await findAndDeleteTokenByIdAndType(
    ctx.req.db,
    token,
    'emailVerify'
  );

  if (!deletedToken) return { props: { valid: false } };

  await updateUserById(ctx.req.db, deletedToken.creatorId, {
    emailVerified: true,
  });

  return { props: { valid: true } };
}
