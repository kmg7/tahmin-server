const { StatusCodes } = require('http-status-codes');
const { validateToken } = require('../utils/authentication');
const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      error: {
        message: 'Request not permitted',
      },
    });
  } else {
    const token = authHeader.split(' ')[1];
    console.log(token);
    try {
      const { username, role, userId } = validateToken({ token: token });
      req.user = { username, role, exp, userId };
      next();
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.UNAUTHORIZED).json({
        tokenError: {
          message: 'Warning! Unauthorized to access this route',
        },
      });
    }
  }
};

module.exports = { authenticateUser };
