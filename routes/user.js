import express from 'express';
const router = express.Router();

import {
  getUser,
  showMe,
  updateUser,
  updatePasswordUser,
  requestInstructor,
  deleteUserAccount,
} from '../controllers/user.js';

import { authenticateUser } from '../middlewares/authitication.js';

router.get('/me', authenticateUser, showMe);
router.patch('/me', authenticateUser, updateUser);
router.patch('/update-password', authenticateUser, updatePasswordUser);
router.post('/request-instructor', authenticateUser, requestInstructor);
router.delete('/delete-account', authenticateUser, deleteUserAccount);
router.get('/:id', authenticateUser, getUser);

export default router;
