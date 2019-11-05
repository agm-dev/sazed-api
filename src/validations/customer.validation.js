const Joi = require("@hapi/joi");

const addCustomerSchema = Joi.object({
  nif: Joi.string()
    .trim()
    .alphanum()
    .min(9)
    .max(9)
    .required(),
  firstname: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required(),
  lastname: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required(),
  email: Joi.string()
    .trim()
    .email()
    .max(100)
    .required(),
  phone: Joi.number()
    .integer()
    .min(99999999)
    .max(999999999),
  birthdate: Joi.string().trim(),
  notes: Joi.string()
    .trim()
    .max(10000)
});

const updateCustomerSchema = Joi.object({
  nif: Joi.string()
    .trim()
    .alphanum()
    .min(9)
    .max(9),
  firstname: Joi.string()
    .trim()
    .min(3)
    .max(50),
  lastname: Joi.string()
    .trim()
    .min(3)
    .max(50),
  email: Joi.string()
    .trim()
    .email()
    .max(100),
  phone: Joi.number()
    .integer()
    .min(99999999)
    .max(999999999),
  birthdate: Joi.string().trim(),
  LGPD: Joi.boolean(),
  notes: Joi.string()
    .trim()
    .max(10000)
});

const validator = (schema, type) => (req, res, next) => {
  // const { error, value } = addCustomerSchema.validate(req[type]); // FIXME: pass value to the controller?!
  const { error } = addCustomerSchema.validate(req[type]);
  if (error) {
    return next(error);
  }
  // TODO: add the value to req and then use it on addCustomerController??
  return next();
};

module.exports = {
  validateAddCustomer: validator(addCustomerSchema, "body"),
  validateUpdateCustomer: validator(updateCustomerSchema, "body")
};
