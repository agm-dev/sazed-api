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
  const { file } = req;

  if (!file) {
    return res.status(httpStatus.BAD_REQUEST).json({
      error: "You need to provide a backup file"
    });
  }

  if (file.mimetype !== "application/gzip") {
    return res.status(httpStatus.BAD_REQUEST).json({
      error: "Invalid file format. Please, provide a valid backup file"
    });
  }

  const restored = await domain.restoreBackup(file);

  // eslint-disable-next-line prettier/prettier
  const status = restored
    ? httpStatus.OK
    : httpStatus.INTERNAL_SERVER_ERROR;

  if (!restored) {
    return next(new Error("Something has failed"));
  }

  return res.status(status).json({ message: "Your backup has been restored" });
};
