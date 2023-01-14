import { dbModel, Models } from '../utils/database';
const standings = Models.STANDINGS;
import modelError from '../errors/model_error';
import Joi from 'joi';

const searchStandings = async (data) => {
  try {
    await validate({ schema: standingsFindSchema, data: data, field: 'standings' });
    await validate({ schema: standingsortSchema, data: data, field: 'sort' });
    await validate({ schema: standingSelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: standings,
        where: { [data.standings.where]: { startsWith: data.standings.value } },
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

const getAllStandings = async (data) => {
  try {
    await validate({ schema: standingsortSchema, data: data, field: 'sort' });
    await validate({ schema: standingSelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: standings,
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

const createStandings = async (data) => {
  try {
    await validate({ schema: standingsCreateSchema, data: data, field: 'standings' });
    await validate({ schema: standingSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.create({
        model: standings,
        select: data.select,
        data: data.standings,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const getStandings = async (data) => {
  try {
    await validate({ schema: standingsFindSchema, data: data, field: 'standings' });
    await validate({ schema: standingSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.get({
        model: standings,
        where: { [data.standings.where]: data.standings.value },
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const updateStandings = async (data) => {
  try {
    await validate({ schema: standingsFindSchema, data: data, field: 'standings' });
    await validate({ schema: standingSelectSchema, data: data, field: 'select' });
    await validate({ schema: standingsUpdateSchema, data: data, field: 'update' });
    return handleResponse(
      await dbModel.update({
        model: standings,
        where: { [data.standings.where]: data.standings.value },
        data: data.update,
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const deleteStandings = async (data) => {
  try {
    await validate({ schema: standingsFindSchema, data: data, field: 'standings' });
    await validate({ schema: standingSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.remove({
        model: standings,
        where: { [data.standings.where]: data.standings.value },
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const deleteManyStandings = async (data) => {
  try {
    await validate({ schema: standingsFindManySchema, data: data, field: 'standings' });
    return handleResponse(
      await dbModel.removeMany({
        model: standings,
        where: { [data.standings.where]: { in: data.standings.values } },
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const createManyStandings = async (data) => {
  try {
    await validate({ schema: standingsCreateManySchema, data: data, field: 'standings' });
    return handleResponse(
      await dbModel.createMany({
        model: standings,
        data: data.standings,
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

const standingsortSchema = Joi.object({
  field: Joi.string().allow('id', 'tournamentId').required(),
  order: Joi.string().allow('asc', 'desc').required(),
}).required();

const standingsFindSchema = Joi.object({
  where: Joi.string().allow('id', 'tournamentId').required(),
  value: Joi.string().min(2).required(),
}).required();

const standingsFindManySchema = Joi.object({
  where: Joi.string().allow('id', 'tournamentId').required(),
  values: Joi.array().items(Joi.string().min(2)).min(1).required(),
});

const standingSelectSchema = Joi.object({
  id: Joi.boolean(),
  tournamentId: Joi.boolean(),
  tournament: Joi.boolean(),
  scores: Joi.boolean(),
}).required();

const standingsCreateSchema = Joi.object({
  id: Joi.string().required(),
  tournamentId: Joi.string().required(),
});

const standingsUpdateSchema = Joi.object({
  id: Joi.string(),
  tournamentId: Joi.string(),
});

const standingsCreateManySchema = Joi.array().items(standingsCreateSchema).min(1);

export default {
  searchStandings,
  getStandings,
  getAllStandings,
  createStandings,
  createManyStandings,
  updateStandings,
  deleteStandings,
  deleteManyStandings,
};
