import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.patch((req, res) => {
  if (!req.user) return res.status(401).send('You need to be logged in.');
  const { name, bio } = req.body;
  return req.db
    .collection('users')
    .updateOne({ _id: req.user._id }, { $set: { name, bio } })
    .then(() => res.json({
      message: 'Profile updated successfully',
      data: { name, bio },
    }))
    .catch(error => res.send({
      status: 'error',
      message: error.toString(),
    }));
});

export default handler;
