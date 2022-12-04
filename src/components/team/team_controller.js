const service = require('./team_service');
const { StatusCodes } = require('http-status-codes');

const createTeam = async (req, res) => {
  const response = await service.createTeam(req.body);
  if (response.success) {
    res.status(StatusCodes.CREATED).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const createManyTeam = async (req, res) => {
  const response = await service.createManyTeam(req.body);
  if (response.success) {
    res.status(StatusCodes.CREATED).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const updateTeam = async (req, res) => {
  const response = await service.updateTeam(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const deleteTeam = async (req, res) => {
  const response = await service.deleteTeam(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const deleteManyTeam = async (req, res) => {
  const response = await service.deleteManyTeam(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const getTeam = async (req, res) => {
  const response = await service.getTeam(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const getAllTeams = async (req, res) => {
  const response = await service.getAllTeams();
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const searchTeam = async (req, res) => {
  const response = await service.searchTeam(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};

module.exports = {
  createTeam,
  createManyTeam,
  updateTeam,
  deleteTeam,
  deleteManyTeam,
  getTeam,
  getAllTeams,
  searchTeam,
};
