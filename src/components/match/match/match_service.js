const matchModel = require('./match_model');
const modelError = require('../../../errors/model_error');
const Joi = require('joi');
const { updateStageVersion } = require('../stage/stage_model');
const searchMatch = async (data) => {
  try {
    await validateId(data.id);
    const response = await matchModel.searchMatch(data.id);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const createMatch = async (data) => {
  try {
    await validate(data.match);
    const response = await matchModel.createMatch(data.match);
    if (response.success && response.data.stageId) {
      await updateStageVersion(response.data.stageId);
    }
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const createManyMatch = async (data) => {
  try {
    await validateMany(data.matches);
    const response = await matchModel.createManyMatch(data.matches);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const getMatch = async (data) => {
  try {
    await validateId(data.id);
    const response = await matchModel.getMatch(data.id);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const getAllMatches = async () => {
  try {
    const response = await matchModel.getAllMatches();
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const updateMatch = async (data) => {
  try {
    await validateId(data.id);
    await validate(data.match);
    const response = await matchModel.updateMatch(data.id, data.match);
    if (response.success && response.data.stageId) {
      await updateStageVersion(response.data.stageId);
    }
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const deleteMatch = async (data) => {
  try {
    await validateId(data.id);
    const response = await matchModel.deleteMatch(data.id);
    if (response.success && response.data.stageId) {
      await updateStageVersion(response.data.stageId);
    }
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const deleteManyMatch = async (data) => {
  try {
    await validateIds(data.ids);
    const response = await matchModel.deleteManyMatch(data.ids);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
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
const validate = async (data, create = true) => {
  if (create) {
    await matchCreateSchema.validateAsync(data);
  } else {
    await matchUpdateSchema.validateAsync(data);
  }
};
const validateMany = async (data, create = true) => {
  if (create) {
    await matchCreateManySchema.validateAsync(data);
  }
};
const validateId = async (data) => {
  await idSchema.validateAsync(data);
};
const validateIds = async (data) => {
  await idArraySchema.validateAsync(data);
};
const idSchema = Joi.string().min(2).max(32).required();
const idArraySchema = Joi.array().items(idSchema).min(2).required();
const matchCreateSchema = Joi.object({
  id: Joi.string().min(2).required(),
  dateTime: Joi.date().iso().required(),
  homeTeamId: Joi.string().min(2).required(),
  awayTeamId: Joi.string().min(2).required(),
});
const matchCreateManySchema = Joi.array().items(matchCreateSchema).min(2).required();
const matchUpdateSchema = Joi.object({
  id: Joi.string().min(2),
  dateTime: Joi.date().iso(),
  homeTeamId: Joi.string().min(2),
  awayTeamId: Joi.string().min(2),
});
//maçları oluştur takımlarına bağla ve stagelerine bağla
//maç skorlarını oluştur maçlarına bağla
module.exports = {
  searchMatch,
  createMatch,
  createManyMatch,
  getMatch,
  getAllMatches,
  updateMatch,
  deleteMatch,
  deleteManyMatch,
};
