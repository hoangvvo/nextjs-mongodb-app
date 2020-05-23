import {
  session, promisifyStore, Store, MemoryStore,
} from 'next-session';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo({ Store, MemoryStore });

export default function (req, res, next) {
  const mongoStore = new MongoStore({
    client: req.dbClient,
    stringify: false,
  });
  return session({
    store: promisifyStore(mongoStore),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14 // expires in 14 days
    }
  })(req, res, next);
}
