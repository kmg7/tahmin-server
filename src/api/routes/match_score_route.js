import { Router } from 'express';
const router = Router();

import { searchMatchScore, getMatchScore, getAllMatchScores } from '../controller/match_score_controller.js';

router.route('/').get(getMatchScore);
router.route('/many').get(getAllMatchScores);
router.route('/search').get(searchMatchScore);

export default router;
