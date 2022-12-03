const service = require('./tournament_service');
const { StatusCodes } = require('http-status-codes');

const createTournament = async (req, res) => {
  const response = await service.createTournament(req.body);
  if (response.success) {
    res.status(StatusCodes.CREATED).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const createManyTournament = async (req, res) => {
  const response = await service.createManyTournament(req.body.data);
  if (response.success) {
    res.status(StatusCodes.CREATED).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const updateTournament = async (req, res) => {
  const response = await service.updateTournament(req.body.id, req.body.data);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const deleteTournament = async (req, res) => {
  const response = await service.deleteTournament(req.body.id);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const deleteManyTournament = async (req, res) => {
  const response = await service.deleteManyTournament(req.body.ids);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const getTournament = async (req, res) => {
  const response = await service.getTournament(req.body.id);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const getAllTournaments = async (req, res) => {
  const response = await service.getAllTournaments();
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const searchTournament = async (req, res) => {
  const response = await service.searchTournaments(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
module.exports = {
  createTournament,
  createManyTournament,
  updateTournament,
  deleteTournament,
  deleteManyTournament,
  getTournament,
  getAllTournaments,
  searchTournament,
};
