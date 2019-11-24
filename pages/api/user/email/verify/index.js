import crypto from 'crypto';
import sgMail from '@sendgrid/mail';
import nextConnect from 'next-connect';
import middleware from '../../../../../middlewares/middleware';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  if (!req.user) return res.status(401).send('You need to be logged in.');
  const token = crypto.randomBytes(32).toString('hex');
  await req.db
    .collection('tokens')
    .insertOne({
      token,
      userId: req.user._id,
      type: 'emailVerify',
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
  const msg = {
    to: req.user.email,
    from: process.env.EMAIL_FROM,
    templateId: process.env.SENDGRID_TEMPLATEID_EMAILVERIFY,
    dynamic_template_data: {
      subject: '[nextjs-mongodb-app] Please verify your email address.',
      name: req.user.name,
      url: `${process.env.WEB_URI}/api/user/email/verify/${token}`,
    },
  };
  await sgMail.send(msg);
  return res.json({ message: 'An email has been sent to your inbox.' });
});

export default handler;
