import { nanoid } from 'nanoid';
import normalizeEmail from 'validator/lib/normalizeEmail';

export async function UNSAFE_findUserForAuth(db, userId, all) {
  return db
    .collection('users')
    .findOne(
      { _id: userId },
      {
        projection: !all ? { password: 0 } : undefined,
      }
    )
    .then((user) => user || null);
}

export async function findUserById(db, userId) {
  return db
    .collection('users')
    .findOne({ _id: userId }, { projection: dbProjectionUsers() })
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
      { _id: id },
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
    _id: nanoid(12),
    emailVerified: false,
    profilePicture,
    email,
    name,
    username,
    bio,
  };
  await db.collection('users').insertOne({ ...user, password });
  return user;
}

export function dbProjectionUsers(prefix = '') {
  return {
    [`${prefix}password`]: 0,
    [`${prefix}email`]: 0,
    [`${prefix}emailVerified`]: 0,
  };
}
