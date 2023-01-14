import service from '../service/prediction_service';
import { StatusCodes } from 'http-status-codes';

const createPrediction = async (req, res) => {
  const response = await service.createPrediction(req.body);
  if (response.success) {
    res.status(StatusCodes.CREATED).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const createManyPrediction = async (req, res) => {
  const response = await service.createManyPrediction(req.body);
  if (response.success) {
    res.status(StatusCodes.CREATED).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const updatePrediction = async (req, res) => {
  const response = await service.updatePrediction(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const updateManyPrediction = async (req, res) => {
  const response = await service.upsertManyPrediction(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const deletePrediction = async (req, res) => {
  const response = await service.deletePrediction(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const deleteManyPrediction = async (req, res) => {
  const response = await service.deleteManyPrediction(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const getPrediction = async (req, res) => {
  const response = await service.getPrediction(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const getAllPredictions = async (req, res) => {
  const response = await service.getAllPredictions(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const searchPrediction = async (req, res) => {
  const response = await service.searchPrediction(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};

export default {
  createPrediction,
  createManyPrediction,
  updatePrediction,
  updateManyPrediction,
  deletePrediction,
  deleteManyPrediction,
  getPrediction,
  getAllPredictions,
  searchPrediction,
};
