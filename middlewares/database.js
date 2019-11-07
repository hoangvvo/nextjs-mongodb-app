import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true });

export default function database(req, res, next) {
  if (!client.isConnected()) {
    return client.connect().then(() => {
      req.db = client.db('nextjsmongodbapp');
      return next();
    });
  }
  req.db = client.db('nextjsmongodbapp');
  return next();
}
