import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import { all } from '@/middlewares/index';
import { updateUserById } from '@/db/index';

const handler = nc();
handler.use(all);

handler.put(async (req, res) => {
  if (!req.user) { res.json(401).send('you need to be authenticated'); return; }
  const { oldPassword, newPassword } = req.body;
  if (!(await bcrypt.compare(oldPassword, req.user.password))) {
    res.status(401).send('The password you has entered is incorrect.');
  }
  const password = await bcrypt.hash(newPassword, 10);

  await updateUserById(req.db, req.user._id, { password });

  res.end('ok');
});

export default handler;
