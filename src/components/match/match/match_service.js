const { dbModel, Models } = require('../../../utils/database');
const modelError = require('../../../errors/model_error');
const match = Models.MATCH;
const Joi = require('joi');

const searchMatch = async (data) => {
  try {
    await validate({ schema: matchFindSchema, data: data, field: 'match' });
    await validate({ schema: matchSortSchema, data: data, field: 'sort' });
    await validate({ schema: matchSelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: match,
        where: { [data.match.where]: { startsWith: data.match.value } },
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

const getAllMatches = async (data) => {
  try {
    await validate({ schema: matchSortSchema, data: data, field: 'sort' });
    await validate({ schema: matchSelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: match,
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

const createMatch = async (data) => {
  try {
    await validate({ schema: matchCreateSchema, data: data, field: 'match' });
    await validate({ schema: matchSelectSchema, data: data, field: 'select' });
    const response = await dbModel.create({
      model: match,
      select: data.select,
      data: data.match,
    });
    // if (response.success && response.data.stageId) {
    //   await updateStageVersion(response.data.stageId);
    // }
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const getMatch = async (data) => {
  try {
    await validate({ schema: matchFindSchema, data: data, field: 'match' });
    await validate({ schema: matchSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.get({
        model: match,
        where: { [data.match.where]: data.match.value },
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const updateMatch = async (data) => {
  try {
    await validate({ schema: matchFindSchema, data: data, field: 'match' });
    await validate({ schema: matchSelectSchema, data: data, field: 'select' });
    await validate({ schema: matchUpdateSchema, data: data, field: 'update' });
    return handleResponse(
      await dbModel.update({
        model: match,
        where: { [data.match.where]: data.match.value },
        data: data.update,
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const deleteMatch = async (data) => {
  try {
    await validate({ schema: matchFindSchema, data: data, field: 'match' });
    await validate({ schema: matchSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.remove({
        model: match,
        where: { [data.match.where]: data.match.value },
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const deleteManyMatch = async (data) => {
  try {
    await validate({ schema: matchFindManySchema, data: data, field: 'matches' });
    return handleResponse(
      await dbModel.removeMany({
        model: match,
        where: { [data.matches.where]: { in: data.matches.values } },
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const createManyMatch = async (data) => {
  try {
    await validate({ schema: matchCreateManySchema, data: data, field: 'matches' });
    return handleResponse(
      await dbModel.createMany({
        model: match,
        data: data.matches,
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
}).required();

const matchSortSchema = Joi.object({
  field: Joi.string().allow('homeTeamId', 'stageId', 'id', 'awayTeamId', 'dateTime').required(),
  order: Joi.string().allow('asc', 'desc').required(),
}).required();

const matchFindSchema = Joi.object({
  where: Joi.string().allow('id', 'stageId', 'homeTeamId', 'awayTeamId', 'dateTime').required(),
  value: Joi.string().min(2).required(),
}).required();

const matchFindManySchema = Joi.object({
  where: Joi.string().allow('id').required(),
  values: Joi.array().items(Joi.string().min(2)).min(1).required(),
}).required();

const matchSelectSchema = Joi.object({
  id: Joi.boolean(),
  homeTeamId: Joi.boolean(),
  awayTeamId: Joi.boolean(),
  dateTime: Joi.boolean(),
  stageId: Joi.boolean(),
  predictions: Joi.boolean(),
  stage: Joi.boolean(),
  homeTeam: Joi.boolean(),
  awayTeam: Joi.boolean(),
}).required();

const matchCreateSchema = Joi.object({
  id: Joi.string().min(2).required(),
  dateTime: Joi.date().iso().required(),
  homeTeamId: Joi.string().min(2).required(),
  awayTeamId: Joi.string().min(2).required(),
  stageId: Joi.string().min(2).required(),
}).required();
const matchCreateManySchema = Joi.array().items(matchCreateSchema).min(1).required();

const matchUpdateSchema = Joi.object({
  id: Joi.string().min(2),
  dateTime: Joi.date().iso(),
  homeTeamId: Joi.string().min(2),
  awayTeamId: Joi.string().min(2),
  stageId: Joi.string().min(2),
}).required();

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
