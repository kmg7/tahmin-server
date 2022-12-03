const { dbClient: db, dbError } = require('../../utils/database');
const createMatchScore = async (matchScore) => {
  try {
    const matchResponse = await db.matchScore.create({ data: matchScore });
    return { success: true, data: matchResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getMatchScore = async (matchId) => {
  try {
    const matchResponse = await db.matchScore.findUnique({
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
const updateMatchScore = async (matchId, matchScore) => {
  try {
    const matchResponse = await db.matchScore.update({
      where: { id: matchId },
      data: matchScore,
    });

    return { success: true, data: matchResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const deleteMatchScore = async (matchId) => {
  try {
    const matchResponse = await db.matchScore.delete({
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
const getMatchScores = async (matchId) => {
  try {
    const matchResponse = await db.matchScore.findMany({
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
const deleteMatchScores = async (matchId) => {
  try {
    const matchResponse = await db.matchScore.deleteMany({
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
  createMatchScore,
  getMatchScore,
  updateMatchScore,
  deleteMatchScore,
  getMatchScores,
  deleteMatchScores,
};
