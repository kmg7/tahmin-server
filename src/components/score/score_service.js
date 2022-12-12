const modelError = require('../../errors/model_error');
const { dbModel, Models } = require('../../utils/database');
const score = Models.SCORE;
const Joi = require('joi');

const searchScore = async (data) => {
  try {
    await validate({ schema: scoreFindSchema, data: data, field: 'score' });
    await validate({ schema: scoreSortSchema, data: data, field: 'sort' });
    await validate({ schema: scoreSelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: score,
        where: { [data.score.where]: { startsWith: data.score.value } },
        select: data.select,
        orderBy: { [data.sort.field]: data.sort.order },
        skip: data.pagination.skip,
        take: data.pagination.take,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const getAllScores = async (data) => {
  try {
    await validate({ schema: scoreSortSchema, data: data, field: 'sort' });
    await validate({ schema: scoreSelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: score,
        select: data.select,
        orderBy: { [data.sort.field]: data.sort.order },
        skip: data.pagination.skip,
        take: data.pagination.take,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const createScore = async (data) => {
  try {
    await validate({ schema: scoreCreateSchema, data: data, field: 'score' });
    await validate({ schema: scoreSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.create({
        model: score,
        select: data.select,
        data: data.score,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const getScore = async (data) => {
  try {
    await validate({ schema: scoreFindSchema, data: data, field: 'score' });
    await validate({ schema: scoreSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.get({
        model: score,
        where: { [data.score.where]: data.score.value },
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const updateScore = async (data) => {
  try {
    await validate({ schema: scoreFindSchema, data: data, field: 'score' });
    await validate({ schema: scoreSelectSchema, data: data, field: 'select' });
    await validate({ schema: scoreUpdateSchema, data: data, field: 'update' });
    return handleResponse(
      await dbModel.update({
        model: score,
        where: { [data.score.where]: data.score.value },
        data: data.update,
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const deleteScore = async (data) => {
  try {
    await validate({ schema: scoreFindSchema, data: data, field: 'score' });
    await validate({ schema: scoreSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.remove({
        model: score,
        where: { [data.score.where]: data.score.value },
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const deleteManyScore = async (data) => {
  try {
    await validate({ schema: scoreFindManySchema, data: data, field: 'scores' });
    return handleResponse(
      await dbModel.removeMany({
        model: score,
        where: { [data.scores.where]: { in: data.scores.values } },
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const createManyScore = async (data) => {
  try {
    await validate({ schema: scoreCreateManySchema, data: data, field: 'scores' });
    return handleResponse(
      await dbModel.createMany({
        model: score,
        data: data.scores,
        select: data.select,
      })
    );
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
  if (error.isValidation) {
    return {
      success: false,
      error: modelError.NOT_PROVIDED(error.meta),
    };
  }
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

const validate = async ({ schema, data, field }) => {
  if (!data[field]) {
    throw { isValidation: true, meta: `${field}` };
  }
  await schema.validateAsync(data[field]);
};

const paginationSchema = Joi.object({
  skip: Joi.number().integer().min(0),
  take: Joi.number().integer().min(5).max(100).required(),
});

const scoreSortSchema = Joi.object({
  field: Joi.string().allow('username', 'id', 'standingsId').required(),
  order: Joi.string().allow('asc', 'desc').required(),
}).required();

const scoreFindSchema = Joi.object({
  where: Joi.string().allow('username', 'id', 'standingsId').required(),
  value: Joi.string().min(2).required(),
}).required();

const scoreFindManySchema = Joi.object({
  where: Joi.string().allow('username', 'id', 'standingsId').required(),
  values: Joi.array().items(Joi.string().min(2)).min(1).required(),
});

const scoreSelectSchema = Joi.object({
  id: Joi.boolean(),
  username: Joi.boolean(),
  standingsId: Joi.boolean(),
}).required();

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
