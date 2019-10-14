const httpStatus = require("http-status");

exports.getUserInfoController = (req, res, next) => {
  if (!req.user) {
    return next();
  }
  return res.status(httpStatus.OK).json(req.user);
};
