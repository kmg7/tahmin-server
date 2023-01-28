import { Router } from 'express';
import { register, update } from '../controller/auth_controller.js';
import { authenticateUser } from '../middleware/authentication.js';

const router = Router();

router.route('/register').post(register);
router.route('/update').post(authenticateUser, update);

export default router;
