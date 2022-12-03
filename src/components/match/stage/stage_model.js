const { dbClient: db, dbError } = require('../../../utils/database');
//TODO  prisma dataları burada ayarlanmalı tüm modeller için devam hata kodlarını ayarla
const createStage = async (stage) => {
  try {
    const response = await db.stage.create({
      data: {
        id: stage.id,
        name: stage.name,
        tournament: {
          connect: stage.tournamentId,
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

const getStage = async (stageId) => {
  try {
    const response = await db.stage.findUnique({
      where: { id: stageId },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const updateStage = async (stageId, stage) => {
  try {
    const response = await db.stage.update({
      where: { id: stageId },
      data: {
        id: stage.id,
        name: stage.name,
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

const deleteStage = async (stageId) => {
  try {
    const response = await db.stage.delete({
      where: { id: stageId },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const getAllStages = async (stageIds) => {
  try {
    const response = await db.stage.findMany({
      where: { id: { id: stageIds } },
      orderBy: { dateTime: 'asc' },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const deleteAllStages = async (stageIds) => {
  try {
    const response = await db.stage.deleteMany({
      where: { id: stageIds },
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
  createStage,
  getStage,
  getAllStages,
  deleteAllStages,
  deleteStage,
  updateStage,
};
