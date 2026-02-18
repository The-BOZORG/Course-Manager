import User from '../models/user';
import Course from '../models/course';
import catchAsync from '../utils/catchAsync';

const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  res.status(200).json({
    results: users.length,
    users,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const courses = await Course.findAll({
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    ],
  });

  res.status(200).json({
    results: courses.length,
    courses,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }

  await user.destroy();

  res.status(204).json({
    message: 'user deleted successfully',
  });
});

const approveInstructor = catchAsync(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }

  if (!user.wantsToBeInstructor) {
    return res
      .status(400)
      .json({ message: 'user did not request instructor role' });
  }

  user.role = 'instructor';
  user.wantsToBeInstructor = false;

  await user.save();

  res.status(200).json({
    message: 'user approved as instructor',
    user,
  });
});

export { getAllUsers, getAllCourses, deleteUser, approveInstructor };
