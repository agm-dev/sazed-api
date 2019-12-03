const debug = require("debug")("utils:commands");
const fs = require("fs");
const { join } = require("path");
const { spawn } = require("child_process");

const deleteFile = (dir, file) => {
  return new Promise((resolve, reject) => {
    fs.unlink(join(dir, file), err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.rmDirContent = (dir, excluded = []) => {
  debug(`remove content from dir ${dir} with excluded %O`, excluded);

  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          Promise.all(
            files
              .filter(file => !excluded.includes(file))
              .map(file => deleteFile(dir, file))
          )
        );
      }
    });
  });
};

exports.mongodump = (mongoUri, file) => {
  // example: mongodump --uri="mongodb://localhost:27017" --archive="/tmp/test/sazed.dump.gz" --gzip
  const options = [`--uri="${mongoUri}"`, `--archive="${file}"`, "--gzip"];
  const mongodump = spawn("mongodump", options);

  return new Promise((resolve, reject) => {
    mongodump.stderr.on("data", data => {
      debug(`stderr: ${data.toString()}`);
    });

    mongodump.on("close", code => {
      debug(`mongodump exited with code ${code}`);
      if (code !== 0) {
        reject(code);
      } else {
        resolve(file);
      }
    });
  });
};

exports.mongorestore = (mongoUri, file) => {
  // example: mongodump --uri="mongodb://localhost:27017" --archive="/tmp/test/sazed.dump.gz" --gzip
  const options = [`--uri="${mongoUri}"`, `--archive="${file}"`, "--gzip"];
  const command = spawn("mongorestore", options);

  return new Promise((resolve, reject) => {
    command.stderr.on("data", data => {
      debug(`stderr: ${data.toString()}`);
    });

    command.on("close", code => {
      debug(`mongorestore exited with code ${code}`);
      if (code !== 0) {
        reject(code);
      } else {
        resolve(true);
      }
    });
  });
};
