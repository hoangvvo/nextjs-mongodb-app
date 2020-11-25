import nc from 'next-connect';
import { all } from '@/middlewares/index';
import { getUser } from '@/lib/db';

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const user = await getUser(req, req.query.userId);
  res.send({ user });
});

export default handler;
