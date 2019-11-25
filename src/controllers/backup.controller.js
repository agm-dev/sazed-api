const httpStatus = require("http-status");
const domain = require("../domain/backup.domain");

exports.downloadBackup = async (req, res) => {
  const backup = await domain.generateBackup();
  // TODO: send the file as response
  res.status(httpStatus.OK).json(backup);
};
