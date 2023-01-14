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
} from '../controller/team_controller';

router.route('/team').get(getTeam).post(createTeam).put(updateTeam).delete(deleteTeam);
router.route('/team/many').get(getAllTeams).post(createManyTeam).delete(deleteManyTeam);
router.route('/team/search').get(searchTeam);

export default router;
