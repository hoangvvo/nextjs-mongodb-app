import session from 'next-session';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

export default session({ store: new MongoStore({ url: process.env.MONGODB_URI }) });
