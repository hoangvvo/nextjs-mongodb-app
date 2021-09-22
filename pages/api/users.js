import { findUserByEmail, findUserByUsername, insertUser } from '@/api-lib/db';
import { all } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import { slugUsername } from '@/lib/user';
import bcrypt from 'bcryptjs';
import nc from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';

const handler = nc(ncOpts);

handler.use(all);

handler.post(async (req, res) => {
  let { username, name, email, password } = req.body;
  if (!username || !email || !password || !name) {
    res.status(400).send('Missing field(s)');
    return;
  }
  username = slugUsername(req.body.username);
  email = normalizeEmail(req.body.email);
  if (!isEmail(email)) {
    res.status(400).send('The email you entered is invalid.');
    return;
  }
  if (await findUserByEmail(req.db, email)) {
    res.status(403).send('The email has already been used.');
    return;
  }
  if (await findUserByUsername(req.db, username)) {
    res.status(403).send('The username has already been taken.');
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await insertUser(req.db, {
    email,
    password: hashedPassword,
    bio: '',
    name,
    username,
  });
  req.logIn(user, (err) => {
    if (err) throw err;
    res.status(201).json({
      user,
    });
  });
});

export default handler;
