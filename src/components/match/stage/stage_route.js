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
} = require('./stage_controller');

router.route('/stage').get(getStage).post(createStage).put(updateStage).delete(deleteStage);
router.route('/stage/many').get(getAllStages).post(createManyStage).delete(deleteManyStage);
router.route('/stage/search').get(searchStage);

module.exports = router;
