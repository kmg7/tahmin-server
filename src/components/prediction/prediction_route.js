const express = require('express');
const router = express.Router();
const {
  createPrediction,
  createManyPrediction,
  updatePrediction,
  updateManyPrediction,
  deletePrediction,
  deleteManyPrediction,
  getPrediction,
  getAllPredictions,
  searchPrediction,
} = require('./prediction_controller');

router.route('/prediction').get(getPrediction).post(createPrediction).put(updatePrediction).delete(deletePrediction);
router.route('/prediction/many').get(getAllPredictions).post(createManyPrediction).put(updateManyPrediction).delete(deleteManyPrediction);
router.route('/prediction/search').get(searchPrediction);
module.exports = router;
