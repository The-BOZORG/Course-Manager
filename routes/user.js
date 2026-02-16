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

router.get('/', getAllUsers);
router.get('/me', showMe);
router.patch('/me', updateUser);
router.patch('/update-password', updatePasswordUser);
router.delete('/delete-account', deleteUserAccount);
router.get('/:id', getUser);

export default router;
