import Course from '../models/course.js';
import User from '../models/user.js';
import Enrollment from '../models/enrollment.js';
import CustomError from '../errors/customError.js';

const findAllCourses = async () => {
  return await Course.findAll();
};

const findCourseById = async (courseId) => {
  const course = await Course.findByPk(courseId, {
    include: [
      {
        model: User,
        as: 'instructor',
        attributes: ['id', 'name', 'email'],
      },
      {
        model: Enrollment,
        as: 'enrollments',
      },
    ],
  });

  if (!course) {
    throw new CustomError(`course not found with this id ${courseId}`, 404);
  }

  return course;
};

const createNewCourse = async (data, userId) => {
  return await Course.create({
    ...data,
    instructorId: userId,
  });
};

const updateExistingCourse = async (courseId, data, userId) => {
  const course = await Course.findByPk(courseId);
  if (!course) {
    throw new CustomError(`course not found with id ${courseId}`, 404);
  }

  if (Number(course.instructorId) !== Number(userId)) {
    throw new CustomError('you are not allowed to update this course', 403);
  }

  await course.update(data);
  return course;
};

const deleteExistingCourse = async (courseId, userId) => {
  const course = await Course.findByPk(courseId);

  if (!course) {
    throw new CustomError(`course not found with id ${courseId}`, 404);
  }

  if (Number(course.instructorId) !== Number(userId)) {
    throw new CustomError('you are not allowed to delete this course', 403);
  }

  await course.destroy();
};

const uploadCourseThumbnail = async (courseId, userId, file) => {
  const course = await Course.findByPk(courseId);

  if (!course) {
    throw new CustomError(`course not found with id ${courseId}`, 404);
  }

  if (Number(course.instructorId) !== Number(userId)) {
    throw new CustomError('you are not allowed to update this course', 403);
  }

  if (!file) {
    throw new CustomError('no file uploaded', 400);
  }

  course.thumbnail = file.filename;
  await course.save();

  return course.thumbnail;
};

export {
  createNewCourse,
  deleteExistingCourse,
  findAllCourses,
  findCourseById,
  updateExistingCourse,
  uploadCourseThumbnail,
};
