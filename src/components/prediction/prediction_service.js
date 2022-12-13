const { dbModel, Models } = require('../../utils/database');
const modelError = require('../../errors/model_error');
const prediction = Models.PREDICTION;
const Joi = require('joi');

const searchPrediction = async (data) => {
  try {
    await validate({ schema: predictionSearchSchema, data: data, field: 'prediction' });
    await validate({ schema: predictionSortSchema, data: data, field: 'sort' });
    await validate({ schema: predictionSelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: prediction,
        where: {
          AND: [{ matchId: { startsWith: data.prediction.value.matchId } }, { userId: data.prediction.value.userId }],
        },
        select: data.select,
        orderBy: { [data.sort.field]: data.sort.order },
        skip: data.pagination.skip,
        take: data.pagination.take,
      })
    );
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};
const getAllPredictions = async (data) => {
  try {
    await validate({ schema: predictionSortSchema, data: data, field: 'sort' });
    await validate({ schema: predictionSelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: prediction,
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
const createPrediction = async (data) => {
  try {
    await validate({ schema: predictionCreateSchema, data: data, field: 'prediction' });
    await validate({ schema: predictionSelectSchema, data: data, field: 'select' });
    const response = await dbModel.create({
      model: prediction,
      select: data.select,
      data: data.prediction,
    });
    // if (response.success && response.data.stageId) {
    //   await updateStageVersion(response.data.stageId);
    // }
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const getPrediction = async (data) => {
  try {
    await validate({ schema: predictionFindSchema, data: data, field: 'prediction' });
    await validate({ schema: predictionSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.get({
        model: prediction,
        where: { [data.prediction.where]: data.prediction.value },
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};
const updatePrediction = async (data) => {
  try {
    await validate({ schema: predictionFindSchema, data: data, field: 'prediction' });
    await validate({ schema: predictionSelectSchema, data: data, field: 'select' });
    await validate({ schema: predictionUpdateSchema, data: data, field: 'update' });
    return handleResponse(
      await dbModel.update({
        model: prediction,
        where: { [data.prediction.where]: data.prediction.value },
        data: data.update,
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};
const upsertManyPrediction = async (data) => {
  try {
    await validate({ schema: predictionUpdateManySchema, data: data, field: 'updateOrCreateMany' });
    const mappedData = data.updateOrCreateMany.predictions.map(({ matchId, homeScore, awayScore }) => ({
      where: {
        matchId_userId: {
          userId: data.updateOrCreateMany.userId,
          matchId: matchId,
        },
      },
      update: {
        homeScore: homeScore,
        awayScore: awayScore,
      },
      create: {
        matchId: matchId,
        userId: data.updateOrCreateMany.userId,
        homeScore: homeScore,
        awayScore: awayScore,
      },
    }));
    return handleResponse(
      await dbModel.upsertMany({
        model: prediction,
        data: mappedData,
      })
    );
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};
const deletePrediction = async (data) => {
  try {
    await validate({ schema: predictionFindSchema, data: data, field: 'prediction' });
    await validate({ schema: predictionSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.remove({
        model: prediction,
        where: { [data.prediction.where]: data.prediction.value },
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};
const deleteManyPrediction = async (data) => {
  try {
    await validate({ schema: predictionFindManySchema, data: data, field: 'predictions' });
    return handleResponse(
      await dbModel.removeMany({
        model: prediction,
        where: { [data.predictions.where]: { in: data.predictions.values } },
      })
    );
  } catch (error) {
    return handleError(error);
  }
};
const createManyPrediction = async (data) => {
  try {
    await validate({ schema: predictionCreateManySchema, data: data, field: 'predictions' });
    return handleResponse(
      await dbModel.createMany({
        model: prediction,
        data: data.predictions,
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

const predictionSortSchema = Joi.object({
  field: Joi.string().allow('matchId', 'id', 'userId', 'processed', 'createdAt', 'updatedAt').required(),
  order: Joi.string().allow('asc', 'desc').required(),
}).required();

const predictionSearchSchema = Joi.object({
  where: Joi.string().allow('matchId_userId').required(),
  value: Joi.when('where', {
    is: 'matchId_userId',
    then: Joi.object({
      userId: Joi.string().min(2).required(),
      matchId: Joi.string().min(2).required(),
    }),
    otherwise: Joi.string().min(2).required(),
  }),
}).required();

const predictionFindManySchema = Joi.object({
  where: Joi.string().allow('id').required(),
  values: Joi.array().items(Joi.string().min(2)).min(1).required(),
}).required();

const predictionSelectSchema = Joi.object({
  id: Joi.boolean(),
  matchId: Joi.boolean(),
  userId: Joi.boolean(),
  processed: Joi.boolean(),
  createdAt: Joi.boolean(),
  updatedAt: Joi.boolean(),
  homeScore: Joi.boolean(),
  awayScore: Joi.boolean(),
  match: Joi.boolean(),
  user: Joi.boolean(),
}).required();

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

const predictionFindSchema = Joi.object({
  where: Joi.string().allow('id', 'matchId_userId').required(),
  value: Joi.when('where', {
    is: 'matchId_userId',
    then: Joi.object({
      userId: Joi.string().min(2).required(),
      matchId: Joi.string().min(2).required(),
    }),
    otherwise: Joi.string().min(2).required(),
  }),
})
  .min(1)
  .required();

const predictionUpdateManySchema = Joi.object({
  userId: Joi.string().required(),
  predictions: Joi.array()
    .items(
      Joi.object({
        matchId: Joi.string().required(),
        homeScore: Joi.number().integer().min(0).max(99).required(),
        awayScore: Joi.number().integer().min(0).max(99).required(),
      })
    )
    .min(1)
    .required(),
});

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
