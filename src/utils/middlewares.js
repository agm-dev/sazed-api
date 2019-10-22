const httpStatus = require("http-status");

exports.isAdmin = (req, res, next) => {
  if (req.user.admin) {
    next();
  } else {
    res.status(httpStatus.FORBIDDEN).send("Forbidden");
  }
};
