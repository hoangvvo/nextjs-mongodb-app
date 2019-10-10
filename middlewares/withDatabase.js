import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true });

const withDatabase = handler => (req, res) => {
  if (!client.isConnected()) {
    return client.connect().then(() => {
      req.db = client.db('nextjsmongodbapp');
      return handler(req, res);
    });
  }
  req.db = client.db('nextjsmongodbapp');
  return handler(req, res);
};
export default withDatabase;
