const fs = require('fs');
//versiyon dosyası her güncellemede yedeği tutulur versiyon
//versiyon dosyasınının bozuk olup olmadığını denetlemek lazım
//eğer boz 0 uksa versiyon dosyasının yenisi oluşturulur ve güncel tarihlerle değiştirilir
const path = 'versions/tournamentVersions.json';
const backupPath = 'versions/backup/';
const readVersion = () => {
  fs.readFile(path, (err, data) => {
    if (err) {
      return {
        success: false,
        error: err,
      };
    }
    return {
      success: true,
      data: data,
    };
  });
};

const updateVersion = (data) => {
  const now = new Date.now();
  fs.copyFile(path, `${backupPath}_${now.toISOString()}.json`);
  fs.writeFile(path, JSON.stringify(data), (err) => {
    if (err) {
      return {
        success: false,
        error: err,
      };
    }
    return {
      success: true,
      data: data,
    };
  });
};

module.exports = {
  readVersion,
  updateVersion,
};
