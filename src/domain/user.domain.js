const debug = require("debug")("domain:user");
const User = require("../models/User.model");
const Query = require("../utils/Query");
const { log } = require("../utils/logger");

const query = new Query(User);

exports.get = async (id = null) => {
  const result = await query.get(id);
  debug("get: %O", result);
  return result;
};

exports.validateUser = async (id, user) => {
  debug(`validate user ${id}`);
  const result = await query.update(id, { validated: true });
  debug("updated user: %O", result);
  log(`${user.name} has validated user ${result.name} (${id})`, {
    userId: user.id
  });
  return result && result.validated;
};

exports.disableUser = async (id, user) => {
  debug(`disable user ${id}`);
  const result = await query.update(id, { validated: false });
  debug("updated user: %O", result);
  log(`${user.name} has disabled user ${result.name} (${id})`, {
    userId: user.id
  });
  return result && !result.validated;
};
