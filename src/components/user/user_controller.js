const service = require('./user_service');
const { StatusCodes } = require('http-status-codes');

const createUser = async (req, res) => {
  const response = await service.createUser(req.body);
  if (response.success) {
    res.status(StatusCodes.CREATED).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const createManyUser = async (req, res) => {
  const response = await service.createManyUser(req.body);
  if (response.success) {
    res.status(StatusCodes.CREATED).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const updateUser = async (req, res) => {
  const response = await service.updateUser(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const deleteUser = async (req, res) => {
  const response = await service.deleteUser(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const deleteManyUser = async (req, res) => {
  const response = await service.deleteManyUser(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const getUser = async (req, res) => {
  const response = await service.getUser(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const getAllUsers = async (req, res) => {
  const response = await service.getAllUsers(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const searchUser = async (req, res) => {
  const response = await service.searchUser(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};

module.exports = {
  createUser,
  createManyUser,
  updateUser,
  deleteUser,
  deleteManyUser,
  getUser,
  getAllUsers,
  searchUser,
};
