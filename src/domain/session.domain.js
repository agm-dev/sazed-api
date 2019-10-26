const debug = require("debug")("domain:session");
const Session = require("../models/Session.model");

exports.get = async (id = null) => {
  const query = id ? { _id: id } : {};
  const results = await Session.find(query);
  debug("get: %O", results);
  return id ? results[0] || {} : results;
};

// TODO: user util/Query to do the querys

exports.add = async data => {
  debug("add data: %O", data);
  const session = new Session(data);
  await session.save();
  debug("added session: %O", session);
  // eslint-disable-next-line no-underscore-dangle
  return session && session._id ? session : null;
};

exports.update = async (id, data) => {
  debug(`update session ${id} with data: %O`, data);
  const session = await Session.findOne({ _id: id });
  const updated = Object.assign(session, data);
  await session.save();
  debug("updated session: %O", updated);
  // eslint-disable-next-line no-underscore-dangle
  return updated && updated._id ? updated : null;
};

exports.delete = async id => {
  debug(`delete session ${id}`);
  const result = await Session.deleteOne({ _id: id });
  return result.deletedCount;
};
