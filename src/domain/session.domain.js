const debug = require("debug")("domain:session");
const Session = require("../models/Session.model");
const Query = require("../utils/Query");

const query = new Query(Session);

exports.get = async (id = null) => {
  const result = await query.get(id);
  debug("get: %O", result);
  return result;
};

exports.add = async data => {
  debug("add data: %O", data);
  const result = await query.add(data);
  debug("added session: %O", result);
  return result;
};

exports.update = async (id, data) => {
  debug(`update session ${id} with data: %O`, data);
  const result = await query.update(id, data);
  debug("updated session: %O", result);
  return result;
};

exports.delete = async id => {
  debug(`delete session ${id}`);
  const result = await query.delete(id);
  return result;
};
