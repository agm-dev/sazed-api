const { join } = require('path');

require('dotenv-safe').config({
  example: join(__dirname, '..', '..', '.env.example'),
  config: join(__dirname, '..', '..', '.env'),
});

module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_SECRET,
    redirectUri: `${process.env.DOMAIN}/api/auth/google/callback`,
  },
};
