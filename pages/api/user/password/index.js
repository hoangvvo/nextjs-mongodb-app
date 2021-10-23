import { ValidateProps } from '@/api-lib/constants';
import { updateUserPasswordByOldPassword } from '@/api-lib/db';
import { all, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);
handler.use(all);

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
      res.json(401).send('you need to be authenticated');
      return;
    }
    const { oldPassword, newPassword } = req.body;

    const success = await updateUserPasswordByOldPassword(
      req.db,
      req.user._id,
      oldPassword,
      newPassword
    );

    if (!success) {
      res.status(401).send('The password you has entered is incorrect.');
      return;
    }

    res.end('ok');
  }
);

export default handler;
