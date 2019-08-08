import session from 'next-session';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

const useSession = handler => session(handler, {
  store: new MongoStore({ url: process.env.MONGODB_URI }),
});

export default useSession;
