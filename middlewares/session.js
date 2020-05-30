import { session, promisifyStore, expressSession } from 'next-session';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(expressSession);

export default function (req, res, next) {
  const mongoStore = new MongoStore({
    client: req.dbClient,
    stringify: false,
  });
  return session({
    store: promisifyStore(mongoStore),
  })(req, res, next);
}
