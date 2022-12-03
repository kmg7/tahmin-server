const { string } = require('../../../utils/validators');
const model = require('./stage_model');
//TODO error responding with proj error codes implement
const createStage = async (data) => {
  try {
    await validate(data);
    const response = await model.createStage(data);
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
    if (error.isJoi) {
      return {
        success: false,
        error: modelError.NOT_VALID(error.details[0].path, error.details[0].message, error.details[0].type),
      };
    }
    return {
      success: false,
    };
  }
};
const getStage = async (id) => {
  try {
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
    if (error.isJoi) {
      return {
        success: false,
        error: modelError.NOT_VALID(error.details[0].path, error.details[0].message, error.details[0].type),
      };
    }
    return {
      success: false,
    };
  }
};
const updateStage = async (id, data) => {
  try {
    await validateId(id);
    await validate(data);
    const response = await model.updateStage(data.id, validation.data);
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
    if (error.isJoi) {
      return {
        success: false,
        error: modelError.NOT_VALID(error.details[0].path, error.details[0].message, error.details[0].type),
      };
    }
    return {
      success: false,
    };
  }
};
const deleteStage = async (id) => {
  try {
    await validateId(id);
    const response = await model.deleteStage(id);
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
    if (error.isJoi) {
      return {
        success: false,
        error: modelError.NOT_VALID(error.details[0].path, error.details[0].message, error.details[0].type),
      };
    }
    return {
      success: false,
    };
  }
};

const validate = async (stage, create = false) => {
  stage.create = create;
  await tournamentSchema.validateAsync(stage);
};
const validateId = async (id) => {
  await idSchema.validateAsync(id);
};
const validateIdList = async (ids) => {
  await idArraySchema.validateAsync(ids);
};
const idSchema = Joi.string().min(2).max(32);
const idArraySchema = Joi.array().items(idSchema()).min(2);
const stageSchema = Joi.object({
  create: Joi.boolean(),
  id: Joi.string().when('create', { is: true, then: Joi.required() }),
  name: Joi.string().min(2).max(32).when('create', { is: true, then: Joi.required() }),
  tournamentId: Joi.string().when('create', { is: true, then: Joi.required() }),
});
module.exports = {
  createStage,
  getStage,
  deleteStage,
  updateStage,
};
