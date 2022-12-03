const { dbClient: db, dbError } = require('../../../utils/database');
const createMatch = async (match) => {
  try {
    const matchResponse = await db.match.create({ data: match });
    return { success: true, data: matchResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getMatch = async (matchId) => {
  try {
    const matchResponse = await db.match.findUnique({
      where: { id: matchId },
    });
    return { success: true, data: matchResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const updateMatch = async (matchId, match) => {
  try {
    const matchResponse = await db.match.update({
      where: { id: matchId },
      data: match,
    });

    return { success: true, data: matchResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const deleteMatch = async (matchId) => {
  try {
    const matchResponse = await db.match.delete({
      where: { id: matchId },
    });
    return { success: true, data: matchResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getMatches = async (matchId) => {
  try {
    const matchResponse = await db.match.findMany({
      where: { id: { startsWith: matchId } },
      orderBy: { dateTime: 'asc' },
    });
    return { success: true, data: matchResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const deleteMatches = async (matchId) => {
  try {
    const matchResponse = await db.match.deleteMany({
      where: { id: { startsWith: id } },
    });
    return { success: true, data: matchResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
module.exports = {
  createMatch,
  getMatch,
  updateMatch,
  deleteMatch,
  getMatches,
  deleteMatches,
};
