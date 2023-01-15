const checkPermissions = ({ requestUser, resourceUserId }) => {
  if (process.env.NODE_ENV == 'development') return true;
  if (process.env.SUPERUSERS.includes(requestUser.authId)) return true;
  if (resourceUserId) {
    if (requestUser.authId === resourceUserId) return true;
  }
  return false;
};
export default checkPermissions;
