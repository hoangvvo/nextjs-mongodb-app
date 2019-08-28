import session, { withSession } from 'next-session';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

const useSession = handler => withSession(handler, {
  store: new MongoStore({ url: process.env.MONGODB_URI }),
});

export default useSession;
