import nextConnect from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcryptjs';
import middleware from '../../middlewares/middleware';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const { email, name, password } = req.body;
  try {
    if (!isEmail(email)) throw new Error('The email you entered is invalid.');
    if (!password || !name) throw new Error('Missing field(s)');
    if ((await req.db.collection('users').countDocuments({ email })) > 0) throw new Error('The email has already been used.');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await req.db
      .collection('users')
      .insertOne({ email, password: hashedPassword, name })
      .then(({ ops }) => ops[0]);
    req.logIn(user, (err) => {
      if (err) throw err;
      res.status(201).json({
        status: 'ok',
        message: 'User signed up successfully',
      });
    });
  } catch (err) {
    res.json({
      status: 'error',
      message: err.toString(),
    });
  }
});

export default handler;
