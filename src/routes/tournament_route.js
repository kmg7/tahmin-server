import express from 'express';
const router = express.Router();

import {
  createTournament,
  getTournament,
  getAllTournaments,
  updateTournament,
  deleteTournament,
  createManyTournament,
  searchTournament,
  deleteManyTournament,
} from '../controller/tournament_controller';

router.route('/tournament').get(getTournament).post(createTournament).put(updateTournament).delete(deleteTournament);
router.route('/tournament/many').get(getAllTournaments).post(createManyTournament).delete(deleteManyTournament);
router.route('/tournament/search').get(searchTournament);

export default router;
