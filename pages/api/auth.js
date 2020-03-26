import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import passport from '../../lib/passport';
import { extractUser } from '../../lib/api-helpers';

const handler = nextConnect();

handler.use(middleware);

handler.post(passport.authenticate('local'), (req, res) => {
  res.json({ user: extractUser(req) });
});

handler.delete((req, res) => {
  req.logOut();
  res.status(204).end();
});

export default handler;
