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
    res.status(403).end('This link may have been expired.');
    return;
  }

  await req.db
    .collection('users')
    .updateOne({ _id: tokenDoc.userId }, { $set: { emailVerified: true } });

  res.end('Thank you for verifying your email address. You may close this page.');
});

export default handler;
