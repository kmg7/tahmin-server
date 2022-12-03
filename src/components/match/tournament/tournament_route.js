const express = require('express');
const router = express.Router();
const {
  createTournament,
  getTournament,
  getAllTournaments,
  updateTournament,
  deleteTournament,
  createManyTournament,
  searchTournament,
  deleteManyTournament,
} = require('./tournament_controller');
router.route('/tournament').get(getTournament).post(createTournament).put(updateTournament).delete(deleteTournament);
router.route('/tournament/many').get(getAllTournaments).post(createManyTournament).delete(deleteManyTournament);
router.route('/tournament/search').get(searchTournament);

module.exports = router;
