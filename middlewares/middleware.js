import nextConnect from 'next-connect';
import database from './database';
import session from './session';
import authentication from './authentication';

const middleware = nextConnect();

middleware.use(database);
middleware.use(session);
middleware.use(authentication);

export default middleware;
