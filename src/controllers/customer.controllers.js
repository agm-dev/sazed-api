const httpStatus = require("http-status");
const customerDomain = require("../domain/customer.domain");

// make this one?
exports.getCustomers = async (req, res) => {
  const customers = await customerDomain.get();
  res.status(httpStatus.OK).json(customers);
};

exports.getCustomerById = async (req, res) => {
  const { id } = req.params;
  const customer = await customerDomain.getById(id);
  if (customer) {
    return res.status(httpStatus.OK).json(customer);
  }
  return res.status(httpStatus.NOT_FOUND).json({});
};

exports.addCustomer = async (req, res) => {
  const customerData = req.body;
  const customer = await customerDomain.add(customerData);
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
  const customer = await customerDomain.update(id, customerData);
  if (customer) {
    return res.status(httpStatus.OK).json(customer);
  }
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    error: "Something went wrong D:"
  });
};

exports.removeCustomer = async (req, res) => {
  const { id } = req.params;
  await customerDomain.delete(id);
  return res.status(httpStatus.NO_CONTENT);
};
