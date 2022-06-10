import { ValidateProps } from '@/api-lib/constants';
import { updateUserPasswordByOldPassword } from '@/api-lib/db';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);
handler.use(...auths);

handler.put(
  validateBody({
    type: 'object',
    properties: {
      oldPassword: ValidateProps.user.password,
      newPassword: ValidateProps.user.password,
    },
    required: ['oldPassword', 'newPassword'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      res.json(401).end();
      return;
    }

    const db = await getMongoDb();

    const { oldPassword, newPassword } = req.body;

    const success = await updateUserPasswordByOldPassword(
      db,
      req.user._id,
      oldPassword,
      newPassword
    );

    if (!success) {
      res.status(401).json({
        error: { message: 'The old password you entered is incorrect.' },
      });
      return;
    }

    res.status(204).end();
  }
);

export default handler;
