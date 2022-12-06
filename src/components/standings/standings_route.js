const express = require('express');
const router = express.Router();
const {
  searchStandings,
  getStandings,
  getAllStandings,
  createStandings,
  createManyStandings,
  updateStandings,
  deleteStandings,
  deleteManyStandings,
} = require('./standings_controller');

router.route('/standings').get(getStandings).post(createStandings).put(updateStandings).delete(deleteStandings);
router.route('/standings/many').get(getAllStandings).post(createManyStandings).delete(deleteManyStandings);
router.route('/standings/search').get(searchStandings);

module.exports = router;
