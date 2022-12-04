const express = require('express');
const router = express.Router();
router.use('/match', require('./tournament/tournament_route'));
router.use('/match', require('./stage/stage_route'));
router.use('/match', require('./match/match_route'));

module.exports = router;
