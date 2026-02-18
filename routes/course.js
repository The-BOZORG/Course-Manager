import express from 'express';
const router = express.Router();

import upload from '../utils/multer.js';

import {
  getAllCourse,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadThumbnail,
} from '../controllers/course.js';

import {
  authenticateUser,
  authorizePermissions,
} from '../middlewares/authitication.js';

router
  .route('/')
  .get(authenticateUser, getAllCourse)
  .post(
    authenticateUser,
    authorizePermissions('instructor', 'admin'),
    createCourse,
  );

router
  .route('/:id')
  .get(authenticateUser, getCourse)
  .put(
    authenticateUser,
    authorizePermissions('instructor', 'admin'),
    updateCourse,
  )
  .delete(
    authenticateUser,
    authorizePermissions('instructor', 'admin'),
    deleteCourse,
  );

router.post(
  '/:id/thumbnail',
  authenticateUser,
  authorizePermissions('instructor', 'admin'),
  upload.single('thumbnail'),
  uploadThumbnail,
);

export default router;
