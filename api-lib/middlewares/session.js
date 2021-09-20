import MongoStore from 'connect-mongo';
import { session as nextSession } from 'next-session';

export default function session(req, res, next) {
  const mongoStore = MongoStore.create({
    client: req.dbClient,
    stringify: false,
  });
  return nextSession({
    store: mongoStore,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 2 * 7 * 24 * 60 * 60, // 2 weeks,
      path: '/',
      sameSite: 'strict',
    },
    touchAfter: 1 * 7 * 24 * 60 * 60 * 1000, // 1 week
  })(req, res, next);
}
