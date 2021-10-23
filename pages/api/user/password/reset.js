import { ValidateProps } from '@/api-lib/constants';
import {
  createToken,
  findAndDeleteTokenByIdAndType,
  findUserByEmail,
  UNSAFE_updateUserPassword,
} from '@/api-lib/db';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
import { database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import normalizeEmail from 'validator/lib/normalizeEmail';

const handler = nc(ncOpts);

handler.use(database);

handler.post(
  validateBody({
    type: 'object',
    properties: {
      email: ValidateProps.user.email,
    },
    required: ['email'],
    additionalProperties: false,
  }),
  async (req, res) => {
    const email = normalizeEmail(req.body.email);
    const user = await findUserByEmail(req.db, email);
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
      to: email,
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
  }
);

handler.put(
  validateBody({
    type: 'object',
    properties: {
      password: ValidateProps.user.password,
      token: { type: 'string', minLength: 0 },
    },
    required: ['password', 'token'],
    additionalProperties: false,
  }),
  async (req, res) => {
    const deletedToken = await findAndDeleteTokenByIdAndType(
      req.db,
      req.body.token,
      'passwordReset'
    );
    if (!deletedToken) {
      res.status(403).send('This link may have been expired.');
      return;
    }
    await UNSAFE_updateUserPassword(
      req.db,
      deletedToken.creatorId,
      req.body.password
    );
    res.end('ok');
  }
);

export default handler;
