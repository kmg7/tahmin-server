import { AuthManager } from '../../utils/authentication/auth_manager.js';
import { productAdmin } from '../../utils/authentication/firebase_utils.js';
import { NODE_ENV, DEV_AUTH_ID, DEV_AUTH_NAME, DEV_AUTH_MAIL } from '../../config.js';
import { errorCodes, errorModel } from '../../utils/errors/index.js';
const auth_manager = new AuthManager({ firebaseAdmin: productAdmin });
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
      res.status(401).json(errorModel({ code: errorCodes.SERVER.unauthorized }));
    } else {
      const token = authHeader.split(' ')[1];
      try {
        const decToken = await auth_manager.validateToken(token);
        console.log(decToken);
        if (!decToken.valid) {
          res.status(401).json(errorModel({ code: errorCodes.SERVER.unauthorized }));
        } else {
          req.user = decToken.user;
          next();
        }
      } catch (error) {
        res.status(401).json(errorModel({ code: errorCodes.SERVER.unauthorized }));
      }
    }
  }
};
