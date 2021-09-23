import { findTokenByIdAndType } from '@/api-lib/db';
import { database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
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
