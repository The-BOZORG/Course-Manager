import catchAsync from '../utils/catchAsync.js';
import CustomError from '../errors/customError.js';
import checkPermissions from '../utils/permission.js';

import {
  createNewCourse,
  deleteExistingCourse,
  findAllCourses,
  findCourseById,
  updateExistingCourse,
  uploadCourseThumbnail,
} from '../services/course.js';

const getAllCourse = catchAsync(async (req, res) => {
  const courses = await findAllCourses();

  res.status(200).json({
    status: 'success',
    results: courses.length,
    data: courses,
  });
});

const getCourse = catchAsync(async (req, res) => {
  const { id: courseId } = req.params;
  const course = await findCourseById(courseId);

  checkPermissions(req.user, req.params.id);

  res.status(200).json({ data: course });
});

const createCourse = catchAsync(async (req, res) => {
  const course = await createNewCourse(req.body, req.user.userId);

  res.status(201).json({
    status: 'success',
    data: course,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id: courseId } = req.params;
  const course = await updateExistingCourse(
    courseId,
    req.body,
    req.user.userId,
  );

  checkPermissions(req.user, req.params.id);

  res.status(200).json({
    status: 'success',
    data: course,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id: courseId } = req.params;
  await deleteExistingCourse(courseId, req.user.userId);

  checkPermissions(req.user, req.params.id);

  res.status(204).json({
    status: 'success',
  });
});

const uploadThumbnail = catchAsync(async (req, res) => {
  const { id: courseId } = req.params;
  const file = req.file;
  if (!file) {
    throw new CustomError('thumbnail file is required', 400);
  }

  const thumbnail = await uploadCourseThumbnail(
    courseId,
    req.user.userId,
    file,
  );

  checkPermissions(req.user, req.params.id);

  res.status(200).json({
    status: 'success',
    data: { thumbnail },
  });
});

export {
  createCourse,
  deleteCourse,
  findAllCourses,
  getAllCourse,
  getCourse,
  uploadThumbnail,
  updateCourse,
};
