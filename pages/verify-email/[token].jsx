import { findAndDeleteTokenByIdAndType, updateUserById } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import { VerifyEmail } from '@/page-components/VerifyEmail';
import Head from 'next/head';

export default function EmailVerifyPage({ valid }) {
  return (
    <>
      <Head>
        <title>Email verification</title>
      </Head>
      <VerifyEmail valid={valid} />
    </>
  );
}

export async function getServerSideProps(context) {
  const db = await getMongoDb();

  const { token } = context.params;

  const deletedToken = await findAndDeleteTokenByIdAndType(
    db,
    token,
    'emailVerify'
  );

  if (!deletedToken) return { props: { valid: false } };

  await updateUserById(db, deletedToken.creatorId, {
    emailVerified: true,
  });

  return { props: { valid: true } };
}
