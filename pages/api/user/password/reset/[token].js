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
  try {
    if (!req.body.password) throw new Error('No password provided.');
    const { value: tokenDoc } = await req.db
      .collection('tokens')
      .findOneAndDelete({ _id: req.query.token, type: 'passwordReset' });
    if (!tokenDoc) throw new Error('This link may have been expired.');
    const password = await bcrypt.hash(req.body.password, 10);
    await req.db
      .collection('users')
      .updateOne({ _id: tokenDoc.userId }, { $set: { password } });
    res.json({ message: 'Your password has been updated.' });
  } catch (error) {
    res.json({
      ok: false,
      message: error.toString(),
    });
  }
});

export default handler;
