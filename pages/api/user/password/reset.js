import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import nextConnect from 'next-connect';
import database from '../../../../middlewares/database';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const handler = nextConnect();

handler.use(database);

handler.post(async (req, res) => {
  const user = await req.db
    .collection('users')
    .findOne({ email: req.body.email });
  if (!user) {
    res.status(401).send('The email is not found');
    return;
  }
  const token = crypto.randomBytes(32).toString('hex');
  await req.db.collection('tokens').insertOne({
    token,
    userId: user._id,
    type: 'passwordReset',
    expireAt: new Date(Date.now() + 1000 * 60 * 20),
  });
  const msg = {
    to: user.email,
    from: process.env.EMAIL_FROM,
    subject: '[nextjs-mongodb-app] Reset your password.',
    html: `
      <div>
        <p>Hello, ${user.name}</p>
        <p>Please follow <a href="${process.env.WEB_URI}/forget-password/${token}">this link</a> to reset your password.</p>
      </div>
      `,
  };
  await sgMail.send(msg);
  res.end('ok');
});

handler.put(async (req, res) => {
  // password reset
  if (!req.body.password) {
    req.status(400).send('Password not provided');
    return;
  }
  const { value: tokenDoc } = await req.db
    .collection('tokens')
    .findOneAndDelete({ _id: req.body.token, type: 'passwordReset' });
  if (!tokenDoc) {
    req.status(403).send('This link may have been expired.');
    return;
  }
  const password = await bcrypt.hash(req.body.password, 10);
  await req.db
    .collection('users')
    .updateOne({ _id: tokenDoc.userId }, { $set: { password } });
  res.end('ok');
});

export default handler;
