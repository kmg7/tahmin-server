const model = require('./tournament_model');
const modelError = require('../../../errors/model_error');
const Joi = require('joi');

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
    await validate(data.tournament);
    const response = await model.createTournament(data.tournament);
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
const getTournament = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.getTournament(data.id);
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

const updateTournament = async (data) => {
  try {
    await validateId(data.id);
    await validate(data.tournament, false);
    const response = await model.updateTournament(data.id, data.tournament);
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
const deleteTournament = async (data) => {
  try {
    await validateId(data.id);
    const response = await model.deleteTournament(data.id);
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
const deleteManyTournament = async (data) => {
  try {
    await validateIds(data.ids);
    const response = await model.deleteManyTournament(data.ids);
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
    await validateMany(data.tournaments);
    const response = await model.createManyTournament(data.tournaments);
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
const connectStages = async (data) => {
  try {
    await validateId(data.id);
    await validateIds(data.stages);
    const response = await model.connectStages(data.id, data.stages);
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
const disconnectStages = async (data) => {
  try {
    await validateId(data.id);
    await validateIds(data.stages);
    const response = await model.disconnectStages(data.id, data.stages);
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

const validate = async (tournament, iscreate = true) => {
  if (iscreate) {
    await tournamentCreateSchema.validateAsync(tournament);
  } else {
    await tournamentUpdateSchema.validateAsync(tournament);
  }
};
const validateMany = async (tournaments) => {
  await tournamentCreateManySchema.validateAsync(tournaments);
};
const validateId = async (id) => {
  await idSchema.validateAsync(id);
};
const validateIds = async (ids) => {
  await idArraySchema.validateAsync(ids);
};
const idSchema = Joi.string().min(2).max(32).required();
const idArraySchema = Joi.array().items(idSchema).min(2).required();

const tournamentCreateSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(2).max(32).required(),
  shName: Joi.string().required(),
  logoUrl: Joi.string().required(),
});

const tournamentUpdateSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().min(2).max(32),
  shName: Joi.string(),
  logoUrl: Joi.string(),
});
const tournamentCreateManySchema = Joi.array().items(tournamentCreateSchema).min(2);

module.exports = {
  searchTournaments,
  createTournament,
  createManyTournament,
  getTournament,
  getAllTournaments,
  deleteTournament,
  deleteManyTournament,
  updateTournament,
  connectStages,
  disconnectStages,
};
