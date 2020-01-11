import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import middleware from '../../../../middlewares/middleware';

const handler = nextConnect();
handler.use(middleware);

handler.put(async (req, res) => {
  try {
    if (!req.user) throw new Error('You need to be logged in.');
    const { oldPassword, newPassword } = req.body;
    if (!(await bcrypt.compare(oldPassword, req.user.password))) {
      throw new Error('The password you has entered is incorrect.');
    }
    const password = await bcrypt.hash(newPassword);
    await req.db
      .collection('users')
      .updateOne({ _id: req.user._id }, { $set: { password } });
    res.json({ message: 'Your password has been updated.' });
  } catch (error) {
    res.json({
      ok: false,
      message: error.toString(),
    });
  }
});

export default handler;
