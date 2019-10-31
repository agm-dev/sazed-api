exports.catchErrors = fn => (req, res, next) => fn(req, res, next).catch(next);

exports.getQueryOptions = query => {
  const options = {};
  const { skip, limit } = query;
  return Object.assign(options, { skip, limit });
};
