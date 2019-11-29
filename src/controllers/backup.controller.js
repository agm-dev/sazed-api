const httpStatus = require("http-status");
const domain = require("../domain/backup.domain");

exports.downloadBackup = async (req, res) => {
  const backup = await domain.generateBackup();
  // TODO: send the file as response
  const now = new Date();
  res
    .set("Content-Type", "application/gzip")
    .status(httpStatus.OK)
    .download(backup, `sazed.${now.toISOString()}.dump.gz`);
};

exports.restoreBackup = async (req, res, next) => {
  const { file } = req.body;
  // TODO: check format and name, mimetype, etc
  if (!file) {
    return res.status(httpStatus.BAD_REQUEST).json({
      error: "You need to provide a backup file"
    });
  }

  const restored = await domain.restoreBackup(file);

  const status = restored
    ? httpStatus.CREATED
    : httpStatus.INTERNAL_SERVER_ERROR;

  if (!restored) {
    return next(new Error("Something has failed"));
  }

  return res.status(status).json({ message: "OK" });
};
