import { register, update } from '../controller/auth_controller';
const router = require('express').Router();

router.route('/auth').post(register).put(update);

export default router;
