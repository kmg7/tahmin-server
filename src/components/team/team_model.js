const { dbClient: db, dbError } = require('../../utils/database');

const createTeam = async (team) => {
  try {
    const response = await db.team.create({
      data: team,
      include: { homeMatches: true, awayMatches: true },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const getTeam = async (teamId) => {
  try {
    const response = await db.team.findUnique({
      where: { id: teamId },
      include: { homeMatches: true, awayMatches: true },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const updateTeam = async (teamId, team) => {
  try {
    const response = await db.team.update({
      where: { id: teamId },
      data: team,
      include: { homeMatches: true, awayMatches: true },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const deleteTeam = async (teamId) => {
  try {
    const response = await db.team.delete({
      where: { id: teamId },
      include: { homeMatches: true, awayMatches: true },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const searchTeam = async (teamId) => {
  try {
    const response = await db.team.findMany({
      where: { id: { startsWith: teamId } },
      orderBy: { id: 'asc' },
      include: { homeMatches: true, awayMatches: true },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getAllTeams = async () => {
  try {
    const response = await db.team.findMany({
      orderBy: { id: 'asc' },
      include: { homeMatches: true, awayMatches: true },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const deleteManyTeam = async (teamIds) => {
  try {
    const response = await db.team.deleteMany({
      where: { id: { in: teamIds } },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const createManyTeam = async (teams) => {
  try {
    const response = await db.team.createMany({
      data: teams,
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

module.exports = {
  createTeam,
  createManyTeam,
  getTeam,
  getAllTeams,
  searchTeam,
  updateTeam,
  deleteTeam,
  deleteManyTeam,
};
