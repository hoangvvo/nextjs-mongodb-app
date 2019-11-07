import { ObjectId } from 'mongodb';

export default function authentication(req, res, next) {
  if (req.session.userId) {
    return req.db.collection('users').findOne(ObjectId(req.session.userId))
      .then((user) => {
        if (user) req.user = user;
        return next();
      });
  }
  return next();
}
