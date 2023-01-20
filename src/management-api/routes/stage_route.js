import { Router } from 'express';
const router = Router();

import {
  createStage,
  createManyStage,
  getStage,
  getAllStages,
  searchStage,
  getStageProperty,
  deleteManyStage,
  deleteStage,
  updateStage,
  upsertStage,
} from '../controller/stage_controller.js';

router.route('/').get(getStage).post(createStage).put(updateStage).delete(deleteStage);
router.route('/many').get(getAllStages).post(createManyStage).put(upsertStage).delete(deleteManyStage);
router.route('/search').get(searchStage);
router.route('/:id/:prop').get(getStageProperty);

export default router;
