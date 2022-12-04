const express = require('express');
const router = express.Router();
const {
  searchMatchScore,
  createMatchScore,
  createManyMatchScore,
  getMatchScore,
  getAllMatchScores,
  updateMatchScore,
  deleteMatchScore,
  deleteManyMatchScore,
} = require('./match_score_controller');
router.route('/matchScore').get(getMatchScore).post(createMatchScore).put(updateMatchScore).delete(deleteMatchScore);
router.route('/matchScore/many').get(getAllMatchScores).post(createManyMatchScore).delete(deleteManyMatchScore);
router.route('/matchScore/search').get(searchMatchScore);

module.exports = router;
