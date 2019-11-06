const Joi = require("@hapi/joi");
const { validator } = require("../utils/handlers");

const addSessionSchema = Joi.object({
  date: Joi.string()
    .trim()
    .isoDate()
    .required(),
  owner: Joi.string()
    .trim()
    .required(),
  customer: Joi.object({
    nif: Joi.string()
      .trim()
      .alphanum()
      .min(9)
      .max(9)
      .required(),
    name: Joi.string()
      .trim()
      .required()
  }),
  notes: Joi.string()
    .trim()
    .max(10000)
});

const updateSessionSchema = Joi.object({
  date: Joi.string()
    .trim()
    .isoDate(),
  customer: Joi.object({
    nif: Joi.string()
      .trim()
      .alphanum()
      .min(9)
      .max(9),
    name: Joi.string().trim()
  }),
  notes: Joi.string()
    .trim()
    .max(10000)
});

module.exports = {
  validateAddSession: validator(addSessionSchema, "body"),
  validateUpdateSession: validator(updateSessionSchema, "body")
};
