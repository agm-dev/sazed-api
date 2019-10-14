const { join } = require("path");
require("dotenv-safe").config({
  path: join(__dirname, "..", "..", ".env"),
  example: join(__dirname, "..", "..", ".env.example")
});

const environment = process.env.NODE_ENV || "development";

module.exports = {
  environment,
  port: process.env.PORT || 3000,
  mongo:
    environment === "test" ? process.env.MONGO_URI_TEST : process.env.MONGO_URI,
  serverOptions: {
    allowCors: true,
    forceJsonResponse: true,
    domain: process.env.DOMAIN,
    routesPrefix: "/api",
    auth: {
      jwtSecret: process.env.JWT_SECRET,
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
      google: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET
      },
      loginRedirection: "http://localhost:3000/api/"
      // userModel: User
    }
  },
  mongooseOptions: {
    keepAlive: true, // default since mongoose 5.2.0
    useNewUrlParser: true, // to avoid deprecation warning on mongoose 5.x
    useCreateIndex: true, // to avoid collection.ensureIndex deprecation warning
    useUnifiedTopology: true // new server discover and monitoring engine
  }
};
