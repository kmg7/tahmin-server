import { Router } from 'express';
const router = Router();

import {
  searchMatch,
  createMatch,
  createManyMatch,
  getMatch,
  getAllMatches,
  updateMatch,
  deleteMatch,
  deleteManyMatch,
  getMatchProperty,
} from '../controller/match_controller.js';

router.route('/').get(getMatch).post(createMatch).put(updateMatch).delete(deleteMatch);
router.route('/many').get(getAllMatches).post(createManyMatch).delete(deleteManyMatch);
router.route('/search').get(searchMatch);
router.route('/:id/:prop').get(getMatchProperty);
export default router;
