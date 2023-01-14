import service from '../service/tournament_service';
import { StatusCodes } from 'http-status-codes';

const createTournament = async (req, res) => {
  const response = await service.createTournament(req.body);
  if (response.success) {
    res.status(StatusCodes.CREATED).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const createManyTournament = async (req, res) => {
  const response = await service.createManyTournament(req.body);
  if (response.success) {
    res.status(StatusCodes.CREATED).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const updateTournament = async (req, res) => {
  const response = await service.updateTournament(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const changeActivity = async (req, res) => {
  const response = await service.changeActivity(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const deleteTournament = async (req, res) => {
  const response = await service.deleteTournament(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const deleteManyTournament = async (req, res) => {
  const response = await service.deleteManyTournament(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const getTournament = async (req, res) => {
  const response = await service.getTournament(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const getAllTournaments = async (req, res) => {
  const response = await service.getAllTournaments(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const searchTournament = async (req, res) => {
  const response = await service.searchTournament(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};

export default {
  changeActivity,
  createTournament,
  createManyTournament,
  updateTournament,
  deleteTournament,
  deleteManyTournament,
  getTournament,
  getAllTournaments,
  searchTournament,
};