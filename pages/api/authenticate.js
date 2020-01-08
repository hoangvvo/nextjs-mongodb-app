import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import passport from '../../lib/passport';

const handler = nextConnect();

handler.use(middleware);

handler.post(passport.authenticate('local', {
  failureRedirect: '/login?fail=1',
  successRedirect: '/',
}));

export default handler;
