import { Router } from 'express';
const router = Router();

import { getUser, getAllUsers, searchUser, getUserProperty } from '../controller/user_controller.js';

router.route('/').get(getUser);
router.route('/many').get(getAllUsers);
router.route('/:id/:prop').get(getUserProperty);
router.route('/search').get(searchUser);
export default router;
