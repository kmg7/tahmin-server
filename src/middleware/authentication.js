import { StatusCodes } from 'http-status-codes';
import { validateToken } from '../utils/authentication/index.js';
import logger from '../utils/logger.js';
export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      error: {
        message: 'Request not permitted',
      },
    });
  } else {
    const token = authHeader.split(' ')[1];
    try {
      const { valid, user, error } = await validateToken({ token: token });
      if (!valid) {
        res.status(error.code).json({ message: error.message });
      } else {
        req.user = user;
        next();
      }
    } catch (error) {
      // console.log(error);
      res.status(StatusCodes.UNAUTHORIZED).json({
        tokenError: {
          message: 'Warning! Unauthorized to access this route',
        },
      });
    }
  }
};
// logger.warn(`Unauhorized attempt\nRoute:${req.path}\nMethod:${req.method}\nUser:${req.user.authId}`);

export const authorizePermissions = (...level) => {
  return (req, res, next) => {
    if (req.user.isSU) {
      logger.info(`Admin attempt\nRoute:${req.path}\nMethod:${req.method}\nUser:${req.user.username}`);
      next();
    } else {
      if (permissions[level][req.method]) {
        next();
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          error: {
            message: 'Warning! Unauthorized to access this route',
          },
        });
      }
    }
  };
};
const permissions = {
  A: {
    GET: true,
    POST: true,
    PATCH: true,
  },
  B: {
    GET: true,
    POST: false,
    PATCH: true,
  },
  C: {
    GET: true,
    POST: false,
    PATCH: false,
  },
};

// const authorizePermissions = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       res.status(StatusCodes.UNAUTHORIZED).json({
//         tokenError: {
//           message: 'Warning! Unauthorized to access this route',
//         },
//       });
//     } else {
//       next();
//     }
//   };
// };
