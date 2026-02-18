import User from '../models/user.js';
import CustomError from '../errors/customError.js';

const getAllUsersService = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
};

const getPendingInstructorRequestsService = async () => {
  const users = await User.findAll({
    where: {
      wantsToBeInstructor: true,
      instructorRequestStatus: 'pending',
    },
    attributes: { exclude: ['password'] },
  });

  return users;
};

const deleteUserService = async (userId) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new CustomError('user not found', 404);
  }

  await user.destroy();
};

const approveInstructorService = async (userId) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new CustomError('user not found', 404);
  }

  if (!user.wantsToBeInstructor || user.instructorRequestStatus !== 'pending') {
    throw new CustomError('user did not request instructor role', 400);
  }

  user.role = 'instructor';
  user.wantsToBeInstructor = false;
  user.instructorRequestStatus = 'approved';

  await user.save();

  return await User.findByPk(userId, {
    attributes: { exclude: ['password'] },
  });
};

const rejectInstructorService = async (userId) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new CustomError('user not found', 404);
  }

  if (!user.wantsToBeInstructor || user.instructorRequestStatus !== 'pending') {
    throw new CustomError('user did not request instructor role', 400);
  }

  user.wantsToBeInstructor = false;
  user.instructorRequestStatus = 'rejected';

  await user.save();

  return await User.findByPk(userId, {
    attributes: { exclude: ['password'] },
  });
};

export {
  getAllUsersService,
  getPendingInstructorRequestsService,
  deleteUserService,
  approveInstructorService,
  rejectInstructorService,
};
