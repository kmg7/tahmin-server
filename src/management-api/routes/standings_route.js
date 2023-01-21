import { Router } from 'express';
const router = Router();

import {
  searchStandings,
  getStandings,
  getAllStandings,
  createStandings,
  createManyStandings,
  updateStandings,
  deleteStandings,
  deleteManyStandings,
  upsertStandings,
  getStandingsProperty,
} from '../controller/standings_controller.js';

router.route('/').get(getStandings).post(createStandings).put(updateStandings).delete(deleteStandings);
router.route('/many').get(getAllStandings).post(createManyStandings).put(upsertStandings).delete(deleteManyStandings);
router.route('/search').get(searchStandings);
router.route('/:id/:prop').get(getStandingsProperty);

export default router;
