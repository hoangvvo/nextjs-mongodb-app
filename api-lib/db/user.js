import { ObjectId } from 'mongodb';
import normalizeEmail from 'validator/lib/normalizeEmail';

export async function UNSAFE_findUserForAuth(db, userId, all) {
  return db
    .collection('users')
    .findOne(
      { _id: new ObjectId(userId) },
      {
        projection: !all ? { password: 0 } : undefined,
      }
    )
    .then((user) => user || null);
}

export async function findUserById(db, userId) {
  return db
    .collection('users')
    .findOne({ _id: new ObjectId(userId) }, { projection: dbProjectionUsers() })
    .then((user) => user || null);
}

export async function findUserByUsername(db, username) {
  return db
    .collection('users')
    .findOne({ username }, { projection: dbProjectionUsers() })
    .then((user) => user || null);
}

export async function findUserByEmail(db, email) {
  email = normalizeEmail(email);
  return db
    .collection('users')
    .findOne({ email }, { projection: dbProjectionUsers() })
    .then((user) => user || null);
}

export async function updateUserById(db, id, data) {
  return db
    .collection('users')
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: 'after', projection: dbProjectionUsers() }
    )
    .then(({ value }) => value);
}

export async function insertUser(
  db,
  { email, password, bio = '', name, profilePicture, username }
) {
  const user = {
    emailVerified: false,
    profilePicture,
    email,
    name,
    username,
    bio,
  };
  const { insertedId } = await db
    .collection('users')
    .insertOne({ ...user, password });
  user._id = insertedId;
  return user;
}

export function dbProjectionUsers(prefix = '') {
  return {
    [`${prefix}password`]: 0,
    [`${prefix}email`]: 0,
    [`${prefix}emailVerified`]: 0,
  };
}
