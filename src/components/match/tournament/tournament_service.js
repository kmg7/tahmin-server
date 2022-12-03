const model = require('./tournament_model');
const modelError = require('../../../errors/model_error');
const Joi = require('joi');
//TODO error responding with proj error codes implement

const searchTournaments = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.searchTournaments(data.id);
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
const getAllTournaments = async () => {
  try {
    const response = await model.getAllTournaments();
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
const createTournament = async (data) => {
  try {
    await validateTournament(data);
    const response = await model.createTournament(data);
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
const getTournament = async (id) => {
  try {
    await validateId(id);
    const response = await model.getTournament(id);
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

const updateTournament = async (id, data) => {
  try {
    await validateId(data.id);
    await validateTournament(data, false);
    const response = await model.updateTournament(id, data);
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
const deleteTournament = async (id) => {
  try {
    await validateId(id);
    const response = await model.deleteTournament(id);
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
const deleteManyTournament = async (idList) => {
  try {
    await validateIds(idList);
    const response = await model.deleteManyTournament(idList);
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
const createManyTournament = async (data) => {
  try {
    await validateTournaments(data);
    const response = await model.createManyTournament(data);
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

const validateTournament = async (tournament, create = true) => {
  tournament.create = create;
  await tournamentSchema.validateAsync(tournament);
};
const validateTournaments = async (tournaments) => {
  await tournamentArraySchema.validateAsync(tournaments);
};
const validateId = async (id) => {
  await idSchema.validateAsync(id);
};
const validateIds = async (ids) => {
  await idArraySchema.validateAsync(ids);
};
const idSchema = Joi.string().min(2).max(32);
const idArraySchema = Joi.array().items(idSchema).min(2);

const tournamentSchema = Joi.object({
  create: Joi.boolean().default(true),
  id: Joi.string().when('create', { is: true, then: Joi.required() }),
  name: Joi.string().min(2).max(32).when('create', { is: true, then: Joi.required() }),
  shName: Joi.string().when('create', { is: true, then: Joi.required() }),
  logoUrl: Joi.string().when('create', { is: true, then: Joi.required() }),
});
const tournamentArraySchema = Joi.array().items(tournamentSchema).min(2);

module.exports = {
  searchTournaments,
  createTournament,
  createManyTournament,
  getTournament,
  getAllTournaments,
  deleteTournament,
  deleteManyTournament,
  updateTournament,
};
