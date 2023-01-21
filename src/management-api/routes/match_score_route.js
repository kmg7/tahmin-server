import { Router } from 'express';
const router = Router();

import {
  searchMatchScore,
  createMatchScore,
  createManyMatchScore,
  getMatchScore,
  getAllMatchScores,
  updateMatchScore,
  deleteMatchScore,
  deleteManyMatchScore,
  upsertMatchScore,
} from '../controller/match_score_controller.js';

router.route('/').get(getMatchScore).post(createMatchScore).put(updateMatchScore).delete(deleteMatchScore);
router.route('/many').get(getAllMatchScores).post(createManyMatchScore).put(upsertMatchScore).delete(deleteManyMatchScore);
router.route('/search').get(searchMatchScore);

export default router;
