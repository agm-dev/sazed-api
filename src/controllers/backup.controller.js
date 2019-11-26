const httpStatus = require("http-status");
const domain = require("../domain/backup.domain");

exports.downloadBackup = async (req, res) => {
  const backup = await domain.generateBackup();
  // TODO: send the file as response
  const now = new Date();
  res
    .status(httpStatus.OK)
    .download(backup, `sazed.${now.toISOString()}.dump.gz`);
};
