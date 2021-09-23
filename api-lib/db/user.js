import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import normalizeEmail from 'validator/lib/normalizeEmail';

export async function findUserWithEmailAndPassword(db, email, password) {
  email = normalizeEmail(email);
  const user = await db.collection('users').findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return { ...user, password: undefined }; // filtered out password
  }
  return null;
}

// If it is for authenticated user, it is okay to expose more fields
export async function UNSAFE_findUserForAuth(db, userId) {
  return db
    .collection('users')
    .findOne(
      { _id: userId },
      {
        projection: { password: 0 },
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
  { email, originalPassword, bio = '', name, profilePicture, username }
) {
  const password = await bcrypt.hash(originalPassword, 10);
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

export async function updateUserPasswordByOldPassword(
  db,
  id,
  oldPassword,
  newPassword
) {
  const user = await db.collection('users').findOne({ _id: id });
  if (!user) return false;
  const matched = await bcrypt.compare(oldPassword, user.password);
  if (!matched) return false;
  const password = await bcrypt.hash(newPassword, 10);
  await db.collection('users').updateOne({ _id: id }, { $set: { password } });
  return true;
}

export async function UNSAFE_updateUserPassword(db, id, newPassword) {
  const password = await bcrypt.hash(newPassword, 10);
  await db.collection('users').updateOne({ _id: id }, { $set: { password } });
}

export function dbProjectionUsers(prefix = '') {
  return {
    [`${prefix}password`]: 0,
    [`${prefix}email`]: 0,
    [`${prefix}emailVerified`]: 0,
  };
}
