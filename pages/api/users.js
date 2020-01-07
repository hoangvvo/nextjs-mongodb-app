import nextConnect from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcryptjs';
import middleware from '../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const { email, name, password } = req.body;
  if (!isEmail(email)) {
    return res.send({
      status: 'error',
      message: 'The email you entered is invalid.',
    });
  }

  return req.db
    .collection('users')
    .countDocuments({ email })
    .then((count) => {
      if (count) {
        return Promise.reject(Error('The email has already been used.'));
      }
      return bcrypt.hash(password, 10);
    })
    .then(hashedPassword => req.db.collection('users').insertOne({
      email,
      password: hashedPassword,
      name,
    }))
    .then((user) => {
      req.session.userId = user.insertedId;
      res.status(201).send({
        status: 'ok',
        message: 'User signed up successfully',
      });
    })
    .catch(error => res.send({
      status: 'error',
      message: error.toString(),
    }));
});

export default handler;
