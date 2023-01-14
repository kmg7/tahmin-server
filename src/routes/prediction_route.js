import express from 'express';
const router = express.Router();

import {
  createPrediction,
  createManyPrediction,
  updatePrediction,
  updateManyPrediction,
  deletePrediction,
  deleteManyPrediction,
  getPrediction,
  getAllPredictions,
  searchPrediction,
} from '../controller/prediction_controller';

router.route('/prediction').get(getPrediction).post(createPrediction).put(updatePrediction).delete(deletePrediction);
router.route('/prediction/many').get(getAllPredictions).post(createManyPrediction).put(updateManyPrediction).delete(deleteManyPrediction);
router.route('/prediction/search').get(searchPrediction);
export default router;
