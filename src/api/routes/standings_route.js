import { Router } from 'express';
const router = Router();

import { searchStandings, getStandings, getAllStandings, getStandingsProperty } from '../controller/standings_controller.js';

router.route('/').get(getStandings);
router.route('/many').get(getAllStandings);
router.route('/search').get(searchStandings);
router.route('/:id/:prop').get(getStandingsProperty);

export default router;
