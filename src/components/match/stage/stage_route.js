const express = require('express');
const router = express.Router();
const {
  changeActivity,
  createStage,
  createManyStage,
  getStage,
  getAllStages,
  searchStage,
  deleteManyStage,
  deleteStage,
  updateStage,
  connectMatches,
  disconnectMatches,
} = require('./stage_controller');

router.route('/stage').get(getStage).post(createStage).put(updateStage).delete(deleteStage);
router.route('/stage/activity').put(changeActivity);
router.route('/stage/many').get(getAllStages).post(createManyStage).delete(deleteManyStage);
router.route('/stage/search').get(searchStage);
router.route('/stage/matches').post(connectMatches).delete(disconnectMatches);

module.exports = router;
