import { nanoid } from 'nanoid';
import normalizeEmail from 'validator/lib/normalizeEmail';

export async function findUserById(db, userId) {
  return db
    .collection('users')
    .findOne({
      _id: userId,
    })
    .then((user) => user || null);
}

export async function findUserByUsername(db, username) {
  return db
    .collection('users')
    .findOne({
      username,
    })
    .then((user) => user || null);
}

export async function findUserByEmail(db, email) {
  email = normalizeEmail(email);
  return db
    .collection('users')
    .findOne({
      email,
    })
    .then((user) => user || null);
}

export async function updateUserById(db, id, update) {
  return db
    .collection('users')
    .findOneAndUpdate(
      { _id: id },
      { $set: update },
      { returnDocument: 'after' }
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
    password,
    name,
    username,
    bio,
  };
  await db.collection('users').insertOne(user);
  return user;
}
