import service from '../service/country_service';
import { StatusCodes } from 'http-status-codes';

const createCountry = async (req, res) => {
  const response = await service.createCountry(req.body);
  if (response.success) {
    res.status(StatusCodes.CREATED).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const createManyCountry = async (req, res) => {
  const response = await service.createManyCountry(req.body);
  if (response.success) {
    res.status(StatusCodes.CREATED).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const updateCountry = async (req, res) => {
  const response = await service.updateCountry(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const deleteCountry = async (req, res) => {
  const response = await service.deleteCountry(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const deleteManyCountry = async (req, res) => {
  const response = await service.deleteManyCountry(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const getCountry = async (req, res) => {
  const response = await service.getCountry(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const getAllCountries = async (req, res) => {
  const response = await service.getAllCountries(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};
const searchCountry = async (req, res) => {
  const response = await service.searchCountry(req.body);
  if (response.success) {
    res.status(StatusCodes.OK).json(response);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
};

export default {
  createCountry,
  createManyCountry,
  updateCountry,
  deleteCountry,
  deleteManyCountry,
  getCountry,
  getAllCountries,
  searchCountry,
};
