const httpStatus = require("http-status");
const sessionDomain = require("../domain/session.domain");

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

exports.isOwner = async (req, res, next) => {
  // admins owns every resource!
  if (req.user.admin) {
    return next();
  }

  const session = await sessionDomain.get(req.params.id);
  const { data } = session;

  if (data.owner && data.owner === req.user.id) {
    return next();
  }

  return res
    .status(httpStatus.FORBIDDEN)
    .json({ error: "Only the owner can access to this resource" });
};
