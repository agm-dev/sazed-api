const httpStatus = require("http-status");
const domain = require("../domain/log.domain");
const { getQueryOptions } = require("../utils/handlers");

exports.getLogs = async (req, res) => {
  const items = await domain.get(null, getQueryOptions(req.query));
  res.status(httpStatus.OK).json(items);
};
