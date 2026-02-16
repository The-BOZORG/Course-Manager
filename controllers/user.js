import catchAsync from '../utils/catchAsync.js';
import CustomError from '../errors/customError.js';
import {
  getUserById,
  getAllUsersByRole,
  updateCurrentUser,
  updateUserPassword,
  deleteUser,
} from '../services/user.js';

//@protect(only admin)
const getUser = catchAsync(async (req, res) => {
  const user = await getUserById(req.params.id);
  res.status(200).json({ status: 'success', data: user });
});

//@protect(only admin)
const getAllUsers = catchAsync(async (req, res) => {
  const users = await getAllUsersByRole('user');
  res
    .status(200)
    .json({ status: 'success', results: users.length, data: users });
});

//@protect
const showMe = catchAsync(async (req, res) => {
  res.status(200).json({ status: 'success', data: req.user });
});

//@protect
const updateUser = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  if (!email || !name) {
    throw new CustomError('please provide all values', 400);
  }
  const user = await updateCurrentUser(req.user.userId, { name, email });
  res.status(200).json({ status: 'success', data: user });
});

//@protect
const updatePasswordUser = catchAsync(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError('please provide both password', 400);
  }

  await updateUserPassword(req.user.userId, oldPassword, newPassword);
  res
    .status(200)
    .json({ status: 'success', message: 'Password updated successfully' });
});

//@protect
const deleteUserAccount = catchAsync(async (req, res) => {
  const { password } = req.body;
  if (!password) {
    throw new CustomError('please provide password', 400);
  }
  await deleteUser(req.user.userId, password);

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res
    .status(200)
    .json({ status: 'success', message: 'delete account successful' });
});

export {
  getUser,
  getAllUsers,
  showMe,
  updateUser,
  updatePasswordUser,
  deleteUserAccount,
};
