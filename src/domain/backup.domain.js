const { join } = require("path");
const debug = require("debug")("domain:backup");
// const { log } = require("../utils/logger");
const { mongo, backupDir } = require("../config/vars");
const { rmDirContent, mongodump } = require("../utils/commands");

exports.generateBackup = async () => {
  debug("removing files from backup dir: ", backupDir);
  await rmDirContent(backupDir, [".gitkeep"]);

  // TODO: check if dir exists, create if not
  const backupFile = join(backupDir, `sazed-${Date.now().toString()}.dump.gz`);

  debug("generating backup into ", backupFile);
  return mongodump(mongo, backupFile);
};

exports.restoreBackup = async file => {
  debug("restoring provided file as database backup");
  console.log("restoring provided file as database backup");
  console.log(file);
  return true;
};
