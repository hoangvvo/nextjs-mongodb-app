import { passport } from '@/api-lib/auth';
import { all } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import { extractUser } from '@/api-lib/user';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(all);

handler.post(passport.authenticate('local'), (req, res) => {
  res.json({ user: extractUser(req.user) });
});

handler.delete((req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
});

export default handler;
