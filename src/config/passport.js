const passport = require('passport');
const passportJwt = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const vars = require('./vars');

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: vars.jwt.secret,
  issuer: vars.jwt.issuer,
  audience: vars.jwt.audience,
};

passport.use(new passportJwt.Strategy(jwtOptions, (payload, done) => {
  if (!payload) {
    return done();
  }

  // TODO: get user by id, where id is payload.sub.. but is needed?? :/
  // TODO: check expiring time

  console.log('passportJwt.Strategy', payload);
  const user = {
    id: payload.sub,
  };
  return done(null, user);
}));

passport.use(new GoogleStrategy(
  {
    clientID: vars.google.clientId,
    clientSecret: vars.google.secret,
    callbackURL: vars.google.redirectUri,
  },
  (accessToken, refreshToken, profile, cb) => {
    // TODO: find or create in mongodb db
    // console.log('profile', profile);
    const user = {
      id: profile.id || profile._json.sub,
      name: profile.displayName || profile._json.name,
      email: profile.emails.filter(i => i.verified).find(i => i.value).value || profile._json.email,
    };
    return cb(null, user);
  },
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;
