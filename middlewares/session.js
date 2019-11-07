import session from 'next-session';
import connectMongo from 'connect-mongo';
import { client } from './database';

const MongoStore = connectMongo(session);

export default session({ store: new MongoStore({ client }) });
