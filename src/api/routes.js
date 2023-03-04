import { Router } from 'express';
import routes from './routes/index.js';
import { authenticateUser } from './middleware/authentication.js';

const router = Router();

router.use('/auth', routes.auth);
router.use('/match', authenticateUser, routes.match);
router.use('/stage', authenticateUser, routes.stage);
router.use('/team', authenticateUser, routes.team);
router.use('/country', authenticateUser, routes.country);
router.use('/tournament', authenticateUser, routes.tournament);
router.use('/matchScore', authenticateUser, routes.match_score);
router.use('/user', authenticateUser, routes.user);
router.use('/prediction', authenticateUser, routes.prediction);
router.use('/standings', authenticateUser, routes.standings);
router.use('/score', authenticateUser, routes.score);

export default router;
