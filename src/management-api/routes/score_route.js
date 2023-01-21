import { Router } from 'express';
const router = Router();

import {
  searchScore,
  getScore,
  getAllScores,
  createScore,
  createManyScore,
  updateScore,
  deleteScore,
  deleteManyScore,
  upsertScore,
} from '../controller/score_controller.js';

router.route('/').get(getScore).post(createScore).put(updateScore).delete(deleteScore);
router.route('/many').get(getAllScores).post(createManyScore).put(upsertScore).delete(deleteManyScore);
router.route('/search').get(searchScore);

export default router;
