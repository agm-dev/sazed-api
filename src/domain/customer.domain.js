const debug = require("debug")("model:customer");
const Customer = require("../models/Customer.model");

exports.get = async () => {
  const customers = await Customer.find({});
  debug(`get: %O`, customers);
  return customers;
};

exports.getById = async id => {
  if (typeof id !== "string" || !id.length) {
    throw new Error("get customer by id requires an id");
  }
  const customer = await Customer.findOne({ _id: id }); // TODO: check if is better to use a uuid as id, instead of mongoone, NIF would be public in the url, so better not..
  debug(`getById (${id}): %O`, customer);
  return customer && customer.id ? customer : null;
};

exports.add = async customerData => {
  debug("add customerData: %O", customerData);
  const customer = new Customer(customerData);
  await customer.save();
  debug("add added customer: %O", customer);
  return customer && customer.id ? customer : null;
};
