import { Router } from 'express';
import routes from './routes/index.js';
import { authenticateUser, authorizePermissions } from './middleware/authentication.js';

const router = Router();

// router.use('/auth', routes.auth);
router.use('/match', authenticateUser, authorizePermissions('C'), routes.match);
router.use('/stage', authenticateUser, authorizePermissions('C'), routes.stage);
router.use('/team', authenticateUser, authorizePermissions('C'), routes.team);
router.use('/country', authenticateUser, authorizePermissions('C'), routes.country);
router.use('/tournament', authenticateUser, authorizePermissions('C'), routes.tournament);
router.use('/match_score', authenticateUser, authorizePermissions('C'), routes.match_score);
router.use('/user', authenticateUser, authorizePermissions('B'), routes.user);
router.use('/prediction', authenticateUser, authorizePermissions('A'), routes.prediction);
router.use('/standings', authenticateUser, authorizePermissions('C'), routes.standings);
router.use('/score', authenticateUser, authorizePermissions('C'), routes.score);

export default router;
