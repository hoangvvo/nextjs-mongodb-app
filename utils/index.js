export const checkPermission = (data, role) => {
  return !!data?.user?.roles?.[role] || !!data?.roles?.[role];
}

export default {};