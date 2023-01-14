import express from 'express';
const router = express.Router();

import {
  searchMatchScore,
  createMatchScore,
  createManyMatchScore,
  getMatchScore,
  getAllMatchScores,
  updateMatchScore,
  deleteMatchScore,
  deleteManyMatchScore,
} from '../controller/match_score_controller';

router.route('/matchScore').get(getMatchScore).post(createMatchScore).put(updateMatchScore).delete(deleteMatchScore);
router.route('/matchScore/many').get(getAllMatchScores).post(createManyMatchScore).delete(deleteManyMatchScore);
router.route('/matchScore/search').get(searchMatchScore);

export default router;
