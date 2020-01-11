import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.patch(async (req, res) => {
  try {
    if (!req.user) throw new Error('You need to be logged in.');
    const { name, bio } = req.body;
    await req.db
      .collection('users')
      .updateOne({ _id: req.user._id }, { $set: { name, bio } });
    res.json({
      ok: true,
      message: 'Profile updated successfully',
      data: { name, bio },
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.toString(),
    });
  }
});

export default handler;
