const { dbModel, Models } = require('../../../utils/database');
const modelError = require('../../../errors/model_error');
const tournament = Models.TOURNAMENT;
const Joi = require('joi');

const searchTournament = async (data) => {
  try {
    await validate({ schema: tournamentSearchSchema, data: data, field: 'tournament' });
    await validate({ schema: tournamentSortSchema, data: data, field: 'sort' });
    await validate({ schema: tournamentSelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: tournament,
        where: {
          AND: data.tournament.map(({ where, value }) => {
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

const getAllTournaments = async (data) => {
  try {
    await validate({ schema: tournamentSortSchema, data: data, field: 'sort' });
    await validate({ schema: tournamentSelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: tournament,
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
const createTournament = async (data) => {
  try {
    await validate({ schema: tournamentCreateSchema, data: data, field: 'tournament' });
    await validate({ schema: tournamentSelectSchema, data: data, field: 'select' });
    const response = await dbModel.create({
      model: tournament,
      select: data.select,
      data: data.tournament,
    });
    if (response.success && response.data.tournamentId) {
      await updatetournamentVersion(response.data.tournamentId);
    }
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const getTournament = async (data) => {
  try {
    await validate({ schema: tournamentFindSchema, data: data, field: 'tournament' });
    await validate({ schema: tournamentSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.get({
        model: tournament,
        where: { [data.tournament.where]: data.tournament.value },
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const updateTournament = async (data) => {
  try {
    await validate({ schema: tournamentFindSchema, data: data, field: 'tournament' });
    await validate({ schema: tournamentSelectSchema, data: data, field: 'select' });
    await validate({ schema: tournamentUpdateSchema, data: data, field: 'update' });
    return handleResponse(
      await dbModel.update({
        model: tournament,
        where: { [data.tournament.where]: data.tournament.value },
        data: data.update,
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const deleteTournament = async (data) => {
  try {
    await validate({ schema: tournamentFindSchema, data: data, field: 'tournament' });
    await validate({ schema: tournamentSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.remove({
        model: tournament,
        where: { [data.tournament.where]: data.tournament.value },
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const deleteManyTournament = async (data) => {
  try {
    await validate({ schema: tournamentFindManySchema, data: data, field: 'tournaments' });
    return handleResponse(
      await dbModel.removeMany({
        model: tournament,
        where: { [data.tournaments.where]: { in: data.tournaments.values } },
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const createManyTournament = async (data) => {
  try {
    await validate({ schema: tournamentCreateManySchema, data: data, field: 'tournaments' });
    return handleResponse(
      await dbModel.createMany({
        model: tournament,
        data: data.tournaments,
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

const tournamentSortSchema = Joi.object({
  field: Joi.string().allow('countryCode', 'id', 'active', 'name', 'code').required(),
  order: Joi.string().allow('asc', 'desc').required(),
}).required();

const tournamentSearchSchema = Joi.array()
  .items(
    Joi.object({
      where: Joi.string().allow('countryCode', 'id', 'active', 'name', 'code').required(),
      value: Joi.when('where', { is: 'active', then: Joi.boolean(), otherwise: Joi.string().min(2) }).required(),
    })
  )
  .min(1);

const tournamentFindSchema = Joi.object({
  where: Joi.string().allow('id').required(),
  value: Joi.string().min(2).required(),
});
const tournamentFindManySchema = Joi.object({
  where: Joi.string().allow('id').required(),
  values: Joi.array().items(Joi.string().min(2)).min(1).required(),
});

const tournamentSelectSchema = Joi.object({
  id: Joi.boolean(),
  name: Joi.boolean(),
  countryCode: Joi.boolean(),
  active: Joi.boolean(),
  code: Joi.boolean(),
  logoUrl: Joi.boolean(),
  createdAt: Joi.boolean(),
  updatedAt: Joi.boolean(),
  stages: Joi.boolean(),
  standings: Joi.boolean(),
  country: Joi.boolean(),
}).required();

const tournamentCreateSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(2).max(32).required(),
  countryCode: Joi.string().required(),
  active: Joi.boolean().required(),
  code: Joi.string().required(),
  logoUrl: Joi.string().required(),
}).required();

const tournamentUpdateSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().min(2).max(32),
  countryCode: Joi.string(),
  active: Joi.boolean(),
  code: Joi.string(),
  logoUrl: Joi.string(),
  updatedAt: Joi.date().iso(),
}).required();

const tournamentCreateManySchema = Joi.array().items(tournamentCreateSchema).min(2).required();

module.exports = {
  searchTournament,
  createTournament,
  createManyTournament,
  getTournament,
  getAllTournaments,
  deleteTournament,
  deleteManyTournament,
  updateTournament,
};
