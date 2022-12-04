const model = require('./team_model');
const modelError = require('../../errors/model_error');
const Joi = require('joi');
//TODO error responding with proj error codes implement

const searchTeam = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.searchTeam(data.id);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const getAllTeams = async () => {
  try {
    const response = await model.getAllTeams();
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const createTeam = async (data) => {
  try {
    await validate(data.team);
    const response = await model.createTeam(data.team);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const getTeam = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.getTeam(data.id);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const updateTeam = async (data) => {
  try {
    await validateId(data.id);
    await validate(data.team, false);
    const response = await model.updateTeam(data.id, data.team);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const deleteTeam = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.deleteTeam(data.id);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const deleteManyTeam = async (data) => {
  try {
    await validateIds(data.ids);
    const response = await model.deleteManyTeam(data.ids);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const createManyTeam = async (data) => {
  try {
    await validateMany(data.teams);
    const response = await model.createManyTeam(data.teams);
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
const validate = async (tournament, iscreate = true) => {
  if (iscreate) {
    await teamCreateSchema.validateAsync(tournament);
  } else {
    await teamUpdateSchema.validateAsync(tournament);
  }
};
const validateMany = async (Team) => {
  await teamCreateManySchema.validateAsync(Team);
};
const validateId = async (id) => {
  await idSchema.validateAsync(id);
};
const validateIds = async (ids) => {
  await idArraySchema.validateAsync(ids);
};
const idSchema = Joi.string().min(2).max(32).required();
const idArraySchema = Joi.array().items(idSchema).min(2).required();

const teamCreateSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(2).max(32).required(),
  shName: Joi.string().required(),
  logoUrl: Joi.string().required(),
});

const teamUpdateSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().min(2).max(32),
  shName: Joi.string(),
  logoUrl: Joi.string(),
});
const teamCreateManySchema = Joi.array().items(teamCreateSchema).min(2);

module.exports = {
  searchTeam,
  getTeam,
  getAllTeams,
  createTeam,
  createManyTeam,
  updateTeam,
  deleteTeam,
  deleteManyTeam,
};
