import { findUserById } from '@/api-lib/db';
import { database } from '@/api-lib/middlewares';
import { extractUser } from '@/api-lib/user';
import nc from 'next-connect';

const handler = nc();

handler.use(database);

const maxAge = 4 * 60 * 60; // 4 hours

handler.get(async (req, res) => {
  const user = extractUser(await findUserById(req.db, req.query.userId));
  if (user) res.setHeader('cache-control', `public, max-age=${maxAge}`);
  res.send({ user });
});

export default handler;
