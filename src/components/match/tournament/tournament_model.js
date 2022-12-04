const { dbClient: db, dbError } = require('../../../utils/database');

const createTournament = async (tournament) => {
  try {
    const response = await db.tournament.create({
      data: tournament,
      include: { stages: true },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const getTournament = async (tournamentId) => {
  try {
    const response = await db.tournament.findUnique({
      where: { id: tournamentId },
      include: { stages: true },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const updateTournament = async (tournamentId, tournament) => {
  try {
    const response = await db.tournament.update({
      where: { id: tournamentId },
      include: { stages: true },
      data: tournament,
    });

    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const deleteTournament = async (tournamentId) => {
  try {
    const response = await db.tournament.delete({
      where: { id: tournamentId },
      include: { stages: true },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const searchTournaments = async (tournamentId) => {
  try {
    const response = await db.tournament.findMany({
      where: { id: { startsWith: tournamentId } },
      orderBy: { id: 'asc' },
      include: { stages: true },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getAllTournaments = async () => {
  try {
    const response = await db.tournament.findMany({
      orderBy: { id: 'asc' },
      include: { stages: true },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const ifExists = async (tournamentId) => {
  try {
    const response = await getTournament(tournamentId);
    if (response.success) {
      if (response.data.id) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteManyTournament = async (tournamentIds) => {
  try {
    const response = await db.tournament.deleteMany({
      where: { id: { in: tournamentIds } },
      include: { stages: true },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const createManyTournament = async (tournaments) => {
  try {
    const response = await db.tournament.createMany({
      data: tournaments,
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const connectStages = async (tournamentId, stages) => {
  try {
    const response = await db.tournament.update({
      where: { id: tournamentId },
      include: { stages: true },
      data: {
        stages: {
          connect: stages.map((c) => ({ id: c })),
        },
      },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const disconnectStages = async (tournamentId, stages) => {
  try {
    const response = await db.tournament.update({
      where: { id: tournamentId },
      include: { stages: true },
      data: {
        stages: {
          disconnect: stages.map((c) => ({ id: c })),
        },
      },
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
  createTournament,
  createManyTournament,
  getTournament,
  getAllTournaments,
  searchTournaments,
  deleteTournament,
  deleteManyTournament,
  updateTournament,
  ifExists,
  connectStages,
  disconnectStages,
};
