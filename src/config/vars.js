const { join } = require('path');

require('dotenv-safe').config({
  example: join(__dirname, '..', '..', '.env.example'),
  config: join(__dirname, '..', '..', '.env'),
});

module.exports = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_SECRET,
    redirectUri: `${process.env.DOMAIN}/api/auth/google/callback`,
  },
};
