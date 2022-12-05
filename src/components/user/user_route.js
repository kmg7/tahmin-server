const express = require('express');
const router = express.Router();

const {
  createUser,
  createManyUser,
  updateUser,
  deleteUser,
  deleteManyUser,
  getUser,
  getAllUsers,
  searchUser,
} = require('./user_controller');

router.route('/user').get(getUser).post(createUser).put(updateUser).delete(deleteUser);
router.route('/user/many').get(getAllUsers).post(createManyUser).delete(deleteManyUser);
router.route('/user/search').get(searchUser);
module.exports = router;
