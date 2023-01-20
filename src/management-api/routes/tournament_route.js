import { Router } from 'express';
const router = Router();

import {
  createTournament,
  getTournament,
  getAllTournaments,
  updateTournament,
  deleteTournament,
  createManyTournament,
  searchTournament,
  deleteManyTournament,
  getTournamentProperty,
  upsertTournament,
} from '../controller/tournament_controller.js';

router.route('/').get(getTournament).post(createTournament).put(updateTournament).delete(deleteTournament);

router.route('/many').get(getAllTournaments).post(createManyTournament).put(upsertTournament).delete(deleteManyTournament);

router.route('/:id/:prop').get(getTournamentProperty);

router.route('/search').get(searchTournament);

export default router;
