import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import middleware from '../../../../../middlewares/middleware';

const handler = nextConnect();
handler.use(middleware);

handler.put(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!(await bcrypt.compare(oldPassword, req.user.password))) {
    return res.status(401).json({
      status: 'error',
      message: 'The password you has entered is incorrect',
    });
  }

  const password = await await bcrypt.hash(newPassword);
  await req.db
    .collection('users')
    .updateOne({ _id: req.user._id }, { $set: { password } });
  return res.json({ message: 'Your password has been updated.' });
});
