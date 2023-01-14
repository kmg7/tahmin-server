import express from 'express';
const router = express.Router();

import {
  createUser,
  createManyUser,
  updateUser,
  deleteUser,
  deleteManyUser,
  getUser,
  getAllUsers,
  searchUser,
} from '../controller/user_controller';

router.route('/user').get(getUser).post(createUser).put(updateUser).delete(deleteUser);
router.route('/user/many').get(getAllUsers).post(createManyUser).delete(deleteManyUser);
router.route('/user/search').get(searchUser);
export default router;
