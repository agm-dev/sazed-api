exports.catchErrors = fn => (req, res, next) => fn(req, res, next).catch(next);

exports.getQueryOptions = query => {
  const options = {};
  const { skip, limit } = query;
  return Object.assign(options, { skip, limit });
};

/**
 * Gets @hapi/joi schema, and property of req
 * where to find the data, and returns an
 * express middleware that checks and validates
 * the schema.
 */
exports.validator = (schema, type) => (req, res, next) => {
  // const { error, value } = addCustomerSchema.validate(req[type]); // FIXME: pass value to the controller?!
  const { error } = schema.validate(req[type]);
  if (error) {
    return res.status(400).json(error); // TODO: temp solution
    // return next(error); // FIXME: use this approach on future version of noswbi, when error handles is updated.
  }
  // TODO: add the value to req and then use it on addCustomerController??
  return next();
};
