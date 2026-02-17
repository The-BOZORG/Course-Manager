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

import { authenticateUser } from '../middlewares/authitication.js';

router
  .route('/')
  .get(authenticateUser, getAllCourse)
  .post(authenticateUser, createCourse);

router
  .route('/:id')
  .get(authenticateUser, getCourse)
  .put(authenticateUser, updateCourse)
  .delete(authenticateUser, deleteCourse);

router.post(
  '/:id/thumbnail',
  authenticateUser,
  upload.single('thumbnail'),
  uploadThumbnail,
);

export default router;
