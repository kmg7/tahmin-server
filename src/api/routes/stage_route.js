import { Router } from 'express';
const router = Router();

import { getStage, getAllStages, searchStage, getStageProperty } from '../controller/stage_controller.js';

router.route('/').get(getStage);
router.route('/many').get(getAllStages);
router.route('/search').get(searchStage);
router.route('/:id/:prop').get(getStageProperty);

export default router;
