import nextConnect from 'next-connect';
import database from './database';
import session from './session';
import passport from '../lib/passport';
import compat from './compat';

const middleware = nextConnect();

middleware.use(compat);
middleware.use(database);
middleware.use(session);
middleware.use(passport.initialize());
middleware.use(passport.session());

export default middleware;
