import { Router } from 'express';

import {
  createModerator,
  createManyModerator,
  deleteModerator,
  deleteManyModerator,
  getAllModerators,
  getModerator,
  getModeratorProperty,
  searchModerator,
  updateModerator,
  upsertModerator,
} from '../controller/moderator_controller.js';
const router = Router();

router.route('/').get(getModerator).post(createModerator).put(updateModerator).delete(deleteModerator);
router.route('/many').get(getAllModerators).post(createManyModerator).put(upsertModerator).delete(deleteManyModerator);
router.route('/:id/:prop').get(getModeratorProperty);
router.route('/search').get(searchModerator);

export default router;
