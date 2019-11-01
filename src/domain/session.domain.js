const debug = require("debug")("domain:session");
const Session = require("../models/Session.model");
const Query = require("../utils/Query");
const { log } = require("../utils/logger");

const query = new Query(Session);
const locale = "es";

exports.get = async (id = null) => {
  const result = await query.get(id);
  debug("get: %O", result);
  return result;
};

exports.add = async (data, user) => {
  debug("add data: %O", data);
  const result = await query.add(data);
  debug("added session: %O", result);
  log(
    `${user.name} has added a new session for ${result.date.toLocaleDateString(
      locale
    )} at ${result.date.toLocaleTimeString(locale)} with ${
      result.customer.name
    }`,
    // eslint-disable-next-line no-underscore-dangle
    { userId: user.id, sessionId: result._id }
  );
  return result;
};

exports.update = async (id, data, user) => {
  debug(`update session ${id} with data: %O`, data);
  const result = await query.update(id, data);
  debug("updated session: %O", result);
  log(
    `${user.name} has updated session for ${result.date.toLocaleDateString(
      locale
    )} at ${result.date.toLocaleTimeString(locale)} with ${
      result.customer.name
    } to these values: ${JSON.stringify(data)}`,
    // eslint-disable-next-line no-underscore-dangle
    { userId: user.id, sessionId: result._id }
  );
  return result;
};

exports.delete = async (id, user) => {
  debug(`delete session ${id}`);
  const result = await query.delete(id);
  if (result) {
    log(`${user.name} has deleted session ${id}`, {
      userId: user.id,
      sessionId: id
    });
  }
  return result;
};
