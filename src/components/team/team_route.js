const express = require('express');
const router = express.Router();
const {
  createTeam,
  createManyTeam,
  updateTeam,
  deleteTeam,
  deleteManyTeam,
  getTeam,
  getAllTeams,
  searchTeam,
} = require('./team_controller');

router.route('/team').get(getTeam).post(createTeam).put(updateTeam).delete(deleteTeam);
router.route('/team/many').get(getAllTeams).post(createManyTeam).delete(deleteManyTeam);
router.route('/team/search').get(searchTeam);

module.exports = router;
