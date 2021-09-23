import { findAndDeleteTokenByIdAndType, updateUserById } from '@/api-lib/db';
import { auth, database } from '@/api-lib/middlewares';
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

export async function getServerSideProps(context) {
  const handler = nc(ncOpts);
  handler.use(database, auth);
  await handler.run(context.req, context.res);

  const { token } = context.query;

  const deletedToken = await findAndDeleteTokenByIdAndType(
    context.req.db,
    token,
    'emailVerify'
  );

  if (!deletedToken) return { props: { valid: false } };

  await updateUserById(context.req.db, deletedToken.creatorId, {
    emailVerified: true,
  });

  return { props: { valid: true } };
}
