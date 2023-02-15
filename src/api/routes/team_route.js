import express from 'express';
const router = express.Router();

import { getTeam, getAllTeams, searchTeam, getTeamProperty } from '../controller/team_controller.js';

router.route('/').get(getTeam);
router.route('/many').get(getAllTeams);
router.route('/:id/:prop').get(getTeamProperty);

router.route('/search').get(searchTeam);

export default router;
