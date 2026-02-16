import User from '../models/user';
import CustomError from '../errors/customError';

export const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  if (!user) {
    throw new CustomError(`no user with this id ${id}`, 404);
  }
  return user;
};

export const getAllUsersByRole = async (role = 'user') => {
  const users = await User.findAll({
    where: { role },
    attributes: { exclude: ['password'] },
  });
  return users;
};

export const getCurrentUser = async (userId) => {
  const user = await User.findOne({
    where: { id: userId },
    attributes: { exclude: ['password'] },
  });
  if (!user) {
    throw new CustomError('User not found', 404);
  }
  return user;
};

export const updateCurrentUser = async (userId, data) => {
  const user = await User.findOne({
    where: { id: userId },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  await user.update(data);
  return user;
};

export const updateUserPassword = async (userId, oldPassword, newPassword) => {
  const user = await User.scope('withPassword').findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError('Invalid password', 401);
  }

  user.password = newPassword;
  await user.save();
  return true;
};

export const deleteUser = async (userId, password) => {
  const user = await User.scope('withPassword').findByPk(userId);

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError('Invalid password', 401);
  }

  await user.destroy();
  return true;
};
