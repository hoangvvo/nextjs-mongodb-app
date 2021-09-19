import MongoStore from 'connect-mongo';
import { session as nextSession } from 'next-session';

export default function session(req, res, next) {
  const mongoStore = MongoStore.create({
    client: req.dbClient,
    stringify: false,
  });
  return nextSession({ store: mongoStore })(req, res, next);
}
