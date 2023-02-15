import { Router } from 'express';

import { getAllModerators, getModerator, getModeratorProperty, searchModerator } from '../controller/moderator_controller.js';
const router = Router();

router.route('/').get(getModerator);
router.route('/many').get(getAllModerators);
router.route('/:id/:prop').get(getModeratorProperty);
router.route('/search').get(searchModerator);

export default router;
