import express from 'express';
const router = express.Router();

import {
  searchMatch,
  createMatch,
  createManyMatch,
  getMatch,
  getAllMatches,
  updateMatch,
  deleteMatch,
  deleteManyMatch,
} from '../controller/match_controller';

router.route('/').get(getMatch).post(createMatch).put(updateMatch).delete(deleteMatch);
router.route('/many').get(getAllMatches).post(createManyMatch).delete(deleteManyMatch);
router.route('/search').get(searchMatch);
export default router;
