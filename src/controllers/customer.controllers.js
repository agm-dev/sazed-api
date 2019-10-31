const httpStatus = require("http-status");
const domain = require("../domain/customer.domain");
const { getQueryOptions } = require("../utils/handlers");

// make this one?
exports.getCustomers = async (req, res) => {
  const customers = await domain.get(null, getQueryOptions(req.query));
  res.status(httpStatus.OK).json(customers);
};

exports.getCustomerById = async (req, res) => {
  const { id } = req.params;
  const customers = await domain.get(id, getQueryOptions(req.query));
  const status = customers.data.nif ? httpStatus.OK : httpStatus.NOT_FOUND;
  res.status(status).json(customers);
};

exports.addCustomer = async (req, res) => {
  const customerData = req.body;
  const customer = await domain.add(customerData, req.user);
  if (customer) {
    return res.status(httpStatus.CREATED).json(customer);
  }
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    error: "Something went wrong :/"
  });
};

exports.updateCustomer = async (req, res) => {
  const { id } = req.params;
  const customerData = req.body;
  const customer = await domain.update(id, customerData, req.user);
  if (customer) {
    return res.status(httpStatus.OK).json(customer);
  }
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    error: "Something went wrong D:"
  });
};

exports.removeCustomer = async (req, res) => {
  const { id } = req.params;
  const deletedCount = await domain.delete(id, req.user);
  if (deletedCount === 1) {
    return res.status(httpStatus.NO_CONTENT).send();
  }
  return res.status(httpStatus.NOT_FOUND).send();
};
