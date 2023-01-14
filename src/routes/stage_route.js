import express from 'express';
const router = express.Router();

import {
  changeActivity,
  createStage,
  createManyStage,
  getStage,
  getAllStages,
  searchStage,
  deleteManyStage,
  deleteStage,
  updateStage,
} from '../controller/stage_controller';

router.route('/stage').get(getStage).post(createStage).put(updateStage).delete(deleteStage);
router.route('/stage/many').get(getAllStages).post(createManyStage).delete(deleteManyStage);
router.route('/stage/search').get(searchStage);

export default router;
