const { join } = require("path");
const debug = require("debug")("domain:backup");
// const { log } = require("../utils/logger");
const { mongo, backupDir } = require("../config/vars");
const { rmDirContent, mongodump, mongorestore } = require("../utils/commands");
const { log } = require("../utils/logger");

exports.generateBackup = async user => {
  debug("removing files from backup dir: ", backupDir);
  await rmDirContent(backupDir, [".gitkeep"]);

  // TODO: check if dir exists, create if not
  const backupFile = join(backupDir, `sazed-${Date.now().toString()}.dump.gz`);

  debug("generating backup into ", backupFile);
  const dump = await mongodump(mongo, backupFile);

  log(`${user.name} has generated a new database backup`, { userId: user.id });

  return dump;
};

exports.restoreBackup = async (file, user) => {
  debug("restoring provided file as database backup %O", file);

  const { path } = file;
  if (!path) {
    throw new Error("no path on restoring backup");
  }

  const restored = await mongorestore(mongo, path);

  log(`${user.name} has restored a new database backup`, { userId: user.id });

  rmDirContent(backupDir, [".gitkeep"]);

  return restored;
};
