const debug = require("debug")("domain:log");
const Log = require("../models/Log.model");
const Query = require("../utils/Query");

const query = new Query(Log);

exports.get = async (id = null, options = {}) => {
  const result = await query.get(id, {
    sort: { created: -1 },
    ...options
  });
  debug("get: %O", result);
  return result;
};

exports.add = async data => {
  debug("add data: %O", data);
  const result = await query.add(data);
  debug("added log: %O", result);
  return result;
};
