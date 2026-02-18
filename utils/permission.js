import CustomError from '../errors/customError.js';

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === 'admin') return;
  if (Number(requestUser.userId) === Number(resourceUserId)) return;
  throw new CustomError('not authorized to access this route', 403);
};

export default checkPermissions;
