import { AuthManager } from '../../utils/authentication/auth_manager.js';
import { managementAdmin } from '../../utils/authentication/firebase_utils.js';
import { NODE_ENV, DEV_AUTH_ID, DEV_AUTH_NAME, DEV_AUTH_MAIL } from '../../config.js';
import { getMessage, ErrorLayers } from '../../utils/errors/index.js';
import checkPermissions from '../../utils/authentication/check_permissions.js';
import { Models, ORMManager } from '../../utils/database/sql/index.js';
const authorityModel = new ORMManager({ model: Models.AUTHORITY });
const auth_manager = new AuthManager({ firebaseAdmin: managementAdmin });
export const authenticateUser = async (req, res, next) => {
  //FIXME no prod
  if (NODE_ENV == 'development-no-auth') {
    req.user = {
      id: DEV_AUTH_ID,
      username: DEV_AUTH_NAME,
      email: DEV_AUTH_MAIL,
    };
    next();
  } else {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        message: getMessage({ layer: ErrorLayers.server, code: 'unauthorized' }),
      });
    } else {
      const token = authHeader.split(' ')[1];
      try {
        const decToken = await auth_manager.validateToken(token);
        if (!decToken.valid) {
          res.status(401).json({ message: getMessage({ layer: ErrorLayers.server, code: 'unauthorized' }) });
        } else {
          req.user = decToken.user;
          next();
        }
      } catch (error) {
        res.status(401).json({
          message: getMessage({ layer: ErrorLayers.server, code: 'unauthorized' }),
        });
      }
    }
  }
};

export const authorizePermissions = (...feature) => {
  return async (req, res, next) => {
    if (NODE_ENV == 'development-no-auth') {
      next();
    } else {
      const autResponse = await getUserRigths(feature[0], req.user.id);
      if (autResponse.authorized) {
        const authorized = await checkPermissions({ role: autResponse.role, feature: feature[0], method: req.method });
        if (authorized) {
          next();
          return;
        }
      }
      res.status(401).json({
        message: getMessage({ layer: ErrorLayers.server, code: 'unauthorized' }),
      });
    }
  };
};

const getUserRigths = async (featureId, userId) => {
  const response = await authorityModel.get({
    where: {
      featureId_moderatorId: {
        featureId: `feature-${featureId}`,
        moderatorId: userId,
      },
    },
    select: {
      role: true,
    },
  });
  if (response.success && response.data) {
    return {
      authorized: true,
      role: response.data.role,
    };
  }
  return {
    authorized: false,
  };
};
