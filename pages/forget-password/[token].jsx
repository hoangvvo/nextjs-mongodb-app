import { findTokenByIdAndType } from '@/api-lib/db';
import { database } from '@/api-lib/middlewares';
import { ForgetPasswordToken } from '@/page-components/ForgetPassword';
import nc from 'next-connect';
import Head from 'next/head';

const ResetPasswordTokenPage = ({ valid, token }) => {
  return (
    <>
      <Head>
        <title>Forget password</title>
      </Head>
      <ForgetPasswordToken valid={valid} token={token} />
    </>
  );
};

export async function getServerSideProps(context) {
  await nc().use(database).run(context.req, context.res);

  const tokenDoc = await findTokenByIdAndType(
    context.req.db,
    context.params.token,
    'passwordReset'
  );

  return { props: { token: context.params.token, valid: !!tokenDoc } };
}

export default ResetPasswordTokenPage;
