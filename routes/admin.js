import express from 'express';
const router = express.Router();

import {
  getAllUsers,
  getPendingInstructorRequests,
  deleteUser,
  approveInstructor,
  rejectInstructor,
} from '../controllers/admin.js';

import {
  authenticateUser,
  authorizePermissions,
} from '../middlewares/authitication.js';

router.get('/', authenticateUser, authorizePermissions('admin'), getAllUsers);
router.get(
  '/instructor-requests',
  authenticateUser,
  authorizePermissions('admin'),
  getPendingInstructorRequests,
);
router.delete(
  '/:id',
  authenticateUser,
  authorizePermissions('admin'),
  deleteUser,
);
router.patch(
  '/:id/approve-instructor',
  authenticateUser,
  authorizePermissions('admin'),
  approveInstructor,
);
router.patch(
  '/:id/reject-instructor',
  authenticateUser,
  authorizePermissions('admin'),
  rejectInstructor,
);

export default router;
