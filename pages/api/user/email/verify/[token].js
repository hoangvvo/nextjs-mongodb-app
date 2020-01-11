import nextConnect from 'next-connect';
import database from '../../../../../middlewares/database';

const handler = nextConnect();

handler.use(database);

handler.get(async (req, res) => {
  const { token } = req.query;
  const { value: tokenDoc } = await req.db
    .collection('tokens')
    .findOneAndDelete({ token, type: 'emailVerify' });

  if (!tokenDoc) {
    return res.status(401).json({
      ok: false,
      message: 'This link may have been expired.',
    });
  }

  await req.db
    .collection('users')
    .updateOne({ _id: tokenDoc.userId }, { $set: { emailVerified: true } });

  return res.json({
    ok: true,
    message: 'Success! Thank you for verifying your email address. You may close this page.',
  });
});

export default handler;
