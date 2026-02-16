import express from 'express';
const router = express.Router();

import {
  getUser,
  getAllUsers,
  showMe,
  updateUser,
  updatePasswordUser,
  deleteUserAccount,
} from '../controllers/user.js';

import {
  authenticateUser,
  authorizePermissions,
} from '../middlewares/authitication.js';

router.get('/', authenticateUser, authorizePermissions('admin'), getAllUsers);
router.get('/me', authenticateUser, showMe);
router.patch('/me', authenticateUser, updateUser);
router.patch('/update-password', authenticateUser, updatePasswordUser);
router.delete('/delete-account', authenticateUser, deleteUserAccount);
router.get('/:id', authenticateUser, authorizePermissions('admin'), getUser);

export default router;
