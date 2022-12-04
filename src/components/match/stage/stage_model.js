const { dbClient: db, dbError } = require('../../../utils/database');
//TODO  prisma dataları burada ayarlanmalı tüm modeller için devam hata kodlarını ayarla
const createStage = async (stage) => {
  try {
    console.log(stage);
    const response = await db.stage.create({
      data: stage,
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
      data: stage,
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

const searchStage = async (stageId) => {
  try {
    const response = await db.stage.findMany({
      where: { id: { startsWith: stageId } },
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
const createManyStage = async (stages) => {
  try {
    const response = await db.stage.createMany({
      data: stages,
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getAllStages = async () => {
  try {
    const response = await db.stage.findMany({
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

const deleteManyStage = async (stageIds) => {
  try {
    const response = await db.stage.deleteMany({
      where: { id: { in: stageIds } },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const connectMatches = async (stageId, matches) => {
  try {
    const response = await db.stage.update({
      where: { id: stageId },
      data: { matches: { connect: matches } },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const disconnectMatches = async (stageId, matches) => {
  try {
    const response = await db.stage.update({
      where: { id: stageId },
      data: { matches: { disconnect: matches } },
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
  createManyStage,
  getStage,
  getAllStages,
  searchStage,
  deleteManyStage,
  deleteStage,
  updateStage,
  connectMatches,
  disconnectMatches,
};
