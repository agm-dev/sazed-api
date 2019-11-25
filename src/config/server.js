const { createServer } = require("noswbi");
const { serverOptions } = require("./vars");
const userRoutes = require("../routes/user.routes");
const customerRoutes = require("../routes/customer.routes");
const sessionRoutes = require("../routes/session.routes");
const logRoutes = require("../routes/log.routes");
const dbBackupRoutes = require("../routes/backup.routes");

const server = createServer(
  [userRoutes, customerRoutes, sessionRoutes, logRoutes, dbBackupRoutes],
  serverOptions
);

module.exports = server;
