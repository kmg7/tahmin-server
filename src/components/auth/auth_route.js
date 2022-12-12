const { register, update } = require('./auth_controller');
const router = require('express').Router();

router.route('/auth').post(register).put(update);

module.exports = router;
