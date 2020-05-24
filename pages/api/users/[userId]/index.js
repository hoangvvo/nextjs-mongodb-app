
import nextConnect from 'next-connect';
import middleware from '../../../../middlewares/middleware';
import { getUser } from '../../../../lib/db';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const user = await getUser(req, req.query.userId);
  res.send({ user });
});

export default handler;
