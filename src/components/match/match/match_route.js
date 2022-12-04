const express = require('express');
const router = express.Router();
const {
  searchMatch,
  createMatch,
  createManyMatch,
  getMatch,
  getAllMatches,
  updateMatch,
  deleteMatch,
  deleteManyMatch,
} = require('./match_controller');

router.route('/').get(getMatch).post(createMatch).put(updateMatch).delete(deleteMatch);
router.route('/many').get(getAllMatches).post(createManyMatch).delete(deleteManyMatch);
router.route('/search').get(searchMatch);
module.exports = router;
