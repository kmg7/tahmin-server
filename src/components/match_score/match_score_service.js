const model = require('./match_score_model');
const modelError = require('../../errors/model_error');
const Joi = require('joi');

const searchMatchScore = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.searchMatchScore(data.id);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const createMatchScore = async (data) => {
  try {
    await validate(data.matchScore);
    const response = await model.createMatchScore(data.matchScore);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const createManyMatchScore = async (data) => {
  try {
    await validateMany(data.matchScores);
    const response = await model.createManyMatchScore(data.matchScores);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const getMatchScore = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.getMatchScore(data.id);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const getAllMatchScores = async () => {
  try {
    const response = await model.getAllMatchScores();
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const updateMatchScore = async (data) => {
  try {
    await validateId(data.id);
    await validate(data.matchScore, false);
    const response = await model.updateMatchScore(data.id, data.matchScore);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const deleteMatchScore = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.deleteMatchScore(data.id);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const deleteManyMatchScore = async (data) => {
  try {
    await validateIds(data.ids);
    const response = await model.deleteManyMatchScore(data.ids);
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
    await matchScoreCreateSchema.validateAsync(data);
  } else {
    await matchScoreUpdateSchema.validateAsync(data);
  }
};
const validateMany = async (data, create = true) => {
  if (create) {
    await matchScoreCreateManySchema.validateAsync(data);
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
const matchScoreCreateSchema = Joi.object({
  id: Joi.string().min(2).required(),
  homeScore: Joi.number().integer().min(0).required(),
  awayScore: Joi.number().integer().min(0).required(),
});
const matchScoreCreateManySchema = Joi.array().items(matchScoreCreateSchema).min(2).required();
const matchScoreUpdateSchema = Joi.object({
  id: Joi.string().min(2),
  homeScore: Joi.number().integer().min(0),
  awayScore: Joi.number().integer().min(0),
});
//maçları oluştur takımlarına bağla ve stagelerine bağla
//maç skorlarını oluştur maçlarına bağla
module.exports = {
  searchMatchScore,
  createMatchScore,
  createManyMatchScore,
  getMatchScore,
  getAllMatchScores,
  updateMatchScore,
  deleteMatchScore,
  deleteManyMatchScore,
};
