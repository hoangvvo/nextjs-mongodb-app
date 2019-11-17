import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default function database(req, res, next) {
  if (!client.isConnected()) {
    return client.connect().then(() => {
      req.dbClient = client;
      req.db = client.db(process.env.DB_NAME);
      return next();
    });
  }
  req.dbClient = client;
  req.db = client.db(process.env.DB_NAME);
  return next();
}
