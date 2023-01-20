import express from 'express';
const router = express.Router();

import {
  createTeam,
  createManyTeam,
  updateTeam,
  deleteTeam,
  deleteManyTeam,
  getTeam,
  getAllTeams,
  searchTeam,
  getTeamProperty,
  upsertTeam,
} from '../controller/team_controller.js';

router.route('/').get(getTeam).post(createTeam).put(updateTeam).delete(deleteTeam);
router.route('/many').get(getAllTeams).post(createManyTeam).put(upsertTeam).delete(deleteManyTeam);
router.route('/:id/:prop').get(getTeamProperty);

router.route('/search').get(searchTeam);

export default router;
