// take only needed user fields to avoid sensitive ones (such as password)
const sensitiveFields = ['email', 'emailVerified', 'password'];
export function extractUser(user) {
  if (!user) return null;
  const obj = {};
  Object.keys(user).forEach((key) => {
    if (!sensitiveFields.includes(key)) obj[key] = user[key];
  });
  return obj;
}
