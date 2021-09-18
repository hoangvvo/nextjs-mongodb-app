import { findUserById } from '@/api-lib/db';
import { database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import { extractUser } from '@/api-lib/user';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  const user = extractUser(await findUserById(req.db, req.query.userId));
  res.send({ user });
});

export default handler;
