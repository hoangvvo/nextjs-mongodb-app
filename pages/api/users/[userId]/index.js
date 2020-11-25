import nc from 'next-connect';
import { all } from '@/middlewares/index';
import { getUser } from '@/lib/db';

const handler = nc();

handler.use(all);

const maxAge = 4 * 60 * 60; // 4 hours

handler.get(async (req, res) => {
  const user = await getUser(req, req.query.userId);
  res.setHeader('cache-control', `public, max-age=${maxAge}`);
  res.send({ user });
});

export default handler;
