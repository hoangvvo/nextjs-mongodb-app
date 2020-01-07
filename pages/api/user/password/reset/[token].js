import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import database from '../../../../../middlewares/database';

const handler = nextConnect();

handler.use(database);

handler.post(async (req, res) => {
  // check valid token
  const tokenDoc = await req.db.collection('tokens').findOne({
    token: req.query.token,
    type: 'passwordReset',
  });
  res.end(tokenDoc ? 'true' : 'false');
});

handler.put(async (req, res) => {
  // password reset
  if (!req.body.password) return res.status(400).end();
  const { value: tokenDoc } = await req.db
    .collection('tokens')
    .findOneAndDelete({ _id: req.query.token, type: 'passwordReset' });

  if (!tokenDoc) {
    return res.status(200).json({
      status: 'error',
      message: 'This link may have been expired.',
    });
  }

  const password = await bcrypt.hash(req.body.password);

  await req.db
    .collection('users')
    .updateOne({ _id: tokenDoc.userId }, { $set: { password } });

  return res.json({ message: 'Your password has been updated.' });
});

export default handler;
