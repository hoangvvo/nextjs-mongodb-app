import { findUserByUsername } from '@/api-lib/db';
import { database } from '@/api-lib/middlewares';
import { User } from '@/page-components/User';
import nc from 'next-connect';
import Head from 'next/head';

export default function UserPage({ user }) {
  return (
    <>
      <Head>
        <title>
          {user.name} (@{user.username})
        </title>
      </Head>
      <User user={user} />
    </>
  );
}

export async function getServerSideProps(context) {
  await nc().use(database).run(context.req, context.res);

  const user = await findUserByUsername(
    context.req.db,
    context.params.username
  );
  if (!user) {
    return {
      notFound: true,
    };
  }
  user._id = String(user._id);
  return { props: { user } };
}
