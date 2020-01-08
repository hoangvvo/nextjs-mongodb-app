import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function setUpDb(db) {
  await db
    .collection('tokens')
    .createIndex('expireAt', { expireAfterSeconds: 0 });
}

export default async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db(process.env.DB_NAME);
  await setUpDb(req.db);
  return next();
}
