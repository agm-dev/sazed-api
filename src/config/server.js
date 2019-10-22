const { createServer } = require("noswbi");
const { serverOptions } = require("./vars");
const userRoutes = require("../routes/user.routes");
const customerRoutes = require("../routes/customer.routes");

const server = createServer([userRoutes, customerRoutes], serverOptions);

module.exports = server;
