import nc from 'next-connect';
import { sendMail } from '@/lib/mail';
import { all } from '@/middlewares/index';
import { insertToken } from '@/db/index';

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  if (!req.user) { res.json(401).send('you need to be authenticated'); return; }

  const token = await insertToken(req.db, {
    creatorId: req.user._id,
    type: 'emailVerify',
    expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });

  const msg = {
    to: req.user.email,
    from: process.env.EMAIL_FROM,
    subject: `Verification Email for ${process.env.WEB_URI}`,
    html: `
      <div>
        <p>Hello, ${req.user.name}</p>
        <p>Please follow <a href="${process.env.WEB_URI}/verify-email/${token._id}">this link</a> to confirm your email.</p>
      </div>
      `,
  };
  await sendMail(msg);
  res.end('ok');
});

export default handler;
