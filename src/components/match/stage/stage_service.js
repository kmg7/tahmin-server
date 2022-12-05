const Joi = require('joi');
const { string } = require('../../../utils/validators');
const model = require('./stage_model');
const modelError = require('../../../errors/model_error');
const searchStage = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.searchStage(data.id);
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
  } catch (error) {
    return handleError(error);
  }
};
const createStage = async (data) => {
  try {
    await validate(data.stage);
    const response = await model.createStage(data.stage);
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
  } catch (error) {
    return handleError(error);
  }
};
const getStage = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.getStage(data.id);
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
  } catch (error) {
    return handleError(error);
  }
};
const updateStage = async (data) => {
  try {
    await validateId(data.id);
    await validate(data.stage);
    const response = await model.updateStage(data.id, data.stage);
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
  } catch (error) {
    return handleError(error);
  }
};
const deleteStage = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.deleteStage(data.id);
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
  } catch (error) {
    return handleError(error);
  }
};
const createManyStage = async (data) => {
  try {
    await validateMany(data.stages);
    const response = await model.createManyStage(data.stages);
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
  } catch (error) {
    return handleError(error);
  }
};
const getAllStages = async () => {
  try {
    const response = await model.getAllStages();
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
  } catch (error) {
    return handleError(error);
  }
};
const deleteManyStage = async (data) => {
  try {
    await validateIds(data.ids);
    const response = await model.deleteManyStage(data.ids);
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
  } catch (error) {
    return handleError(error);
  }
};
const connectMatches = async (data) => {
  try {
    await validateId(data.id);
    await validateIds(data.matches);
    const response = await model.connectMatches(data.id, data.matches);
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
  } catch (error) {
    return handleError(error);
  }
};
const disconnectMatches = async (data) => {
  try {
    await validateId(data.id);
    await validateIds(data.matches);
    const response = await model.disconnectMatches(data.id, data.matches);
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
const validate = async (stage, create = true) => {
  if (create) {
    await stageCreateSchema.validateAsync(stage);
  } else {
    await stageUpdateSchema.validateAsync(stage);
  }
};
const validateMany = async (stages) => {
  await stageCreateManySchema.validateAsync(stages);
};
const validateId = async (id) => {
  await idSchema.validateAsync(id);
};
const validateIds = async (ids) => {
  await idArraySchema.validateAsync(ids);
};
const idSchema = Joi.string().min(2).max(32).required();
const idArraySchema = Joi.array().items(idSchema).min(2).required();
const stageCreateSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
});
const stageUpdateSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
});
const stageCreateManySchema = Joi.array().items(stageCreateSchema).min(2).required();
module.exports = {
  searchStage,
  createStage,
  createManyStage,
  getStage,
  getAllStages,
  deleteStage,
  deleteManyStage,
  updateStage,
  connectMatches,
  disconnectMatches,
};
