//turnuvalar/turnuva/stage
const model = require('./status_model');
const { getAllTournamentsVersions } = require('../match/tournament/tournament_model');
const { getAllStageVersions } = require('../match/stage/stage_model');

const updateStatusVersion = async (data) => {
  try {
    const now = new Date().toISOString();
    const response = await getAllTournamentsVersions();
    if (response.success) {
      if (!response.success) {
        return response;
      }
      let data = { updatedAt: now };
      data.tournaments = response.data;
      return await model.updateTournament(data);
    }
    return response;
  } catch (error) {
    return handleError(error);
  }
};
const updateTournamentVersion = async () => {
  try {
    const now = new Date().toISOString();
    const response = await getAllTournamentsVersions();
    if (response.success) {
      if (!response.success) {
        return response;
      }
      let data = { updatedAt: now };
      data.tournaments = response.data;
      return await model.updateTournament(data);
    }
    return response;
  } catch (error) {
    return handleError(error);
  }
};

const updateStageVersion = async () => {
  try {
    const now = new Date().toISOString();
    const response = await getAllStageVersions();
    if (response.success) {
      if (!response.success) {
        return response;
      }
      let data = { updatedAt: now };
      data.stages = response.data;
      return await model.updateStage(data);
    }
    return response;
  } catch (error) {
    return handleError(error);
  }
};

const handleError = (error) => {
  return {
    success: false,
    error: error,
  };
};
module.exports = {
  updateTournamentVersion,
  updateStageVersion,
};
