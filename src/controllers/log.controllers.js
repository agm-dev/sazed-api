const httpStatus = require("http-status");
const domain = require("../domain/log.domain");

exports.getLogs = async (req, res) => {
  const items = await domain.get();
  res.status(httpStatus.OK).json(items);
};
