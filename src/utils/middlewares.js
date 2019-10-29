const httpStatus = require("http-status");

exports.isAdmin = (req, res, next) => {
  if (req.user.admin) {
    next();
  } else {
    res.status(httpStatus.FORBIDDEN).json({ error: "Only admin can do that" });
  }
};

exports.isValidatedUser = (req, res, next) => {
  if (req.user.validated) {
    next();
  } else {
    res
      .status(httpStatus.FORBIDDEN)
      .json({ error: "The user is not validated" });
  }
};
