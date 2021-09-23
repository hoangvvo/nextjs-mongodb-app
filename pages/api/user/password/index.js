import { ValidateProps } from '@/api-lib/constants';
import { UNSAFE_findUserForAuth, updateUserById } from '@/api-lib/db';
import { auth, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import bcrypt from 'bcryptjs';
import nc from 'next-connect';

const handler = nc(ncOpts);
handler.use(database, auth);

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
    const { oldPassword, newPassword } = req.body;

    if (
      !(await bcrypt.compare(
        oldPassword,
        (
          await UNSAFE_findUserForAuth(req.db, req.user._id, true)
        ).password
      ))
    ) {
      res.status(401).json({
        error: { message: 'The old password you entered is incorrect.' },
      });
      return;
    }
    const password = await bcrypt.hash(newPassword, 10);

    await updateUserById(req.db, req.user._id, { password });

    res.status(204).end();
  }
);

export default handler;
