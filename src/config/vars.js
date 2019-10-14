const { join } = require("path");
require("dotenv-safe").config({
  path: join(__dirname, "..", "..", ".env"),
  example: join(__dirname, "..", "..", ".env.example")
});

module.exports = {
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
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
  }
};
