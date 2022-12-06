const express = require('express');
const router = express.Router();
const {
  searchScore,
  getScore,
  getAllScores,
  createScore,
  createManyScore,
  updateScore,
  deleteScore,
  deleteManyScore,
} = require('./score_controller');

router.route('/score').get(getScore).post(createScore).put(updateScore).delete(deleteScore);
router.route('/score/many').get(getAllScores).post(createManyScore).delete(deleteManyScore);
router.route('/score/search').get(searchScore);

module.exports = router;
