import React, { useState } from 'react';
import axioswal from 'axioswal';
import Layout from '../../components/layout';
import redirectTo from '../../lib/redirectTo';

const ResetPasswordTokenPage = ({ valid, token }) => {
  const [password, setPassword] = useState('');
  function handleSubmit(event) {
    event.preventDefault();
    axioswal.post(`/api/user/password/reset/${token}`, { password }).then((resp) => {
      if (!resp.error) {
        redirectTo('/');
      }
    });
  }

  return (
    <Layout>
      <h2>Forget password</h2>
      {valid ? (
        <>
          <p>Enter your new password.</p>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
            >
              Set new password
            </button>
          </form>

        </>
      ) : <p>This link may have been expired</p>}

    </Layout>
  );
};

ResetPasswordTokenPage.getInitialProps = async (ctx) => {
  const { token } = ctx.query;
  const valid = await axioswal.post(`${process.env.WEB_URI}/api/user/password/reset/${token}`, {}, null, { noSwal: true }).then(res => Boolean(res));
  return { token, valid };
};

export default ResetPasswordTokenPage;
