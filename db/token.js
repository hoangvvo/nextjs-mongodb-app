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
    .findOneAndDelete({ _id: id, type }).then(({ value }) => value);
}

export function insertToken(db, { creatorId, type, expireAt }) {
  const securedTokenId = nanoid(32);
  return db.collection('tokens').insertOne({
    _id: securedTokenId,
    creatorId,
    type,
    expireAt,
  }).then(({ ops }) => ops[0]);
}
