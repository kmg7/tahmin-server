const fsPromises = require('fs').promises;
const path = require('path');
const tournamentPath = path.join('files', 'tournamentVersions.json');
const stagePath = path.join('files', 'stageVersions.json');

const readTournament = async () => {
  const response = await readVersions(tournamentPath);
  return response;
};
const updateTournament = async (data) => {
  const response = await updateVersions(tournamentPath, data);
  return response;
};
const readStage = async () => {
  const response = await readVersions(stagePath);
  return response;
};
const updateStage = async (data) => {
  const response = await updateVersions(stagePath, data);
  return response;
};
const readVersions = async (targetPath) => {
  try {
    const data = await fsPromises.readFile(targetPath, 'utf8');
    const now = new Date();
    if (!data) {
      return {
        success: true,
        data: {
          createdAt: now,
        },
      };
    }
    objectData = JSON.parse(data);
    if (!(typeof objectData === 'object')) {
      return {
        success: true,
        data: {
          createdAt: now,
        },
      };
    }
    return {
      success: true,
      data: objectData,
    };
  } catch (error) {
    if (error.code === 'ENOENT') {
      const now = new Date();
      const version = {
        createdAt: now.toISOString(),
      };
      await fsPromises.writeFile(targetPath, JSON.stringify(version));
      return {
        success: true,
        data: version,
      };
    }
    return {
      success: false,
      error: error,
    };
  }
};

const updateVersions = async (targetPath, data) => {
  try {
    await fsPromises.writeFile(targetPath, JSON.stringify(data));
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};
module.exports = {
  readTournament,
  updateTournament,
  readStage,
  updateStage,
};
