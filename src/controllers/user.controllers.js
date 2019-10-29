const httpStatus = require("http-status");
const domain = require("../domain/user.domain");

exports.getUserInfoController = (req, res, next) => {
  if (!req.user) {
    return next();
  }
  return res.status(httpStatus.OK).json(req.user);
};

exports.validateUserController = async (req, res) => {
  const result = await domain.validateUser(req.params.id, req.user);
  const status = result
    ? httpStatus.NO_CONTENT
    : httpStatus.INTERNAL_SERVER_ERROR;
  res.status(status).send();
};
