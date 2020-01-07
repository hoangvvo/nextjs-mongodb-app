import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import middleware from '../../../../middlewares/middleware';

const handler = nextConnect();
handler.use(middleware);

handler.put(async (req, res) => {
  if (!req.user) return res.status(401).send('You need to be logged in.');
  const { oldPassword, newPassword } = req.body;
  if (!(await bcrypt.compare(oldPassword, req.user.password))) {
    return res.status(401).json({
      status: 'error',
      message: 'The password you has entered is incorrect',
    });
  }
  const password = await bcrypt.hash(newPassword);
  await req.db
    .collection('users')
    .updateOne({ _id: req.user._id }, { $set: { password } });
  return res.json({ message: 'Your password has been updated.' });
});

export default handler;
