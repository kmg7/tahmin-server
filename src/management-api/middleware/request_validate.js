import { StatusCodes } from 'http-status-codes';

export const validateContentType = (req, res, next) => {
  if (!(req.method == 'GET' || req.method == 'DELETE')) {
    if (req.headers['content-type'] !== 'application/json') {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Content-Type must be application/json',
      });
      return;
    }
  }
  next();
};
