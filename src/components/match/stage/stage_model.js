const { dbClient: db, dbError } = require('../../../utils/database');
const changeActivity = async (stageId, active) => {
  try {
    const response = await db.stage.update({
      where: { id: stageId },
      data: { active: active },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const updateStageVersion = async (stageId) => {
  try {
    const response = await db.stage.update({
      where: { id: stageId },
      data: {
        updatedAt: new Date(),
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
const createStage = async (stage) => {
  try {
    const response = await db.stage.create({
      data: stage,
      include: { matches: true },
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
      include: { matches: true },
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
      include: { matches: true },
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
      include: { matches: true },
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
      include: { matches: true },
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
      include: { matches: true },
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
      include: { matches: true },
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
      data: { matches: { connect: matches.map((c) => ({ id: c })) } },
      include: { matches: true },
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
      data: { matches: { disconnect: matches.map((c) => ({ id: c })) } },
      include: { matches: true },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getAllStageVersions = async () => {
  try {
    const response = await db.stage.findMany({
      where: { active: true },
      orderBy: { id: 'asc' },
      select: {
        id: true,
        updatedAt: true,
      },
    });
    let data = {};
    response.map((element) => {
      data[element.id] = element.updatedAt;
    });
    return { success: true, data: data };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

module.exports = {
  getAllStageVersions,
  updateStageVersion,
  changeActivity,
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
