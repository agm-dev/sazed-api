const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const vars = require('./vars');

passport.use(new GoogleStrategy(
  {
    clientID: vars.google.clientId,
    clientSecret: vars.google.secret,
    callbackURL: vars.google.redirectUri,
  },
  (accessToken, refreshToken, profile, cb) => {
    // TODO: find or create in mongodb db
    return cb(null, { id: 1, name: 'user1' });
  },
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;
