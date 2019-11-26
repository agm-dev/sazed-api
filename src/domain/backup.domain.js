const { spawn } = require("child_process");
const { join } = require("path");
const debug = require("debug")("domain:backup");
// const { log } = require("../utils/logger");
const { mongo, backupDir } = require("../config/vars");
const { rmDirContent } = require("../utils/commands");

exports.generateBackup = async () => {
  await rmDirContent(backupDir, [".gitkeep"]);

  const backupFile = join(backupDir, `sazed-${Date.now().toString()}.dump.gz`);
  const uri = `--uri="${mongo}"`;
  const toFile = `--archive=${backupFile}`;

  // TODO: check if dir exists, create if not

  // example: mongodump --uri="mongodb://localhost:27017" --archive="/tmp/test/sazed.dump.gz" --gzip
  const mongodump = spawn("mongodump", [uri, toFile, "--gzip"]);

  return new Promise((resolve, reject) => {
    mongodump.stderr.on("data", data => {
      debug(`stderr: ${data.toString()}`);
    });

    mongodump.on("close", code => {
      debug(`mongodump exited with code ${code}`);
      if (code !== 0) {
        reject(code);
      } else {
        resolve(backupFile);
      }
    });
  });
};
