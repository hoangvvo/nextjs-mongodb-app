import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import nextConnect from 'next-connect';
import database from '../../../../../middlewares/database';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const handler = nextConnect();

handler.use(database);

handler.post(async (req, res) => {
  try {
    const user = await req.db
      .collection('users')
      .findOne({ email: req.body.email });
    if (!user) throw new Error('This email is not associated with any account.');
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
      templateId: process.env.SENDGRID_TEMPLATEID_PASSWORDRESET,
      dynamic_template_data: {
        subject: '[nextjs-mongodb-app] Reset your password.',
        name: user.name,
        url: `${process.env.WEB_URI}/forgetpassword/${token}`,
      },
    };
    await sgMail.send(msg);
    res.json({ message: 'An email has been sent to your inbox.' });
  } catch (error) {
    res.json({
      ok: false,
      message: error.toString(),
    });
  }
});

export default handler;
