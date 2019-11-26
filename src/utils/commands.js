const debug = require("debug")("utils:commands");
const fs = require("fs");
const { join } = require("path");

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
