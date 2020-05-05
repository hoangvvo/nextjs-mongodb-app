// take only needed user fields to avoid sensitive ones (such as password)
export function extractUser(req) {
  if (!req.user) return null;
  const {
    _id, name, email, bio, profilePicture, emailVerified,
  } = req.user;
  return {
    _id, name, email, bio, profilePicture, emailVerified,
  };
}
