import { passport } from '@/api-lib/auth';
import { auth, database } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database, auth);

handler.post(passport.authenticate('local'), (req, res) => {
  res.json({ user: req.user });
});

handler.delete((req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
});

export default handler;
