const service = require('./score_service');
const { StatusCodes } = require('http-status-codes');

const createScore = async (req, res) => {
  const response = await service.createScore(req.body);
  if (response.success) {
    res.status(StatusCodes.CREATED).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const createManyScore = async (req, res) => {
  const response = await service.createManyScore(req.body);
  if (response.success) {
    res.status(StatusCodes.CREATED).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const updateScore = async (req, res) => {
  const response = await service.updateScore(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const deleteScore = async (req, res) => {
  const response = await service.deleteScore(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const deleteManyScore = async (req, res) => {
  const response = await service.deleteManyScore(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const getScore = async (req, res) => {
  const response = await service.getScore(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const getAllScores = async (req, res) => {
  const response = await service.getAllScores();
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const searchScore = async (req, res) => {
  const response = await service.searchScore(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};

module.exports = {
  searchScore,
  getScore,
  getAllScores,
  createScore,
  createManyScore,
  updateScore,
  deleteScore,
  deleteManyScore,
};
