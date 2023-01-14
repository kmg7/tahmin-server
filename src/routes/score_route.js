import express from 'express';
const router = express.Router();

import {
  searchScore,
  getScore,
  getAllScores,
  createScore,
  createManyScore,
  updateScore,
  deleteScore,
  deleteManyScore,
} from '../controller/score_controller';

router.route('/score').get(getScore).post(createScore).put(updateScore).delete(deleteScore);
router.route('/score/many').get(getAllScores).post(createManyScore).delete(deleteManyScore);
router.route('/score/search').get(searchScore);

export default router;
