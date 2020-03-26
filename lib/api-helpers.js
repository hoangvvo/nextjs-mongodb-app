/* eslint-disable import/prefer-default-export */
// take only needed user fields to avoid sensitive ones (such as password)
export function extractUser(req) {
  if (!req.user) return null;
  const {
    name, email, bio, profilePicture, emailVerified,
  } = req.user;
  return {
    name, email, bio, profilePicture, emailVerified,
  };
}
