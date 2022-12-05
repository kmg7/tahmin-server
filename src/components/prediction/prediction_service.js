const modelError = require('../../errors/model_error');
const model = require('./prediction_model');
const Joi = require('joi');

const searchPrediction = async (data) => {
  try {
    await validateSearch(data.matchId, data.userId);
    const response = await model.searchPrediction(data.matchId, data.userId);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const getAllPredictions = async (data) => {
  try {
    await validateId(data.matchId);
    const response = await model.getAllPredictions(data.matchId);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const createPrediction = async (data) => {
  try {
    await validate(data.prediction);
    const response = await model.createPrediction(data.prediction);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const getPrediction = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.getPrediction(data.id);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const updatePrediction = async (data) => {
  try {
    await validateId(data.predictionId);
    await validate(data.prediction, false);
    const response = await model.updatePrediction(data.predictionId, data.prediction);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const upsertManyPrediction = async (data) => {
  try {
    await validateId(data.userId);
    await validateMany(data.predictions, false);
    const response = await model.upsertManyPrediction(data.userId, data.predictions);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const deletePrediction = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.deletePrediction(data.id);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const deleteManyPrediction = async (data) => {
  try {
    await validateIds(data.ids);
    const response = await model.deleteManyPrediction(data.ids);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const createManyPrediction = async (data) => {
  try {
    await validateMany(data.predictions);
    const response = await model.createManyPrediction(data.predictions);
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
const validateSearch = async (matchId, userId) => {
  await predictionSearchSchema.validateAsync({ matchId: matchId, userId: userId });
};
const validate = async (prediction, create = true) => {
  if (create) {
    await predictionCreateSchema.validateAsync(prediction);
  } else {
    await predictionUpdateSchema.validateAsync(prediction);
  }
};
const validateMany = async (predictions, create = true) => {
  if (create) {
    await predictionCreateManySchema.validateAsync(predictions);
  } else {
    await predictionUpdateManySchema.validateAsync(predictions);
  }
};
const validateId = async (PredictionId) => {
  await idSchema.validateAsync(PredictionId);
};
const validateIds = async (Ids) => {
  await idArraySchema.validateAsync(Ids);
};
const idSchema = Joi.string().min(2).max(64).required();
const idArraySchema = Joi.array().items(idSchema).min(2).required();

const predictionCreateSchema = Joi.object({
  id: Joi.string(),
  matchId: Joi.string().required(),
  userId: Joi.string().required(),
  homeScore: Joi.number().integer().min(0).max(99).required(),
  awayScore: Joi.number().integer().min(0).max(99).required(),
});
const predictionUpdateSchema = Joi.object({
  homeScore: Joi.number().integer().min(0).max(99).required(),
  awayScore: Joi.number().integer().min(0).max(99).required(),
});
const predictionSearchSchema = Joi.object({
  matchId: Joi.string().required(),
  userId: Joi.string().required(),
});
const predictionUpdateManySchema = Joi.array()
  .items(
    Joi.object({
      matchId: Joi.string().required(),
      homeScore: Joi.number().integer().min(0).max(99).required(),
      awayScore: Joi.number().integer().min(0).max(99).required(),
    })
  )
  .min(1)
  .required();

const predictionCreateManySchema = Joi.array().items(predictionCreateSchema).min(2);

module.exports = {
  searchPrediction,
  getPrediction,
  getAllPredictions,
  createPrediction,
  createManyPrediction,
  updatePrediction,
  upsertManyPrediction,
  deletePrediction,
  deleteManyPrediction,
};
