import { nanoid } from 'nanoid';

export function findTokenByIdAndType(db, id, type) {
  return db.collection('tokens').findOne({
    _id: id,
    type,
  });
}

export function findAndDeleteTokenByIdAndType(db, id, type) {
  return db
    .collection('tokens')
    .findOneAndDelete({ _id: id, type })
    .then(({ value }) => value);
}

export async function createToken(db, { creatorId, type, expireAt }) {
  const securedTokenId = nanoid(32);
  const token = {
    _id: securedTokenId,
    creatorId,
    type,
    expireAt,
  };
  await db.collection('tokens').insertOne(token);
  return token;
}
