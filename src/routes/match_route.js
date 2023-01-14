import express from 'express';
const router = express.Router();
router.use('/match', require('./tournament_route'));
router.use('/match', require('./stage_route'));
router.use('/match', require('./match_route1'));

export default router;
