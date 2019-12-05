const debug = require("debug")("domain:customer");
const Customer = require("../models/Customer.model");
const Query = require("../utils/Query");
const { log } = require("../utils/logger");

const query = new Query(Customer);

exports.get = async (id = null, options = {}, search = "") => {
  const queryOptions = {
    sort: { firstname: 1, lastname: 1 },
    ...options
  };

  const isSearch = search.length && !id;
  const method = isSearch ? "getByText" : "get";
  const queryParams = isSearch ? [search, queryOptions] : [id, queryOptions];

  const customers = await query[method](...queryParams);
  debug(`get: %O`, customers);
  return customers;
};

exports.add = async (customerData, user) => {
  debug("add customerData: %O", customerData);
  const customer = new Customer(customerData);
  await customer.save();
  debug("add added customer: %O", customer);
  log(
    `${user.name} has added ${customer.firstname} ${customer.lastname} as new customer`,
    // eslint-disable-next-line no-underscore-dangle
    { userId: user.id, customerId: customer._id }
  );
  return customer && customer.nif ? customer : null;
};

exports.update = async (id, customerData, user) => {
  debug("update customerData: %O", customerData);
  if (typeof id !== "string" || !id.length) {
    throw new Error("update customer requires an id");
  }
  const customer = await Customer.findOne({ _id: id });
  const updatedCustomer = Object.assign(customer, customerData);
  await updatedCustomer.save();
  debug("updated customer: %O", updatedCustomer);
  log(
    `${user.name} has updated ${customer.firstname} ${
      customer.lastname
    } to these values: ${JSON.stringify(customerData)}`,
    // eslint-disable-next-line no-underscore-dangle
    { userId: user.id, customerId: customer._id }
  );
  return updatedCustomer && updatedCustomer.nif ? updatedCustomer : null;
};

exports.delete = async (id, user) => {
  debug(`delete customer ${id}`);
  if (typeof id !== "string" || !id.length) {
    throw new Error("delete customer requires an id");
  }
  const result = await Customer.deleteOne({ _id: id });
  if (result.deletedCount > 0) {
    log(`${user.name} has deleted customer ${id}`, {
      userId: user.id,
      customerId: id
    });
  }
  return result.deletedCount;
};
