const { dbClient: db, dbError } = require('../../utils/database');
const createMatchScore = async (matchScore) => {
  try {
    const response = await db.matchScore.create({ data: matchScore });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getMatchScore = async (matchScoreId) => {
  try {
    const response = await db.matchScore.findUnique({
      where: { id: matchScoreId },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getAllMatchScores = async () => {
  try {
    const response = await db.matchScore.findMany({
      orderBy: { id: 'asc' },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const updateMatchScore = async (matchScoreId, matchScore) => {
  try {
    const response = await db.matchScore.update({
      where: { id: matchScoreId },
      data: matchScore,
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const deleteMatchScore = async (matchScoreId) => {
  try {
    const response = await db.matchScore.delete({
      where: { id: matchScoreId },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const searchMatchScore = async (matchScoreId) => {
  try {
    const response = await db.matchScore.findMany({
      where: { id: { startsWith: matchScoreId } },
      orderBy: { id: 'asc' },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const deleteManyMatchScore = async (matchScoreIds) => {
  try {
    const response = await db.matchScore.deleteMany({
      where: { id: { in: matchScoreIds } },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const createManyMatchScore = async (matchScores) => {
  try {
    const response = await db.matchScore.createMany({ data: matchScores });
    return { success: true, data: response };
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
  getAllMatchScores,
  updateMatchScore,
  deleteMatchScore,
  searchMatchScore,
  deleteManyMatchScore,
  createManyMatchScore,
};
