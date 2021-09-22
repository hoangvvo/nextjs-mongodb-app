import { UNSAFE_findUserForAuth, updateUserById } from '@/api-lib/db';
import { all } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import bcrypt from 'bcryptjs';
import nc from 'next-connect';

const handler = nc(ncOpts);
handler.use(all);

handler.put(async (req, res) => {
  if (!req.user) {
    res.json(401).send('you need to be authenticated');
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
    res.status(401).send('The password you has entered is incorrect.');
    return;
  }
  const password = await bcrypt.hash(newPassword, 10);

  await updateUserById(req.db, req.user._id, { password });

  res.end('ok');
});

export default handler;
