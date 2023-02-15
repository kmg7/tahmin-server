import { Router } from 'express';
import routes from './routes/index.js';
import { authenticateUser, authorizePermissions } from './middleware/authentication.js';

const router = Router();

router.use('/auth', routes.auth);
router.use('/match', authenticateUser, authorizePermissions('match'), routes.match);
router.use('/stage', authenticateUser, authorizePermissions('stage'), routes.stage);
router.use('/team', authenticateUser, authorizePermissions('team'), routes.team);
router.use('/country', authenticateUser, authorizePermissions('country'), routes.country);
router.use('/tournament', authenticateUser, authorizePermissions('tournament'), routes.tournament);
router.use('/matchScore', authenticateUser, authorizePermissions('match_score'), routes.match_score);
router.use('/user', authenticateUser, authorizePermissions('user'), routes.user);
router.use('/prediction', authenticateUser, authorizePermissions('prediction'), routes.prediction);
router.use('/standings', authenticateUser, authorizePermissions('standings'), routes.standings);
router.use('/score', authenticateUser, authorizePermissions('score'), routes.score);

export default router;
