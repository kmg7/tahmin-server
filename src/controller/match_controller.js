import service from '../service/match_service';
import { StatusCodes } from 'http-status-codes';
const createMatch = async (req, res) => {
  const response = await service.createMatch(req.body);
  if (response.success) {
    res.status(StatusCodes.CREATED).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const createManyMatch = async (req, res) => {
  const response = await service.createManyMatch(req.body);
  if (response.success) {
    res.status(StatusCodes.CREATED).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const updateMatch = async (req, res) => {
  const response = await service.updateMatch(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const deleteMatch = async (req, res) => {
  const response = await service.deleteMatch(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const deleteManyMatch = async (req, res) => {
  const response = await service.deleteManyMatch(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const getMatch = async (req, res) => {
  const response = await service.getMatch(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const getAllMatches = async (req, res) => {
  const response = await service.getAllMatches(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const searchMatch = async (req, res) => {
  const response = await service.searchMatch(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};

export default {
  searchMatch,
  createMatch,
  createManyMatch,
  getMatch,
  getAllMatches,
  updateMatch,
  deleteMatch,
  deleteManyMatch,
};
