const express = require('express');
const router = express.Router();
router.use('/', require('./tournament/tournament_route'));

module.exports = router;
