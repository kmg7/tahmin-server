const { dbModel, Models } = require('../../utils/database');
const modelError = require('../../errors/model_error');
const matchScore = Models.MATCH_SCORE;
const Joi = require('joi');
// const { updateStageVersion } = require('../match/stage/stage_model');
const searchMatchScore = async (data) => {
  try {
    await validate({ schema: matchScoreFindSchema, data: data, field: 'matchScore' });
    await validate({ schema: matchScoreSortSchema, data: data, field: 'sort' });
    await validate({ schema: matchScoreSelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: matchScore,
        where: { [data.matchScore.where]: { startsWith: data.matchScore.value } },
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

const getAllMatchScores = async (data) => {
  try {
    await validate({ schema: matchScoreSortSchema, data: data, field: 'sort' });
    await validate({ schema: matchScoreSelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: matchScore,
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

const createMatchScore = async (data) => {
  try {
    await validate({ schema: matchScoreCreateSchema, data: data, field: 'matchScore' });
    await validate({ schema: matchScoreSelectSchema, data: data, field: 'select' });
    const response = await dbModel.create({
      model: matchScore,
      select: data.select,
      data: data.matchScore,
    });
    // if (response.success && response.data.stageId) {
    //   await updateStageVersion(response.data.stageId);
    // }
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const getMatchScore = async (data) => {
  try {
    await validate({ schema: matchScoreFindSchema, data: data, field: 'matchScore' });
    await validate({ schema: matchScoreSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.get({
        model: matchScore,
        where: { [data.matchScore.where]: data.matchScore.value },
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const updateMatchScore = async (data) => {
  try {
    await validate({ schema: matchScoreFindSchema, data: data, field: 'matchScore' });
    await validate({ schema: matchScoreSelectSchema, data: data, field: 'select' });
    await validate({ schema: matchScoreUpdateSchema, data: data, field: 'update' });
    return handleResponse(
      await dbModel.update({
        model: matchScore,
        where: { [data.matchScore.where]: data.matchScore.value },
        data: data.update,
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const deleteMatchScore = async (data) => {
  try {
    await validate({ schema: matchScoreFindSchema, data: data, field: 'matchScore' });
    await validate({ schema: matchScoreSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.remove({
        model: matchScore,
        where: { [data.matchScore.where]: data.matchScore.value },
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const deleteManyMatchScore = async (data) => {
  try {
    await validate({ schema: matchScoreFindManySchema, data: data, field: 'matchScores' });
    return handleResponse(
      await dbModel.removeMany({
        model: matchScore,
        where: { [data.matchScores.where]: { in: data.matchScores.values } },
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const createManyMatchScore = async (data) => {
  try {
    await validate({ schema: matchScoreCreateManySchema, data: data, field: 'matchScores' });
    return handleResponse(
      await dbModel.createMany({
        model: matchScore,
        data: data.matchScores,
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

const matchScoreSortSchema = Joi.object({
  field: Joi.string().allow('stageId', 'id').required(),
  order: Joi.string().allow('asc', 'desc').required(),
}).required();

const matchScoreFindSchema = Joi.object({
  where: Joi.string().allow('id', 'stageId').required(),
  value: Joi.string().min(2).required(),
}).required();

const matchScoreFindManySchema = Joi.object({
  where: Joi.string().allow('id').required(),
  values: Joi.array().items(Joi.string().min(2)).min(1).required(),
}).required();

const matchScoreSelectSchema = Joi.object({
  id: Joi.boolean(),
  homeScore: Joi.boolean(),
  awayScore: Joi.boolean(),
  stageId: Joi.boolean(),
  stage: Joi.boolean(),
}).required();
const matchScoreCreateSchema = Joi.object({
  id: Joi.string().min(2).required(),
  stageId: Joi.string().min(2).required(),
  homeScore: Joi.number().integer().min(0).required(),
  awayScore: Joi.number().integer().min(0).required(),
});
const matchScoreCreateManySchema = Joi.array().items(matchScoreCreateSchema).min(2).required();
const matchScoreUpdateSchema = Joi.object({
  id: Joi.string().min(2),
  stageId: Joi.string().min(2),
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
