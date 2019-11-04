const httpStatus = require("http-status");
const domain = require("../domain/session.domain");
const { getQueryOptions } = require("../utils/handlers");

exports.getSessions = async (req, res) => {
  const items = await domain.get(null, getQueryOptions(req.query));
  res.status(httpStatus.OK).json(items);
};

exports.getSessionById = async (req, res) => {
  const item = await domain.get(req.params.id, getQueryOptions(req.query));
  const status = item ? httpStatus.OK : httpStatus.NOT_FOUND;
  res.status(status).json(item || {});
};

exports.addSession = async (req, res, next) => {
  try {
    const item = await domain.add(req.body, req.user);
    const status = item ? httpStatus.CREATED : httpStatus.INTERNAL_SERVER_ERROR;
    res.status(status).json(item || {});
  } catch (err) {
    next(err);
  }
};

exports.updateSession = async (req, res) => {
  const item = await domain.update(req.params.id, req.body, req.user);
  const status = item ? httpStatus.OK : httpStatus.INTERNAL_SERVER_ERROR;
  res.status(status).json(item || {});
};

exports.removeSession = async (req, res) => {
  const removed = await domain.delete(req.params.id, req.user);
  const status = removed ? httpStatus.NO_CONTENT : httpStatus.NOT_FOUND;
  res.status(status).send();
};
