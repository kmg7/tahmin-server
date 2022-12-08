const express = require('express');
const router = express.Router();
const {
  changeActivity,
  createTournament,
  getTournament,
  getAllTournaments,
  updateTournament,
  deleteTournament,
  createManyTournament,
  searchTournament,
  deleteManyTournament,
  connectStages,
  disconnectStages,
} = require('./tournament_controller');

router.route('/tournament').get(getTournament).post(createTournament).put(updateTournament).delete(deleteTournament);
router.route('/tournament/activity').put(changeActivity);
router.route('/tournament/stages').post(connectStages).delete(disconnectStages);
router.route('/tournament/many').get(getAllTournaments).post(createManyTournament).delete(deleteManyTournament);
router.route('/tournament/search').get(searchTournament);

module.exports = router;
