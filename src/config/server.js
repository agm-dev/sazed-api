const { createServer } = require("noswbi");
const { serverOptions } = require("./vars");
const userRoutes = require("../routes/user.routes");

const server = createServer([userRoutes], serverOptions);

module.exports = server;
