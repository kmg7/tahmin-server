import { Router } from 'express';
const router = Router();

import { searchMatch, getMatch, getAllMatches, getMatchProperty } from '../controller/match_controller.js';

router.route('/').get(getMatch);
router.route('/many').get(getAllMatches);
router.route('/search').get(searchMatch);
router.route('/:id/:prop').get(getMatchProperty);
export default router;
