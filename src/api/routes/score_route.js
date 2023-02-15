import { Router } from 'express';
const router = Router();

import { searchScore, getScore, getAllScores } from '../controller/score_controller.js';

router.route('/').get(getScore);
router.route('/many').get(getAllScores);
router.route('/search').get(searchScore);

export default router;
