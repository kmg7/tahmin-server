import express from 'express';
const router = express.Router();

import {
  searchStandings,
  getStandings,
  getAllStandings,
  createStandings,
  createManyStandings,
  updateStandings,
  deleteStandings,
  deleteManyStandings,
} from '../controller/standings_controller';

router.route('/standings').get(getStandings).post(createStandings).put(updateStandings).delete(deleteStandings);
router.route('/standings/many').get(getAllStandings).post(createManyStandings).delete(deleteManyStandings);
router.route('/standings/search').get(searchStandings);

export default router;
