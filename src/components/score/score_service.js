const model = require('./score_model');
const modelError = require('../../errors/model_error');
const Joi = require('joi');

const searchScore = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.searchScore(data.id);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const getAllScores = async () => {
  try {
    const response = await model.getAllScores();
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const createScore = async (data) => {
  try {
    await validate(data.score);
    const response = await model.createScore(data.score);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const getScore = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.getScore(data.id);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const updateScore = async (data) => {
  try {
    await validateId(data.id);
    await validate(data.score, false);
    const response = await model.updateScore(data.id, data.score);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const deleteScore = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.deleteScore(data.id);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const deleteManyScore = async (data) => {
  try {
    await validateIds(data.ids);
    const response = await model.deleteManyScore(data.ids);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const createManyScore = async (data) => {
  try {
    await validateMany(data.scores);
    const response = await model.createManyScore(data.scores);
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
    await scoreCreateSchema.validateAsync(tournament);
  } else {
    await scoreUpdateSchema.validateAsync(tournament);
  }
};
const validateMany = async (Score) => {
  await scoreCreateManySchema.validateAsync(Score);
};
const validateId = async (id) => {
  await idSchema.validateAsync(id);
};
const validateIds = async (ids) => {
  await idArraySchema.validateAsync(ids);
};

const idSchema = Joi.string().min(2).max(64).required();
const idArraySchema = Joi.array().items(idSchema).min(2).required();

const scoreCreateSchema = Joi.object({
  id: Joi.string(),
  username: Joi.string().min(2).max(32).required(),
  standingsId: Joi.string().required(),
});

const scoreUpdateSchema = Joi.object({
  id: Joi.string(),
  username: Joi.string().min(2).max(32),
  standingsId: Joi.string(),
});
const scoreCreateManySchema = Joi.array().items(scoreCreateSchema).min(2);

module.exports = {
  searchScore,
  getScore,
  getAllScores,
  createScore,
  createManyScore,
  updateScore,
  deleteScore,
  deleteManyScore,
};
