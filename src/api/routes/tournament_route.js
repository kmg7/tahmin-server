import { Router } from 'express';
const router = Router();

import { getTournament, getAllTournaments, searchTournament, getTournamentProperty } from '../controller/tournament_controller.js';

router.route('/').get(getTournament);
router.route('/many').get(getAllTournaments);
router.route('/:id/:prop').get(getTournamentProperty);
router.route('/search').get(searchTournament);

export default router;
