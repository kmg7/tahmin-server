import { Router } from 'express';
const router = Router();

import {
  createUser,
  createManyUser,
  updateUser,
  upsertUser,
  deleteUser,
  deleteManyUser,
  getUser,
  getAllUsers,
  searchUser,
  getUserProperty,
} from '../controller/user_controller.js';

router.route('/').get(getUser).post(createUser).put(updateUser).delete(deleteUser);
router.route('/many').get(getAllUsers).post(createManyUser).put(upsertUser).delete(deleteManyUser);
router.route('/:id/:prop').get(getUserProperty);
router.route('/search').get(searchUser);
export default router;
