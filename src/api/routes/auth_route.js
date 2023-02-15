import { Router } from 'express';
import { register, update, check } from '../controller/auth_controller.js';
import { authenticateUser } from '../middleware/authentication.js';

const router = Router();

router.route('/register').post(register);
router.route('/update').post(authenticateUser, update);
router.route('/check').post(check);

export default router;
