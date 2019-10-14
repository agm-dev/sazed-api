const mongoose = require("mongoose");
const { mongo, environment, mongooseOptions } = require("./vars");

mongoose.Promise = Promise;

if (["development", "test"].includes(environment)) {
  mongoose.set("debug", true);
}

exports.connectToDatabase = function connectToDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.connect(mongo, mongooseOptions, err => {
      if (err) {
        reject(err);
      } else {
        resolve(mongoose.connection);
      }
    });
  });
};
