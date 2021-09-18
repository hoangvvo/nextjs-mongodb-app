import session from 'express-session';
import MongoStore from 'connect-mongo';

export default function sessionMiddleware(req, res, next) {
  const mongoStore = MongoStore.create({
    client: req.dbClient,
    stringify: false,
  });
  return session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
  })(req, res, next);
}
