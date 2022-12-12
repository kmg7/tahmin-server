const { dbModel, Models } = require('../../utils/database');
const modelError = require('../../errors/model_error');
const team = Models.TEAM;
const Joi = require('joi');

const searchTeam = async (data) => {
  try {
    await validate({ schema: teamFindSchema, data: data, field: 'team' });
    await validate({ schema: teamSortSchema, data: data, field: 'sort' });
    await validate({ schema: teamSelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: team,
        where: { [data.team.where]: { startsWith: data.team.value } },
        select: data.select,
        orderBy: data.sort,
        skip: data.pagination.skip,
        take: data.pagination.take,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};
const getAllTeams = async () => {
  try {
    await validate({ schema: teamSortSchema, data: data, field: 'sort' });
    await validate({ schema: teamSelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: team,
        select: data.select,
        orderBy: data.sort,
        skip: data.pagination.skip,
        take: data.pagination.take,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};
const createTeam = async (data) => {
  try {
    await validate({ schema: teamCreateSchema, data: data, field: 'team' });
    await validate({ schema: teamSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.create({
        model: team,
        data: data.team,
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};
const getTeam = async (data) => {
  try {
    await validate({ schema: teamFindSchema, data: data, field: 'team' });
    await validate({ schema: teamSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.get({
        model: team,
        where: { [data.team.where]: data.team.value },
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};
const updateTeam = async (data) => {
  try {
    await validate({ schema: teamFindSchema, data: data, field: 'team' });
    await validate({ schema: teamSelectSchema, data: data, field: 'select' });
    await validate({ schema: teamUpdateSchema, data: data, field: 'update' });
    return handleResponse(
      await dbModel.update({
        model: team,
        where: { [data.team.where]: data.team.value },
        data: data.update,
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};
const deleteTeam = async (data) => {
  try {
    await validate({ schema: teamFindSchema, data: data, field: 'team' });
    await validate({ schema: teamSelectSchema, data: data, field: 'select' });
    const response = await dbModel.remove({
      model: team,
      where: { [data.team.where]: data.team.value },
      select: data.select,
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const deleteManyTeam = async (data) => {
  try {
    await validate({ schema: teamFindManySchema, data: data, field: 'teams' });
    return handleResponse(
      await dbModel.removeMany({
        model: team,
        where: { [data.teams.where]: { in: data.teams.values } },
      })
    );
  } catch (error) {
    return handleError(error);
  }
};
const createManyTeam = async (data) => {
  try {
    await validate({ schema: teamCreateManySchema, data: data, field: 'teams' });
    return handleResponse(
      await dbModel.createMany({
        model: team,
        data: data.teams,
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

const teamSortSchema = Joi.object({
  field: Joi.string().allow('id', 'name', 'country').required(),
  order: Joi.string().allow('asc', 'desc').required(),
}).required();

const teamFindSchema = Joi.object({
  where: Joi.string().allow('id', 'countryCode', 'countryCode_code').required(),
  value: Joi.string().min(2).required(),
}).required();

const teamFindManySchema = Joi.object({
  where: Joi.string().allow('id', 'countryCode', 'countryCode_code').required(),
  values: Joi.array().items(Joi.string().min(2)).min(1).required(),
}).required();

const teamSelectSchema = Joi.object({
  id: Joi.boolean(),
  code: Joi.boolean(),
  countryCode: Joi.boolean(),
  name: Joi.boolean(),
  logoUrl: Joi.boolean(),
  homeMatches: Joi.boolean(),
  awayMatches: Joi.boolean(),
}).required();

const teamCreateSchema = Joi.object({
  id: Joi.string().required(),
  code: Joi.string().required(),
  name: Joi.string().min(2).max(32).required(),
  logoUrl: Joi.string().required(),
  country: Joi.string(),
}).required();

const teamUpdateSchema = Joi.object({
  id: Joi.string(),
  code: Joi.string(),
  countryCode: Joi.string(),
  name: Joi.string().min(2).max(32),
  logoUrl: Joi.string(),
}).required();

const teamCreateManySchema = Joi.array().items(teamCreateSchema).min(2).required();

module.exports = {
  searchTeam,
  getTeam,
  getAllTeams,
  createTeam,
  createManyTeam,
  updateTeam,
  deleteTeam,
  deleteManyTeam,
};
