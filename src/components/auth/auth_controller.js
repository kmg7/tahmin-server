const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
  try {
    const response = await require('./auth_service').register(req.body);
    if (!response.success) {
      if (response.error.isToken) {
        res.status(response.error.code).json(response.error.message);
      }
      res.status(StatusCodes.BAD_REQUEST).json(response.error);
    }
    res.status(StatusCodes.CREATED).json(response.data);
  } catch (error) {}
};
const update = async (req, res) => {
  try {
    const response = await require('./auth_service').update(req.body);
    if (!response.success) {
      if (response.error.isValidation) {
        res.status(response.error.code).json(response.error.message);
      }
      res.status(StatusCodes.BAD_REQUEST).json(response.error);
    }
    res.status(StatusCodes.OK).json(response.data);
  } catch (error) {}
};
module.exports = {
  register,
  update,
};
