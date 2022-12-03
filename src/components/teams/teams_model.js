const { dbClient: db, dbError } = require('../../utils/database');

const createTeam = async (team) => {
  try {
    const teamResponse = await db.team.create({ data: team });
    return { success: true, data: teamResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const getTeam = async (teamId) => {
  try {
    const teamResponse = await db.team.findUnique({
      where: { id: teamId },
    });
    return { success: true, data: teamResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const updateTeam = async (teamId, team) => {
  try {
    const teamResponse = await db.team.update({
      where: { id: teamId },
      data: team,
    });

    return { success: true, data: teamResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const deleteTeam = async (teamId) => {
  try {
    const teamResponse = await db.team.delete({
      where: { id: teamId },
    });
    return { success: true, data: teamResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const getAllTeams = async (teamIds) => {
  try {
    const teamResponse = await db.team.findMany({
      where: { id: { id: teamIds } },
      orderBy: { dateTime: 'asc' },
    });
    return { success: true, data: teamResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const deleteAllTeams = async (teamIds) => {
  try {
    const teamResponse = await db.team.deleteMany({
      where: { id: teamIds },
    });
    return { success: true, data: teamResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

module.exports = {
  createTeam,
  getTeam,
  getAllTeams,
  deleteAllTeams,
  deleteTeam,
  updateTeam,
};
