const model = require('./standings_model');
const modelError = require('../../errors/model_error');
const Joi = require('joi');
const searchStandings = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.searchStandings(data.id);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const getAllStandings = async () => {
  try {
    const response = await model.getAllStandings();
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const createStandings = async (data) => {
  try {
    await validate(data.standings);
    const response = await model.createStandings(data.standings);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const getStandings = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.getStandings(data.id);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const updateStandings = async (data) => {
  try {
    await validateId(data.id);
    await validate(data.standings, false);
    const response = await model.updateStandings(data.id, data.standings);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const deleteStandings = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.deleteStandings(data.id);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const deleteManyStandings = async (data) => {
  try {
    await validateIds(data.ids);
    const response = await model.deleteManyStandings(data.ids);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const createManyStandings = async (data) => {
  try {
    await validateMany(data.standings);
    const response = await model.createManyStandings(data.standings);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const handleResponse = (response) => {
  if (!response.success) {
    return {
      success: false,
      error: response.error,
    };
  }
  return {
    success: true,
    data: response.data,
  };
};
const handleError = (error) => {
  if (error.isJoi) {
    return {
      success: false,
      error: modelError.NOT_VALID(error.details[0].path, error.details[0].message, error.details[0].type),
    };
  }
  return {
    success: false,
  };
};
const validate = async (standings, iscreate = true) => {
  if (iscreate) {
    await standingsCreateSchema.validateAsync(standings);
  } else {
    await standingsUpdateSchema.validateAsync(standings);
  }
};
const validateMany = async (Standings) => {
  await StandingsCreateManySchema.validateAsync(Standings);
};
const validateId = async (id) => {
  await idSchema.validateAsync(id);
};
const validateIds = async (ids) => {
  await idArraySchema.validateAsync(ids);
};
const idSchema = Joi.string().min(2).max(32).required();
const idArraySchema = Joi.array().items(idSchema).min(2).required();

const standingsCreateSchema = Joi.object({
  id: Joi.string().required(),
  tournamentId: Joi.string().required(),
});

const standingsUpdateSchema = Joi.object({
  id: Joi.string(),
  tournamentId: Joi.string(),
});
const StandingsCreateManySchema = Joi.array().items(standingsCreateSchema).min(2);

module.exports = {
  searchStandings,
  getStandings,
  getAllStandings,
  createStandings,
  createManyStandings,
  updateStandings,
  deleteStandings,
  deleteManyStandings,
};
