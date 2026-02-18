import Course from '../models/course.js';
import User from '../models/user.js';
import CustomError from '../errors/customError.js';

export const findAllCourses = async () => {
  return await Course.findAll();
};

export const findCourseById = async (courseId) => {
  const course = await Course.findByPk(courseId, {
    include: [
      {
        model: User,
        as: 'instructor',
        attributes: ['id', 'name', 'email'],
      },
    ],
  });

  if (!course) {
    throw new CustomError(`course not found with this id ${courseId}`, 404);
  }

  return course;
};

export const createNewCourse = async (data, userId) => {
  return await Course.create({
    ...data,
    instructorId: userId,
  });
};

export const updateExistingCourse = async (courseId, data, userId, userRole) => {
  const course = await Course.findByPk(courseId);
  if (!course) {
    throw new CustomError(`course not found with id ${courseId}`, 404);
  }

  if (userRole !== 'admin' && Number(course.instructorId) !== Number(userId)) {
    throw new CustomError('you are not allowed to update this course', 403);
  }

  await course.update(data);
  return course;
};

export const deleteExistingCourse = async (courseId, userId, userRole) => {
  const course = await Course.findByPk(courseId);

  if (!course) {
    throw new CustomError(`course not found with id ${courseId}`, 404);
  }

  if (userRole !== 'admin' && Number(course.instructorId) !== Number(userId)) {
    throw new CustomError('you are not allowed to delete this course', 403);
  }

  await course.destroy();
};

export const uploadCourseThumbnail = async (courseId, userId, userRole, file) => {
  const course = await Course.findByPk(courseId);

  if (!course) {
    throw new CustomError(`course not found with id ${courseId}`, 404);
  }

  if (userRole !== 'admin' && Number(course.instructorId) !== Number(userId)) {
    throw new CustomError('you are not allowed to update this course', 403);
  }

  if (!file) {
    throw new CustomError('no file uploaded', 400);
  }

  course.thumbnail = file.filename;
  await course.save();

  return course.thumbnail;
};
