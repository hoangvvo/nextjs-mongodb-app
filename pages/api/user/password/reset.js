import {
  createToken,
  findAndDeleteTokenByIdAndType,
  findUserByEmail,
  updateUserById,
} from '@/api-lib/db';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
import { database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import bcrypt from 'bcryptjs';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.post(async (req, res) => {
  const user = await findUserByEmail(req.db, req.body.email);
  if (!user) {
    res.status(401).send('The email is not found');
    return;
  }

  const token = await createToken(req.db, {
    creatorId: user._id,
    type: 'passwordReset',
    expireAt: new Date(Date.now() + 1000 * 60 * 20),
  });

  await sendMail({
    to: user.email,
    from: MAIL_CONFIG.from,
    subject: '[nextjs-mongodb-app] Reset your password.',
    html: `
      <div>
        <p>Hello, ${user.name}</p>
        <p>Please follow <a href="${process.env.WEB_URI}/forget-password/${token._id}">this link</a> to reset your password.</p>
      </div>
      `,
  });

  res.end('ok');
});

handler.put(async (req, res) => {
  // password reset
  if (!req.body.password) {
    res.status(400).send('Password not provided');
    return;
  }

  const deletedToken = await findAndDeleteTokenByIdAndType(
    req.db,
    req.body.token,
    'passwordReset'
  );

  if (!deletedToken) {
    res.status(403).send('This link may have been expired.');
    return;
  }
  const password = await bcrypt.hash(req.body.password, 10);
  await updateUserById(req.db, deletedToken.creatorId, { password });
  res.end('ok');
});

export default handler;
