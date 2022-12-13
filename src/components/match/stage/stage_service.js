const { dbModel, Models } = require('../../../utils/database');
const modelError = require('../../../errors/model_error');
const stage = Models.STAGE;
const Joi = require('joi');

const searchStage = async (data) => {
  try {
    await validate({ schema: stageSearchSchema, data: data, field: 'stage' });
    await validate({ schema: stageSortSchema, data: data, field: 'sort' });
    await validate({ schema: stageSelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: stage,
        where: {
          AND: data.stage.map(({ where, value }) => {
            if (typeof value === 'boolean') {
              return { [where]: value };
            } else {
              return { [where]: { startsWith: value } };
            }
          }),
        },
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

const getAllStages = async (data) => {
  try {
    await validate({ schema: stageSortSchema, data: data, field: 'sort' });
    await validate({ schema: stageSelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: stage,
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

const createStage = async (data) => {
  try {
    await validate({ schema: stageCreateSchema, data: data, field: 'stage' });
    await validate({ schema: stageSelectSchema, data: data, field: 'select' });
    const response = await dbModel.create({
      model: stage,
      select: data.select,
      data: data.stage,
    });
    if (response.success && response.data.stageId) {
      await updateStageVersion(response.data.stageId);
    }
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const getStage = async (data) => {
  try {
    await validate({ schema: stageFindSchema, data: data, field: 'stage' });
    await validate({ schema: stageSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.get({
        model: stage,
        where: { [data.stage.where]: data.stage.value },
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const updateStage = async (data) => {
  try {
    await validate({ schema: stageFindSchema, data: data, field: 'stage' });
    await validate({ schema: stageSelectSchema, data: data, field: 'select' });
    await validate({ schema: stageUpdateSchema, data: data, field: 'update' });
    return handleResponse(
      await dbModel.update({
        model: stage,
        where: { [data.stage.where]: data.stage.value },
        data: data.update,
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const deleteStage = async (data) => {
  try {
    await validate({ schema: stageFindSchema, data: data, field: 'stage' });
    await validate({ schema: stageSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.remove({
        model: stage,
        where: { [data.stage.where]: data.stage.value },
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const deleteManyStage = async (data) => {
  try {
    await validate({ schema: stageFindManySchema, data: data, field: 'stages' });
    return handleResponse(
      await dbModel.removeMany({
        model: stage,
        where: { [data.stages.where]: { in: data.stages.values } },
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const createManyStage = async (data) => {
  try {
    await validate({ schema: stageCreateManySchema, data: data, field: 'stages' });
    return handleResponse(
      await dbModel.createMany({
        model: stage,
        data: data.stages,
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

const stageSortSchema = Joi.object({
  field: Joi.string().allow('name', 'id', 'tournamentId', 'active').required(),
  order: Joi.string().allow('asc', 'desc').required(),
}).required();

const stageSearchSchema = Joi.array()
  .items(
    Joi.object({
      where: Joi.string().allow('active', 'id', 'tournamentId', 'name').required(),
      value: Joi.when('where', { is: 'active', then: Joi.boolean(), otherwise: Joi.string().min(2) }).required(),
    }).required()
  )
  .required()
  .min(1);

const stageFindSchema = Joi.object({
  where: Joi.string().allow('id').required(),
  value: Joi.string().min(2).required(),
});
const stageFindManySchema = Joi.object({
  where: Joi.string().allow('id').required(),
  values: Joi.array().items(Joi.string().min(2)).min(1).required(),
});

const stageSelectSchema = Joi.object({
  id: Joi.boolean(),
  active: Joi.boolean(),
  tournamentId: Joi.boolean(),
  name: Joi.boolean(),
  matches: Joi.boolean(),
  createdAt: Joi.boolean(),
  updatedAt: Joi.boolean(),
  matchScores: Joi.boolean(),
  tournament: Joi.boolean(),
}).required();

const stageCreateSchema = Joi.object({
  id: Joi.string().min(2).required(),
  active: Joi.boolean().required(),
  name: Joi.string().min(2).required(),
  tournamentId: Joi.string().min(2).required(),
});

const stageCreateManySchema = Joi.array().items(stageCreateSchema).min(1).required();

const stageUpdateSchema = Joi.object({
  id: Joi.string().min(2),
  name: Joi.string().min(2),
  active: Joi.boolean(),
  tournamentId: Joi.string().min(2),
  updatedAt: Joi.date().iso(),
});
module.exports = {
  searchStage,
  getStage,
  getAllStages,
  createStage,
  createManyStage,
  updateStage,
  deleteStage,
  deleteManyStage,
};
