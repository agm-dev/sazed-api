const httpStatus = require("http-status");
const domain = require("../domain/session.domain");

exports.getSessions = async (req, res) => {
  const items = await domain.get();
  res.status(httpStatus.OK).json(items);
};

exports.getSessionById = async (req, res) => {
  const item = await domain.get(req.params.id);
  const status = item ? httpStatus.OK : httpStatus.NOT_FOUND;
  res.status(status).json(item || {});
};

exports.addSession = async (req, res, next) => {
  try {
    const item = await domain.add(req.body);
    const status = item ? httpStatus.CREATED : httpStatus.INTERNAL_SERVER_ERROR;
    res.status(status).json(item || {});
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

exports.updateSession = async (req, res) => {
  const item = await domain.update(req.params.id, req.body);
  const status = item ? httpStatus.OK : httpStatus.INTERNAL_SERVER_ERROR;
  res.status(status).json(item || {});
};

exports.removeSession = async (req, res) => {
  const nRemoved = await domain.delete(req.params.id);
  const status = nRemoved === 1 ? httpStatus.NO_CONTENT : httpStatus.NOT_FOUND;
  res.status(status).send();
};
