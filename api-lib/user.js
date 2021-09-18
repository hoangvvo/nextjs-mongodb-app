const sensitiveFields = ['email', 'emailVerified', 'password'];
/**
 * Take only needed user fields and remove sensitive ones (such as password)
 */
export function extractUser(user) {
  if (!user) return null;
  const obj = {};
  Object.keys(user).forEach((key) => {
    if (!sensitiveFields.includes(key)) obj[key] = user[key];
  });
  return obj;
}
