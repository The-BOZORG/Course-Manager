import catchAsync from '../utils/catchAsync.js';
import {
  getAllUsersService,
  getPendingInstructorRequestsService,
  deleteUserService,
  approveInstructorService,
  rejectInstructorService,
} from '../services/admin.js';

const getAllUsers = catchAsync(async (req, res) => {
  const users = await getAllUsersService();

  res.status(200).json({
    results: users.length,
    users,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  await deleteUserService(id);

  res.status(204).json({ message: 'user deleted successfully' });
});

const approveInstructor = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await approveInstructorService(id);

  res.status(200).json({
    message: 'user approved as instructor',
    user,
  });
});

const rejectInstructor = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await rejectInstructorService(id);

  res.status(200).json({
    message: 'instructor request rejected',
    user,
  });
});

const getPendingInstructorRequests = catchAsync(async (req, res) => {
  const users = await getPendingInstructorRequestsService();

  res.status(200).json({
    results: users.length,
    users,
  });
});

export {
  getAllUsers,
  getPendingInstructorRequests,
  deleteUser,
  approveInstructor,
  rejectInstructor,
};
