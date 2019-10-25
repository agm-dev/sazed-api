const { createServer } = require("noswbi");
const { serverOptions } = require("./vars");
const userRoutes = require("../routes/user.routes");
const customerRoutes = require("../routes/customer.routes");
const sessionRoutes = require("../routes/session.routes");
const logRoutes = require("../routes/log.routes");

const server = createServer(
  [userRoutes, customerRoutes, sessionRoutes, logRoutes],
  serverOptions
);

module.exports = server;
