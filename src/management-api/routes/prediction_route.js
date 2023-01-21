import { Router } from 'express';
const router = Router();

import {
  createPrediction,
  createManyPrediction,
  updatePrediction,
  deletePrediction,
  deleteManyPrediction,
  getPrediction,
  getAllPredictions,
  searchPrediction,
  upsertPrediction,
} from '../controller/prediction_controller.js';

router.route('/').get(getPrediction).post(createPrediction).put(updatePrediction).delete(deletePrediction);
router.route('/many').get(getAllPredictions).post(createManyPrediction).put(upsertPrediction).delete(deleteManyPrediction);
router.route('/search').get(searchPrediction);
export default router;
