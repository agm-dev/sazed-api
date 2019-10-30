const debug = require("debug")("domain:log");
const Log = require("../models/Log.model");
const Query = require("../utils/Query");

const query = new Query(Log);

exports.get = async (id = null) => {
  const queryString = id ? { _id: id } : {};
  const results = await Log.find(queryString).sort({ created: -1 });
  const result = id ? results[0] || {} : results;
  debug("get: %O", result);
  return result;
};

exports.add = async data => {
  debug("add data: %O", data);
  const result = await query.add(data);
  debug("added log: %O", result);
  return result;
};
