import nextConnect from 'next-connect';
import bcrypt from 'bcryptjs';
import middleware from '../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.post((req, res) => {
  const { email, password } = req.body;

  return req.db
    .collection('users')
    .findOne({ email })
    .then((user) => {
      if (user) {
        return bcrypt.compare(password, user.password).then((result) => {
          if (result) return Promise.resolve(user);
          return Promise.reject(Error('The password you entered is incorrect'));
        });
      }
      return Promise.reject(Error('The email does not exist'));
    })
    .then((user) => {
      req.session.userId = user._id;
      return res.send({
        status: 'ok',
        message: `Welcome back, ${user.name}!`,
      });
    })
    .catch(error => res.send({
      status: 'error',
      message: error.toString(),
    }));
});

export default handler;
